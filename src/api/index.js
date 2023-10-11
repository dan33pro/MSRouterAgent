const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config = require('../../config');
const road = require('./components/road/network.js');
const driver = require('./components/driver/network.js');
const errors = require('../tools/network/errors');

const app = express();

app.use(bodyParser.json());

// ROUTER
const swaggerDoc = require('./swagger.json');

app.use('/api/road', road);
app.use('/api/driver', driver);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Debe ser el ultimo
app.use(errors);

app.listen(config.msRouterAgent.port, () => {
    console.log('Api escuchando en el puerto ', config.msRouterAgent.port);
});