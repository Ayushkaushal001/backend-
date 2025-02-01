 const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const router = express.Router()
const axios = require('axios');

const Product = require('./../model/product')

mongoose.connect('mongodb://127.0.0.1:27017/elecdb');

router.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1; //
  const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
  const skip = (page - 1) * itemsPerPage;  //this will skip item per page.

  try {
    const products = await Product.find().skip(skip).limit(itemsPerPage);
    const totalProducts = await Product.countDocuments(); //used to calculate total no of products.
    res.json({
      products,
      totalPages: Math.ceil(totalProducts / itemsPerPage),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});




router.get('/', (req,res) => {
	Product.find({}, (err,data) => {
		if(!err)
			res.send(data)
   else
   	res.send({'Error':err})
	})
})

router.get('/recent', (req,res) => {
  Product.find({}, (err,data) => {
    if(!err)
      res.send(data)
   else
    res.send({'Error':err})
  }).sort({date:-1}).limit(8)
})

router.get('/search/:query', (req,res) => {
  let query= req.params.query;
  console.log(query)
  Product.find({"title": {"$regex": query, "$options": "i"}}, (err,data) => {  //chatgpt 
    if(!err)
      res.send(data)
   else
    res.send({'Error':err})
  }).sort({date:-1})
})  




// New route for price comparison
router.get('/compare/:productId', async (req, res) => {
    const productId = req.params.productId;

    try {
        // Fetch product data to get the title or other identifiers
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        const productTitle = product.title;

        // Call an external API or a service to get price comparisons
        const priceComparisonData = await fetchPriceComparison(productTitle);

        res.send(priceComparisonData);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

async function fetchPriceComparison(productTitle) {
    // This is a placeholder for the actual API that provides price comparisons
    const response = await axios.get(`https://api.pricecomparison.com/search?query=${encodeURIComponent(productTitle)}`);
    return response.data;
}



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/')
  },
  filename: function (req, file, cb) {
   const filename = file.originalname.toLowerCase().split(' ').join('-') 
    cb(null, filename)
  }
})

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
   let img  = "http://localhost:3001/public/" + req.file.filename ;
        let data = {title:req.body.title,
         image:img,
         mrp:req.body.mrp,
   price:req.body.price,
    subcategory:req.body.subcategory,
category:req.body.category,
description:req.body.description ,
brand:req.body.brand,
spec:req.body.spec,
features:req.body.features};
console.log(req.body)
 const rec = new Product(data);
rec.save((err)=>{
if(!err)
	res.send({response:'Record Saved',st:1});
else{
console.log(err)
	res.send({response:'Error in Code',st:0 , error:err});
}
})
})


router.get('/:id',(req,res) =>{
  Product.findOne({_id:req.params.id} ,(err,data) =>{
    if(!err)
      res.send(data);
    else
      res.send({'Error' :err})
  })
})


router.get('/sub/:subcategory', (req,res) => {
  Product.find({subcategory:req.params.subcategory}, (err,data) => {
    if(!err)
      res.send(data)
   else
    res.send({'Error':err})
  })
})

router.get('/category/:category', (req,res) => {
  Product.find({category:req.params.category}, (err,data) => {
    if(!err)
      res.send(data)
   else
    res.send({'Error':err})
  })
})

router.get('/brand/:brand', (req,res) => {
  Product.find({brand:req.params.brand}, (err,data) => {
    if(!err)
      res.send(data)
   else
    res.send({'Error':err})
  })
})

router.patch('/data/:id',(req,res) =>{
      let data = {title:req.body.title,mrp:req.body.body,price:req.body.price,subcategory:req.body.subcategory,
category:req.body.category,description:req.body.description,brand:req.body.brand,spec:req.body.spec,features:req.body.features};
  Product.updateOne({_id:req.params.id},data ,(err,data)=>{
    if(!err)
      res.send({Response:"Record update"})
  
  else
  res.send({'Error':err})
})
})



router.patch('/:id', upload.single('image'), (req, res) => {
   let img  = "http://localhost:3001/public/" + req.file.filename ;
        let data = {title:req.body.title, image:img ,mrp:req.body.body,price:req.body.price,subcategory:req.body.subcategory,
category:req.body.category,description:req.body.description ,brand:req.body.brand,spec:req.body.spec,features:req.body.features};

  Product.updateOne({_id:req.params.id},data ,(err,data)=>{
if(!err)
  res.send({response:'Record Updated',st:1});
else{

  res.send({response:'Error in Code',st:0 , error:err});
}
})
})



router.delete('/:id', (req, res) => {
  Product.deleteOne({_id:req.params.id},(err,data)=>{
    if(!err)
      res.send({response:'Record Deleted',st:1});
      else
      res.send({'Error':err})
  })  
})

module.exports = router;
