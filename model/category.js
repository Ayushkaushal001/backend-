const mongoose = require('mongoose');


const categoryScheme = new mongoose.Schema({

     title: { type: String,required: [true ,'title require']},
     image: { type: String,required: [true ,'image require']},
      description: { type: String,required: [true ,'description require']},
    
});

module.exports = mongoose.model('category' , categoryScheme,'category');
