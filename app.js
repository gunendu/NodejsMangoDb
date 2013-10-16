var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var path = require('path');
var db = require('./db');
var loadData = require('./loadData');
var searchData = require('./search');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
//app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/Source', function(req, res) {
   var val = req.body.selectpicker;
   var title = req.body.Title;
   var content = req.body.Content;
   var startdate = req.body.StartDate;
   var enddate = req.body.EndDate;
   var key;
   var values =  [];
   var tbl_row = "";
   var tmp = 1;
   var date = "Date";
   var title = "Title";
   var source = "Source";
   var content = "Content";

   if(val.length>1) {
   searchData.sourceList(val,function(err,sourceList){
   for(key in sourceList){
        if(sourceList.hasOwnProperty(key)){
   	
   tbl_row+= "<table border=" +tmp+ "> <tr> <th>" +date+ "</th> <th>" +title+ "</th> <th>" +source+ "</th> <th>" +content+ "</th> </tr> <tr> <td>" +sourceList[key].date+ "</td><td>" +sourceList[key].title +"</td><td>" +sourceList[key].source+ "</td><td>" +sourceList[key].content+ "</td></tr> </table";
   }
   }
   res.writeHeader(200, {"Content-Type": "text/html"});  
   res.write(tbl_row);  
   res.end();  	
  });
}
  else if(title.length>1 && content.length>1) {
  searchData.func2(title,content,function(err,func2){

  for(key in func2){
        if(func2.hasOwnProperty(key)){
   
   tbl_row+= "<table border=" +tmp+ "> <tr> <th>" +date+ "</th> <th>" +title+ "</th> <th>" +source+ "</th> <th>" +content+ "</th> </tr> <tr> <td>" +func2[key].date+ "</td><td>" +func2[key].title +"</td><td>" +func2[key].source+ "</td><td>" +func2[key].content+ "</td></tr> </table";
   }
   }
   res.writeHeader(200, {"Content-Type": "text/html"});
   res.write(tbl_row);
   res.end();

});
}
  else {
  searchData.func3(startdate,enddate,function(err,func3){
  for(key in func3){
        if(func3.hasOwnProperty(key)){

   tbl_row+= "<table border=" +tmp+ "> <tr> <th>" +date+ "</th> <th>" +title+ "</th> <th>" +source+ "</th> <th>" +content+ "</th> </tr> <tr> <td>" +func3[key].date+ "</td><td>" +func3[key].title +"</td><td>" +func3[key].source+ "</td><td>" +func3[key].content+ "</td></tr> </table";
   }
   }
   res.writeHeader(200, {"Content-Type": "text/html"});
   res.write(tbl_row);
   res.end();

});
}

});
	
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

