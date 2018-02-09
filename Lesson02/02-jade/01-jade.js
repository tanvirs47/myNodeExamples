var jade = require('jade');
var html = jade.renderFile('./test.jade',{title:'IGATE',name:'Karthik'});
console.log(html);



/*Compiling using jade cli from command prompt*/
//>..\node_modules\.bin\jade -O 01options.json test.jade 