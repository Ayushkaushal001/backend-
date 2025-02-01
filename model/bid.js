const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
amount:{type:Number ,required:true},
	date:{type:Date,default:Date.now},

	});
module.exports = mongoose.model('Bid',bidSchema, 'Bid');