require('express-async-errors');
const express = require('express');
const cors = require('cors');
const usersRoute = require('../routes/users.routes');
const productsRoutes = require('../routes/products.routes');
const salesRoutes = require('../routes/sales.routes');
const errorMiddleware = require('../middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(usersRoute);
app.use(productsRoutes);
app.use(salesRoutes);

app.use(errorMiddleware);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
