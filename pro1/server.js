var http = require('http');


var server = http.createServer(function(req, res){

    res.writeHead(200,{'content-type':'text/html'});

    res.write('<h1> Hello CG </h1>');

    res.end("<b>Response Ended!</b?");

});


server.listen(3000);

console.log('server listening on localhost:3000');