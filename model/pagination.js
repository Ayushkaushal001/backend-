const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

	title:{type:String, required:[true,'title required']},
		price:{type:String, required:[true,'price required']},
	description:{type:String, required:[true,'description required']},
	imageUrl:{type:String, required:[true,'imageUrl required']},

	});

module.exports = mongoose.model('Pagination',paginationSchema, 'Pagination');