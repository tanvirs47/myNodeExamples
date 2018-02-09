var connect = require('connect');
var app = connect();
var logger1 = function(req,res,next){
	console.log('logger1');
	next();
}
var logger2 = function(req,res,next){
	console.log('logger2');
	next();
}
var helloWorld = function(req,res,next){
	res.setHeader('content-type','text/html');
	res.end('<h1>Hello World</h1>');
}
var byeWorld = function(req,res,next){
	res.setHeader('content-type','text/html');
	res.end('<h1>Bye World</h1>');
}
app.use(logger2);
//app.use('/hello',logger1);
app.use(logger1);
app.use('/hello',helloWorld);
app.use('/bye',byeWorld);
app.listen(3000);



