var connect = require('connect');
var app = connect();

var logger = function(req, res, next) {
	console.log(req.method, req.url);
/*next() call
in the logger() middleware, which is responsible for calling the helloWorld()
middleware. Removing the next() call would stop the execution of middleware
function at the logger() middleware, which means that the request would hang
forever as the response is never ended by calling the res.end() method.*/
	next();
};

var helloWorld = function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World');
};

var byeWorld = function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Bye World');
};
app.use(logger);
app.use('/hello',helloWorld);
app.use('/bye',byeWorld);


app.listen(3000);
console.log('Server running at http://localhost:3000/');


/*
One of Connect's greatest features is the ability to register as many middleware
functions as you want. Using the app.use() method, you'll be able to set a series of
middleware functions that will be executed in a row to achieve maximum flexibility
when writing your application. Connect will then pass the next middleware function
to the currently executing middleware function using the next argument. In each
middleware function, you can decide whether to call the next middleware function
or stop at the current one. Notice that each Connect middleware function will be
executed in first-in-first-out (FIFO) order using the next arguments until there are no
more middleware functions to execute or the next middleware function is not called.
*/