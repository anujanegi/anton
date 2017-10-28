window.onload = function() {
  var add_column = document.getElementById('add_column');

  add_column.onclick = function(){
      var column_name = document.getElementById('column_name').value;
      var column_definition = document.getElementById('column_definition').value;
      var url=window.location.href;
      var arr=url.split("/");
      var sql_query ="ALTER TABLE "+arr[4]+"."+arr[5]+" ADD "+column_name+" "+column_definition+";";
      var request = new XMLHttpRequest();
      request.open('POST', '/api/raw-sql', true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify({query: sql_query}));
      request.onload = function(){
        if(request.readystate = XMLHttpRequest.DONE){
          var message = document.getElementById("message");
          var msg = JSON.parse(request.responseText);
          if (msg.message=="no results to fetch"){
            document.location=document.referrer;
          }
          else{
            message.innerHTML=msg.message;
          }
        }
    }
  }
}
