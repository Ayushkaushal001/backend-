 const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	title:{type:String, required:[true,'title required']},
		mrp:{type:String, required:[true,'mrp required']},
	image:{type:String, required:[true,'image required']},
	price:{type:String, required:[true,'price required']},
	category:{type:String, required:[true,'Category required']},
	subcategory:{type:String, required:[true,'sub Category required']},
	description: {type:String , required : [true, 'description required']},
	spec: {type:String , required : [true, 'spec required']},
		brand: {type:String , required : [true, 'brand required']},
		features: {type:String , required : [true, 'features required']},
	date:{type:Date,default:Date.now},
});
module.exports = mongoose.model('Product',productSchema, 'Product');

//db.users.find({name: /a/})  // Like '%a%'

//db.product.find({"title": {"$regex": "query", "$options": "i"}})