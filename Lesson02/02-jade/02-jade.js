var jade = require('jade');
var guests = require('./guests');
var html = jade.renderFile('./guest.jade',{title:'IGATE',guests:guests});
console.log(html);

/*Compiling using jade cli from command prompt*/
//>..\node_modules\.bin\jade -O 02options.json guest.jade 



