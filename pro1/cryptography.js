var bcrypt = require('bcryptjs');


/* Asynchronous  */
/*bcrypt.hash('Secret@123',bcrypt.genSaltSync(10),function(err,hash){
    //console.log(hash);

    bcrypt.compare('Secret@123',hash,function(err,res){
        console.log(res);
    });
})*/

/* Synchronous  */
var hash = bcrypt.hashSync('Secret@123',bcrypt.genSaltSync(10));
console.log(hash);
bcrypt.compareSync('Secret@123',hash);
