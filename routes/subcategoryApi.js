const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer');
const router = express.Router()


const Subcategory = require('./../model/subcategory')

mongoose.connect('mongodb://127.0.0.1:27017/elecdb');

router.get('/' ,(req,res) =>{

	Subcategory.find({},(err,data) =>{
		if(!err)
			res.send(data)
		else
			res.send({'Error' :err})
	})
})

router.get('/:id' ,(req,res) =>{

	Subcategory.findOne({_id:req.params.id},(err,data) =>{
		if(!err)
			res.send(data)
		else
			res.send({'Error' :err})
	})
})


router.post('/',  (req, res) => {
   
    let data = {subcategory:req.body.subcategory, categoryId:req.body.categoryId};

 const rec = new Subcategory(data);
rec.save((err)=>{
if(!err)
	res.send({response:'Record Saved',st:1});
else{
	console.log(err)
	res.send({response:'Error in Code',st:0});
}
})
})

router.delete('/:id', (req, res) => {
  Subcategory.deleteOne({_id:req.params.id},(err,data)=>{
    if(!err)
      res.send({response:'Record Deleted',st:1});
      else
      res.send({'Error':err})
  })  
})

module.exports = router;
