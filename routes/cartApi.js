const express = require('express');
const router  = express.Router();
const  mongoose = require('mongoose');
const Cart =  require('../model/cart');


mongoose.connect('mongodb://127.0.0.1:27017/elecdb');



//Add to cart -Post
router.post('/' ,(req,res) =>{
	let data = {title:req.body.title,image:req.body.image,mrp:req.body.mrp,
	productId:req.body.productId,
	userId:req.body.userId,quantity:req.body.quantity,
	price:req.body.price,}
const rec = new Cart(data);
rec.save((err)=>{
if(!err)
	res.send({response:'Added To Cart',st:1});
else{
	console.log(err)
	res.send({response:'Error in Code',st:0});
}

}) 
})


//View cart -get(useruserId)
router.get('/user/:userId' ,(req,res) =>{
	Cart.find({userId:req.params.userId,status:'incart'} ,(err,data) =>{
		if(!err)
			res.send(data);
		else
			res.send({Response:'Error in code'})
		
	})
})
//delete item -del
router.delete('/:userId',(req,res)=>{
	let userId=req.params.userId;
	Cart.deleteOne({_userId:userId},(err)=>{
		if(!err)
			res.send({response:"Item Deleted",st:1})
		else
			res.send({response:"Error in code",st:0,error:err})
	})
})


//update quantity - patch 
router.patch('/quantity/:Id',(req,res) =>{
	let data={quantity:req.body.quantity};
Cart.updateOne({_id:req.params.Id},data, (err) =>{
        if(!err)
			res.send({response:"Item updated",st:1})
		else
			res.send({response:"Error in code",st:0,error:err})
})
})


//check in cart =/incart/:userId/:productId-get   //'dikaat aeag'
router.get('/incart/:userId/:productId' ,(req,res) =>{
	Cart.find({userId:req.params.userId,productId:req.params.productId,status:'incart'} ,(err,data) =>{
		if(!err)
			res.send(data);
		else
			res.send({Response:'Error in code'})
		
	})
})



//update status (change status) -patch
router.patch('/status/:userId',(req,res) =>{
	let data={status:req.body.status,orderId:req.body.orderId};
Cart.updateOne({userId:req.params.userId,status:'incart'},data, (err) =>{
        if(!err)
			res.send({response:"status updated",st:1})
		else
			res.send({response:"Error in code",st:0,error:err})
})
})

//view items -get(orderId)
router.get('/order/:orderId' ,(req,res) =>{
	Cart.find({orderId:req.params.orderId} ,(err,data) =>{
		if(!err)
			res.send(data);
		else
			res.send({Response:'Error in code'})
		
	})
})














module.exports = router;
module.exports = router;