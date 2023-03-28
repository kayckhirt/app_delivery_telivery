const express = require('express');
const usersRoute = require('../routes/users.routes');
// const productsRoutes = require('../routes/products.routes');
// const salesRoutes = require('../routes/sales.routes');
const errorMiddleware = require('../middlewars/error.middleware');

const app = express();
app.use(express.json());

app.use(usersRoute);
// app.use(productsRoutes);
// app.use(salesRoutes);

app.use(errorMiddleware);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;