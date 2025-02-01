const mongoose = require('mongoose');


const contactScheme = new mongoose.Schema({

     firstName: { type: String,required: [true ,'first Name require']},
     lastName: { type: String,required: [true ,'last Name require']},
     emailId: { type: String , required: [ true ,' emailid require' ] },
      phoneNo:  {type:String, required:[true, 'phoneno required']},
          message:  {type:String, required:[true, 'message required']},
          
     date: { type:Date,default:Date.now}
});


module.exports = mongoose.model('Contact' , contactScheme,'Contact');
