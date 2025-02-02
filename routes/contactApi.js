const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact= require('./../model/contact')
const nodemailer = require('nodemailer');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/elecdb');



router.get('/', (req, res) => {
  Contact.find({}, (err, data) => {
    if (!err)
      res.send(data);
    else
      res.send({ 'Error': err });
  });
});



router.post('/', (req, res) => {
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    phoneNo: req.body.phoneNo,
    message: req.body.message,
  };

  const rec = new Contact(data);
  rec.save((err) => {
    if (!err) {
      sendMail(data, (info) => {
        console.log("Message sent: %s", info.messageId);
      });
      res.send({ response: 'Record Saved', st: 1 });
    } else {
      res.send({ 'Error': err });
    }
  });
});


async function sendMail(data, cb) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
     user: "gagandeep.a24@gmail.com", // generated ethereal user
      pass: "guog svsd ojxk deaf", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Shopping-site " <gagandeep.a24@gmail.com>', // sender address
    to: data.emailId, // list of receivers
    subject: 'Thank you for your message', // Subject line
    html: `<h2>Dear ${data.firstName} ${data.lastName} </h2><p>Thanks for contacting us</p><p>Our team will respond to your query within 48 hours</p><h3>Regards Shopping-site</h3>`, // html body
  });

  cb(info);
}

module.exports = router;
