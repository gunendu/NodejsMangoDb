var mongoose = require('mongoose');

exports.sourceList = function sourceList(gname,callback) {
var model = mongoose.model( 'WebData' ); 
model.find({"source" : gname}).exec(function(err, result) {
        if (!err) {
		callback("",result);
        } else {
                console.log('Data not found');
        }
});
}

exports.func2 = function func2(title,content,callback) {
var model = mongoose.model( 'WebData');
var temp = title;
var temp2 = content;
model.find({$or:[{"title" :{$regex: temp , $options: 'i' }},{"content" :{$regex:temp2, $options: 'i' }}]}).exec(function(err, result) {
        if (!err) {
		console.log('before callback' +result);
                callback("",result);
        } else {
                console.log('Data not found');
        }
});
}


exports.func3 = function func3(startdate,enddate,callback) {
var model = mongoose.model( 'WebData' );
var temp = startdate;
var temp2 = enddate;
model.find({"date" : { $gte:new Date(temp),$lt:new Date(temp2) } }).exec(function(err, result) {
        if (!err) {
                callback("",result);
        } else {
                console.log('Data not found');
        }

});
}

