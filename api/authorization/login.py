import psycopg2
from flask import request, session
from api import api, sender
from connections import setConnection


@api.route('/login', methods=['POST'])
def login():
    if session.get("user-token", None):
        return sender.Forbidden("Already logged in! Logout first")
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    database = request.json.get("database", None)
    if database == "":
        database = "postgres"
        request.json["database"] = database
    host = request.json.get("host", None)
    port = request.json.get("port", None)
    if not (username and password and host and port):
        return sender.BadRequest("Missing parameters")
    connstring = "dbname='{}' user='{}' host='{}' password='{}' port={}".format(
        database, username, host, password, port)
    try:
        conn = psycopg2.connect(connstring)
        conn.set_session(autocommit=True)
    except Exception as e:
        return sender.Forbidden("Recheck credentials")
    conndict = request.json
    conndict.pop("password")
    # Add object to session
    session["user-token"] = setConnection([conn, conndict])
    return sender.OK("Logged in", session["user-token"])
