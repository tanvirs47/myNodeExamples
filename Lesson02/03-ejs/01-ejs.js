var ejs = require('ejs'),
	fs = require('fs');
	
fs.readFile('./test.ejs','utf-8',function (err, data) {
  if (err) throw err;
	var template = ejs.compile(data);
	var html = template({title:'IGATE',name:'Karthik'});
	console.log(html);
});





