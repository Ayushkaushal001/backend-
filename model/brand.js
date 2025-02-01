 const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
	title: {type:String , required : [true, 'title required']},
	description: {type:String , required : [true, 'description required']},
	image: {type:String , required : [true, 'image required']},
})

module.exports = mongoose.model('brand',brandSchema ,'brand');
