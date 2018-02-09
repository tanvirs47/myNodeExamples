var express = require('express');
var app = express();

var root = express.Router();
var guest = express.Router();
var admin = express.Router();

root.use(function(req,res,next){
	console.log('Works for all the Routes');
	next();
});

root.param('name', function(req,res,next,name){
	console.log('Accessing Param Middleware '+name);
	req.name = name; 
	next();
});

guest.use(function(req,res,next){
	console.log('Works only for the Guest Routes');
	next();
});
admin.use(function(req,res,next){
	console.log('Works only for the Admin Routes');
	next();
});
app.use('/', root);
app.use('/guest',guest);
app.use('/admin',admin);

root.get('/',function(req,res){
	res.send('<h1>Root Home Page</h1>');
});

root.get('/hello/:name', function(req,res){
	res.send('Hello '+req.params.name);
});

guest.get('/hello/:name', function(req,res){
	res.send('Guest - Hello '+req.params.name);
});

guest.get('/',function(req,res){
	res.send('<h1>Guest Home Page</h1>');
});
admin.get('/',function(req,res){
	res.send('<h1>Admin Home Page</h1>');
});
app.listen(3000);
console.log('Server listening to port no. 3000');
