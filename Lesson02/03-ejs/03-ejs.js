var ejs = require('ejs'),
	fs = require('fs');
	
fs.readFile('./layout.ejs','utf-8',function (err, data) {
  if (err) throw err;
	var template = ejs.compile(data);
	var html = template({});
	console.log(html);
});


//Not working


