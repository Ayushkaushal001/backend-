

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
const priceComparisonApi = require('./routes/priceComparisonApi');
app.use('/api', priceComparisonApi);

const adminApi = require('./routes/adminApi');
app.use('/admin', adminApi);

const brandApi = require('./routes/brandApi');
app.use('/brand', brandApi);

const cartApi = require('./routes/cartApi');
app.use('/cart', cartApi);

const orderApi = require('./routes/orderApi');
app.use('/order', orderApi);

const categoryApi = require('./routes/categoryApi');
app.use('/category', categoryApi);

const addressApi = require('./routes/addressApi');
app.use('/address', addressApi);

const subcategoryApi = require('./routes/subcategoryApi');
app.use('/subcategory', subcategoryApi);

const userApi = require('./routes/userApi');
app.use('/user', userApi);

const productApi = require('./routes/productApi');
app.use('/product', productApi);

const contactApi = require('./routes/contactApi');
app.use('/contact', contactApi);

// Start Server
app.listen(port, () => {
  console.log(`🚀 App listening on port ${port}`);
});
