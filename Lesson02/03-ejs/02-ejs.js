var ejs = require('ejs'),
	fs = require('fs'),
	guests = require('./guests');
	
fs.readFile('./guest.ejs','utf-8',function (err, data) {
  if (err) throw err;
	var template = ejs.compile(data);
	var html = template({title:'IGATE',heading:'Guest Details',guests:guests});
	console.log(html);
});


