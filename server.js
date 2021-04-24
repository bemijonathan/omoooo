const swaggerUi = require('swagger-ui-express');
const spec = require('./docs/swagger.json');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const express = require('express');
const specs = swaggerJsDoc(spec);
const userRoute = require('./route/user');
const walletRoute = require('./route/wallet');
// const { json } = require('body-parser');
const app = express();

app.use(bodyParser.json())

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);
app.use('/wallets', walletRoute)

app.use('/users', userRoute)

module.exports = app