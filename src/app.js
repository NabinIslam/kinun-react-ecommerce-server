const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//router imports
const categoryRouter = require('./routers/categoryRouter');
const productRouter = require('./routers/productRouter');
const brandRouter = require('./routers/brandRouter');
const contactRouter = require('./routers/contactRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const wishlistRouter = require('./routers/wishlistRouter');
const cartRouter = require('./routers/cartRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/brands', brandRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => res.send(`Kinun server is running fine!`));

module.exports = app;
