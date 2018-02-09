var express = require('express');
var router = express.Router();
var guests = [];
var data = require('../data/guests');

var guest1 = {
	id:714709,
	name:'Karthik',
	contactNumber : '9986173092',
	location:'Bangalore'
};

var guest2 = {
	id:5085,
	name:'Anil',
	contactNumber : '9986589092',
	location:'Mumbai'
};

for(var id in data){
	guests.push(data[id]);
}
/* Mimic Content-Negotiation*/
router.get('/', function(req, res) {
   //res.json(guests);
   res.sendData(guests);
});

router.get('/guest1', function(req, res) {
   res.json(guest1);
});
/* Mimic Content-Negotiation*/
router.get('/guest2', function(req, res) {
	res.sendData(guest2);
});

router.get('/:id([0-9]+)', function(req, res) {
	var id = req.param('id');
	if(data[id]!==undefined)
		res.json(data[id]);
	else
		res.json({error:'Not Found'});
});

router.get('/jadeguests', function(req, res) {
  res.render('guests', { title: 'Guest Phonebook',guests:guests });
});

router.post('/dopost', function(req, res) {
   console.log(req.body);      // your JSON
  res.send(req.body);    // echo the result back
});


module.exports = router;
