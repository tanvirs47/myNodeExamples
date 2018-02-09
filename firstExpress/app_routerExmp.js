var express = require('express');
var http = require('http');
var path = require('path');
var coookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var hellorouter = require('./routers/hello');

var app = express();

// set the path of html view folder
app.set('views',path.join(__dirname,'views'));

//set the view render engine 
app.set('view engine','ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }))


app.use('/hello',hellorouter);
//app.use('/second',router1);


app.listen(3000,function(){
    console.log('Express server listening on port : '+ app.get('port'));
})