

const mongoose = require('mongoose');


const subcategoryScheme = new mongoose.Schema({

     subcategory: { type: String,required: [true ,'subcategory require']},
     categoryId: { type: String,required: [true ,'categoryId require']},
        
    
});

module.exports = mongoose.model('subcategory' , subcategoryScheme,'subcategory');