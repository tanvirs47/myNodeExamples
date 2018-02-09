var Guest = function(){
	var data = {
		id : null,
		name : null,
		contactNumber : null
	};
	this.setInfo = function(info){
		for(var prop in data){
			if(data[prop] !== undefined){
				data[prop] = info[prop];
			}
		}
	};
	this.getGuestInfo = function(){
		return data;
	}
}

/*Returning instance*/
module.exports = function(guestObj){
	var instance = new Guest();
	instance.setInfo(guestObj);
	return instance;
}

