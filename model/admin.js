const mongoose = require('mongoose');

const adminScheme = new mongoose.Schema ({

	username : {type:String ,required :[true,' username require']},
	password: {type:String , required:[true,'password require']},
});
module.exports = mongoose.model('Admin' , adminScheme,'Admin');