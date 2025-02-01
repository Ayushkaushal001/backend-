const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	title:{type:String, required:[true,'title required']},
		mrp:{type:String, required:[true,'mrp required']},
	image:{type:String, required:[true,'image required']},
	price:{type:String, required:[true,'price required']},
	orderId:{type:String,default:null},
	userId:{type:String,required:[true,'userId required' ]},
	productId:{type:String,required:[true,'productId required' ]},
	quantity:{type:String,required:[true,'quantity required' ]},
	status:{type:String,default:'incart'},
	date:{type:Date,default:Date.now},
	


});
module.exports = mongoose.model('cart',cartSchema, 'cart');