const express = require('express');
const swaggerUI = require('swagger-ui-express');
const { productsRoutes } = require('./routes');
const { salesRoutes } = require('./routes');

const app = express();

app.use(express.json());

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(require('./swagger.json')));

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
