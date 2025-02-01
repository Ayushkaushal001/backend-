const express = require('express');
const router  = express.Router();
const  mongoose = require('mongoose');
const Brand =  require('../model/brand');
const multer = require('multer');

mongoose.connect('mongodb://127.0.0.1:27017/elecdb');

router.get('/' ,(req,res) =>{

	Brand.find({},(err,data) =>{
		if(!err)
			res.send(data)
		else
			res.send({'Error' :err})
	})
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/')
  },
  filename: function (req, file, cb) {
   const filename = file.originalname.toLowerCase().split(' ').join('-') 
    cb(null, filename)
  }
})
const upload = multer({ storage: storage })
router.post('/', upload.single('image'), (req, res) => {
   let img  = "http://localhost:3001/public/" + req.file.filename ;
    let data = {title:req.body.title, image:img ,description:req.body.description};

 const rec = new Brand(data);
rec.save((err)=>{
if(!err)
	res.send({response:'Record Saved',st:1});
else{
	res.send({response:'Error in Code',st:0});
}
})
})

router.get('/:id',(req,res) =>{
  Brand.findOne({_id:req.params.id} ,(err,data) =>{
    if(!err)
      res.send(data);
    else
      res.send({'Error' :err})
  })
})

router.delete('/:id', (req, res) => {
  Brand.deleteOne({_id:req.params.id},(err,data)=>{
    if(!err)
      res.send({response:'Record Deleted',st:1});
      else
      res.send({'Error':err,st:0})
  })  
})


module.exports = router;
