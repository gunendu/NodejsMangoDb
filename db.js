var mongoose = require("mongoose");

var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://gunendu:promax@paulo.mongohq.com:10023/myMangoDb';

mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

var dataSchema = new mongoose.Schema({
//_id:String,
urls:String,
date:{type:Date},
title:String,
author:String,
source:String,
content:String
});

mongoose.model('WebData',dataSchema);


