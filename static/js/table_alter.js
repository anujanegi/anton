window.onload = function() {
  var url=window.location.href;
  var arr=url.split("/");
  var msg = document.getElementById('alter_msg');
  msg.innerHTML="Enter new"+arr[7]+":";
  var alter_table = document.getElementById('alter_table');

  alter_table.onclick = function(){
      var sql_query;
      var alter = document.getElementById('new_value');
      var column_name = alter.name;
      var new_value = alter.value;
      if(arr[7] == 'column-name') {
        sql_query = "ALTER TABLE "+arr[4]+"."+arr[5]+" RENAME COLUMN "+column_name+" TO "+new_value+";";
      }
      else if (arr[7]=='column-definition') {
        sql_query = "ALTER TABLE "+arr[4]+"."+arr[5]+" ALTER COLUMN "+column_name+" TYPE "+new_value+";";
      }
      var request = new XMLHttpRequest();
      request.open('POST', '/api/raw-sql', true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify({query: sql_query}));
      request.onload = function(){
        if(request.readystate = XMLHttpRequest.DONE){
          history.go(-1);
        }
    }
  }
}
