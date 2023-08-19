const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const seedRouter = require('./routers/seedRouter');
const userRouter = require('./routers/userRouter');
const { errorResponse } = require('./controllers/responseController');
const authRouter = require('./routers/authRouter');
const categoryRouter = require('./routers/categoryRouter');
const productRouter = require('./routers/productRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/seed', seedRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => res.send('Server is running fine! YaY!'));

app.use((err, req, res, next) =>
  errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  })
);

module.exports = app;
