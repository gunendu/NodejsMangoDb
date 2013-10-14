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
   if(val.length>1) {
   searchData.sourceList(val,function(err,sourceList){
   res.render('display',{title:"Filter by source",entries:sourceList});
  });
}
  if(title.length>1 || content.length>1) {
  searchData.func2(title,content,function(err,func2){
  res.render('display',{title:"Regex Data over Title and source",entries:func2});
});
}
  if(startdate.length>1 && enddate.length>1){
  searchData.func3(startdate,enddate,function(err,func3){
  res.render('display',{title:"Filter by Date",entries:func3});
});
}

});
	
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

