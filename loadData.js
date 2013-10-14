var mongoose = require('mongoose');
var model = mongoose.model( 'WebData' );
//model.remove().exec();

var monthNames = [ "January","Jan", "February","Feb", "March","Mar", "April", "May", "June",
"July", "August", "Aug", "September","Sept", "October","Oct", "November","Nov", "December","Dec" ];

function myfunc(theObject)
{

	for(var j=0;j<monthNames.length;j++)
	{
		if(monthNames[j]===theObject)
			{
			   return true;
			}
	}
	return false;			
}

var fs = require('fs'),
JSONStream = require('JSONStream');
var stream = fs.createReadStream('Data.json', {encoding: 'utf8'});
parser = JSONStream.parse();
stream.pipe(parser);
parser.on('root', function (obj) {
var key;
var keys = [] ;
var datetime;
for(key in obj){

        if(obj.hasOwnProperty(key)){
                keys.push(obj[key]);
}
}

        if(keys[2].length>1)
	{
		var temp ="";
		var i;
		var temp2 = keys[2];
		var arr = keys[2].split(/[" ",]/);
		if(arr.length>1)
		{
		for(i=0;i<arr.length;i++)
		{
			if(isNaN(arr[i]))
			{
				if(myfunc(arr[i]))
				{
					temp+=arr[i]+" ";
				}
			}
			else
			{
				temp+=arr[i]+" ";
			}
		}
		}
		else
		{
			temp+=keys[2].substring(0,10);
		}
		datetime = new Date(temp);			
	}			
	else
	{
        datetime = new Date(keys[2]);
	}	
	if(keys.length==6)
        var data1 = new model( {url: keys[1] , date: datetime , title :keys[3], source: keys[4],content : keys[5]});
	else
	var data1 = new model( {url: keys[1] , date: keys[2] , title :keys[3], author :keys[4],source: keys[5],content : keys[6]});
	
        data1.save(function (err)
        {
        if (err)
        console.log ('Error on save!' +err)		
        });
	

});
