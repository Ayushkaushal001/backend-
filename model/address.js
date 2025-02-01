const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
	userId: {type:String , required : [true, 'userId required']},
	area:{type:String,required : [true ,'area required']},
	address :{type:String ,required:[true ,'address required']},
	 city:{type:String,required:[true,'city required']},
	 landmark:{type:String, required:[true,'landmark required']},
	 pincode:{type:Number, required:[true,'pincode required']}
})
module.exports = mongoose.model ('Address' , addressSchema,'Address');