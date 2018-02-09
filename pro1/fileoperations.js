var fs = require('fs');

fs.readFile('./abc.txt',function(err,data){
    if(err) throw err;
    console.log(data.toString());

    
    fs.writeFile('./def.txt',data,function(err,data){
        if(err) throw err;
        console.log("done");
    })
})