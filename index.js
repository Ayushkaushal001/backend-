const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

const path = require ('path')
const app = express()
const port = 3001

app.use(cors())
app.use(cors({origin: '*'}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/',(req,res) =>{
	res.send("Hello World !")

})


const priceComparisonApi = require('./routes/priceComparisonApi')
app.use('/api', priceComparisonApi);


const adminApi = require('./routes/adminApi')
app.use('/admin', adminApi)

const brandApi = require('./routes/brandApi')
app.use('/brand', brandApi)

const cartApi = require('./routes/cartApi')
app.use('/cart', cartApi)

const orderApi = require('./routes/orderApi')
app.use('/order', orderApi)

const categoryApi = require('./routes/categoryApi')
app.use('/category', categoryApi)

const addressApi = require('./routes/addressApi')
app.use('/address', addressApi)

const subcategoryApi = require('./routes/subcategoryApi')
app.use('/subcategory', subcategoryApi)

const userApi = require('./routes/userApi')
app.use('/user', userApi)

const productApi = require('./routes/productApi')
app.use('/product', productApi)

const contactApi = require('./routes/contactApi')
app.use ('/contact', contactApi)

app.listen(port ,() =>{
	console.log(`App listen on the port ${port}`)
}) 