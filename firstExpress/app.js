var express = require('express');
var http = require('http');
var path = require('path');
var coookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var MongoStore = require('connect-mongo')(session);
var bcrypt = require('bcryptjs');
var fs = require('fs')
var morgan = require('morgan')

// create express obj
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/empdb',function(err,data){
    if(err){
        console.log('error');

    }else{
        console.log("connected.");
    }
});

var empSchema = new mongoose.Schema({
    empid : {type : Number},
    empname : {type : String, trim : true},
    phone: {type: String},
    email : {type: String}
});

var userSchema = new mongoose.Schema({
    userid : {type : String, trim : true},
    pass : {type : String, trim : true}
});

var Tbluser = mongoose.model('users',userSchema);

var Employee = mongoose.model('employee',empSchema);

var emp1 = new Employee();
var tblUserObj = new Tbluser();

app.use(coookieParser());
app.use(session({
    store : new MongoStore({
        "db": "SessionDB",
        "host": "localhost",
        "port": "27017",
        "collection": "sessions",
        "url": "mongodb://localhost:27017/SessionDB"
    }),
    secret: 'CGTan',
    resave: true, 
    saveUninitialized: true}));

var emps = [];
// set the path of html view folder
app.set('views',path.join(__dirname,'views'));

//set the view render engine 
app.set('view engine','ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }))



//logger start


morgan.token('id', function getId (req) {
  return req.id
})
 
app.use(assignId)
app.use(morgan(':id :method :url :response-time',{
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}))
 
function assignId (req, res, next) {
  req.id = "Tanvir";
  next()
}

/*app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}));

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}))*/

//Logger end

// redirect to the index
app.get('/', function(req,res){
    res.render('index',{title:'welcome to the express'});
});

app.get('/home', function(req,res){
    console.log(req.sessionID);
   // var count = 1;
    if(req.session.mycount == undefined){
        req.session.mycount = 1;
    }else{
        req.session.mycount = req.session.mycount  +1 ;
    }
    res.render('home',{title:'welcome to the home page : '+req.session.mycount});

    
});


app.get('/adduser', function(req,res){
    //req.session.destroy();
    res.render('adduser');
});

app.post('/useraddprocess/',function(req,res){
    console.log(req.body);
    
    /* Asynchronous  */
    bcrypt.hash(req.body.exampleInputPassword1,bcrypt.genSaltSync(10),function(err,hash){
        console.log(hash);
        //tblUserObj
        tblUserObj.userid = req.body.exampleInputEmail1;
        tblUserObj.pass = hash;

        tblUserObj.save(function(saveErr,saveResponse){
            console.log(saveResponse);
            res.redirect('/login');
        });
        
    });
    
});

app.get('/login', function(req,res){
    //req.session.destroy();
    res.render('login',{msg:'welcome to the home page'});
});


app.post('/loginprocess/',function(req,res){
    //console.log(req.body);
    var frmuserpass = req.body.pass;
    Tbluser.find({'userid': req.body.username },function(tblErr,tblRes){
        var userRes = tblRes;
        console.log( "mdb res: "+JSON.stringify(tblRes));
        
        console.log( "password : "+ userRes[0].pass);


        bcrypt.compare(frmuserpass,tblRes[0].pass,function(err,bcryptRes){
            console.log(bcryptRes);
            if(bcryptRes){
                res.redirect('/addemp');
            }else{
                res.render('login',{msg:'Invalid username or password'});
            }
        });
        //res.render('emplist',{emps:tblRes});
    });
});

app.post('/emp', function(req,res){

    //console.log(req.params.currency);
    /*var emp = {
        "name" : req.params.name,
        "empid": "141434",
        "Location": "Aroli"
    };
res.json(emp);*/
console.log(req.body);
    var convertedval = req.body.currency *63;
    var obj = {
        "result" : convertedval
    };
    res.json(obj);
});

app.get('/addemp', function(req,res){
    res.render('addemp');
});

app.post('/processemp/',function(req,res){
    emp1.empid = req.body.empid;
    emp1.empname = req.body.empname;
    emp1.phone = req.body.phone;
    emp1.email = req.body.emailid;
    
    emp1.save(function(saveErr,saveResponse){
       // console.log(saveResponse);
       Employee.find(function(tblErr,tblRes){
            console.log( "mdb res: "+ tblRes);
            emps = tblRes;
            res.render('emplist',{emps:emps});
        });
    });
    
    //console.log(emps);
    //res.render('emplist',{emps:emps});
});

app.get('/editemp/:id', function(req,res){

    if(req.params.id != ''){
        var empdetails= {};
        for(var i =0; i<emps.length; i++){
            if(emps[i].empid == req.params.id){
                empdetails = emps[i];
            }
        }
        res.render('editemp',{emp : empdetails});
    }
    
});

app.get('/updateemp/:id',function(req,res){
    
    if(req.params.id != ''){
        var empdetails= {};
        for(var i =0; i<emps.length; i++){
            if(emps[i].empid == req.params.id){
                emps[i].empname = req.body.empname;
                emps[i].phone = req.body.phone;
                emps[i].emailid = req.body.emailid;
            }
        }
        res.render('emplist',{emps:emps});
    }
});


app.get('/deleteemp/:id',function(req,res){

    Employee.deleteOne({"empid": req.params.id},function(delErr,delRes){
        console.log(delRes);
        Employee.find(function(tblErr,tblRes){
            console.log( "mdb res: "+ tblRes);
            res.render('emplist',{emps:tblRes});
        });
    });
    /*console.log(req.params.id);

    for(var i =0; i<emps.length; i++){
        if(emps[i].empid == req.params.id){
            emps.splice(i,1);
        }
    }
    res.render('emplist',{emps:emps});*/
});



// REST Client Code

var Client = require('node-rest-client').Client;
 
var client = new Client();

app.get('/restClient',function(req,res){
    res.render('frmCurrency');

}); 

app.get('/currencyClient',function(req,res){
    var currval = req.query.cval;
    // direct way 
    client.get("http://localhost:3000/emp/"+currval, function (data, response) {
        // parsed response body as js object 
        console.log(data.result);
        res.json({"data": data.result});
        // raw response 
        //console.log(response);
    });
}); 


app.listen(3000,function(){
    console.log('Express server listening on port : '+ app.get('port'));
})