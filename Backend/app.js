const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:5173',
  ],
  credentials: true,
}));

const authRouter = require('./routes/auth.routes');
app.use('/api/auth', authRouter);

const productRouter = require('./routes/product.routes');
app.use('/api/products', productRouter);

const cartRouter = require('./routes/cart.routes');
app.use('/api/cart', cartRouter);

const orderRouter = require('./routes/order.routes');
app.use('/api/orders', orderRouter);

const paymentRouter = require('./routes/payment.routes');
app.use('/api/payment', paymentRouter);

const agentRouter = require('./routes/agent.routes');
app.use('/api/agent', agentRouter)

module.exports = app;