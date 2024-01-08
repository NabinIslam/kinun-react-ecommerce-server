const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const categoryRouter = require('./routers/categoryRouter');
const productRouter = require('./routers/productRouter');
const brandRouter = require('./routers/brandRouter');
const contactRouter = require('./routers/contactRouter');
const userRouter = require('./routers/userRouter');
const wishlistRouter = require('./routers/wishlistRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/brands', brandRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);
app.use('/api/wishlist', wishlistRouter);

app.get('/', (req, res) => res.send(`Kinun server is running fine!`));

module.exports = app;
