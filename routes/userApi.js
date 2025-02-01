 const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const User= require('./../model/user')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");



mongoose.connect('mongodb://127.0.0.1:27017/elecdb');

router.get('/', (req, res) => {

	User.find({},(err,data)=>{
		if(!err)
			res.send(data)
		else
			res.send({'Error':err})
	}).sort({date:1})
})



//save
router.post('/', (req, res) => {  

User.findOne({emailId:req.body.emailId},(err,data)=>{
if(!data){
bcrypt.hash(req.body.password, 10, function(err, hash) {
 let data={userName:req.body.userName,emailId:req.body.emailId,
phoneNo:req.body.phoneNo,password:hash}
const rec = new User(data);
rec.save((err)=>{
if(!err){
	sendmail(data,(info) =>{
	console.log("Message sent: %s", info.messageId);
	})
	res.send({response:'Record Saved',st:1});
}
else
	res.send({response:'Error in Code', error:err,st:0});
});
});
}
else{
	
	res.send({response:'Account Already Exists',st:0});
}
});
})


//login
router.post('/login', (req, res) => {  
User.findOne({emailId:req.body.emailId},(err,data)=>{
if(!data){
	res.send({response:'Incorrect Email Id',st:0});
}
else{
bcrypt.compare(req.body.password, data.password, function(err, result) {
   if(result)
   		res.send({response:'Welcome user',st:1,userId:data._id});
   	else
   		res.send({response:'Incorrect Password',st:0});
});
}
})
})


// view profile 
router.get('/:id', (req, res) => {
	User.findOne({_id:req.params.id},(err,data)=>{
		if(!err)
			res.send(data)
		else
			res.send({'Error':err})
	})
})

// profile update 
router.patch('/:id', (req, res) => {
 let data={userName:req.body.userName,emailId:req.body.emailId,
phoneNo:req.body.phoneNo}
	User.updateOne({_id:req.params.id},data,(err,data)=>{
		if(!err)
			res.send({response:'Record Update',st:1});
			else
			res.send({response:'Error In Code','Error':err,st:0})
	})	
})



// password update //
router.patch('/pwd/:id', (req, res) => {
bcrypt.hash(req.body.password, 10, function(err, hash) {
let data={password:hash}
	User.updateOne({_id:req.params.id},data,(err,data)=>{
		if(!err)
			res.send({response:'Password Update',st:1});
			else
			res.send({response:'Error In Code','Error':err,st:0})
	})	
})
})

//reset pwd
router.patch('/reset/:emailId', (req, res) => {
bcrypt.hash(req.body.password, 10, function(err, hash) {
let data={password:hash}
	User.updateOne({emailId:req.params.emailId},data,(err,data)=>{
		if(!err)
			res.send({response:'Password Update',st:1});
			else
			res.send({response:'Error In Code','Error':err,st:0})
	})	
})
})

//forget pwd
router.post('/forget', (req, res) => {  

User.findOne({emailId:req.body.emailId},(err,data)=>{
if(data){

 let data={emailId:req.body.emailId,code:req.body.code}

	sendmail1(data,(info) =>{
	console.log("Message sent: %s", info.messageId);
	res.send({response:'Mail Sent',st:1});
	})
	
}
else{
	
	res.send({response:'Account not Exists',st:0});
}
});
})


//send mail to user 
async function sendmail(data,cb) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ayushkaushal9090@gmail.com", // generated ethereal user
      pass: "xpat rksy qhoi kdxp", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"e-commerce " <ayushkaushal9090@gmail.com>', // sender address
    to: data.emailId, // list of receivers
    subject: "Welcome to Amazon ✔", // Subject line
  
    html: `<h2>Dear ${data.firstName} ${data.lastName} </h2><p>Your shopping-site account has been created successfully</p><p>Enjoy purchasing new product </p> <h3>Regards e-commerce</h3>` // html body
  });
 cb(info)

 
}
//forget pwd when mail se code jeaga
async function sendmail1(data,cb) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
     user: "ayushkaushal9090@gmail.com", // generated ethereal user
      pass: "xpat rksy qhoi kdxp", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Amazon " <ayushkaushal9090@gmail.com>', // sender address
    to: data.emailId, // list of receivers
    subject: "Reset Password ✔", // Subject line
  
    html: `<h2>Dear User  </h2><p>You are receiving this email because we received a password reset request for your account</p><p>  To verify your identity and reset your password, please enter the following verification code: </p><p>${data.code}</p <p>If you did not request a password reset, no further action is required.</p> <h3>Regards e-commerce</h3>` // html body
  });

 cb(info)
 
}
module.exports=router;