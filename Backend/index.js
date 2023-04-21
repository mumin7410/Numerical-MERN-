const express = require("express");
const mongoose = require("mongoose");
const app = express();
const {router, testRouter} = require('./routs/numerRoutes')
const cors = require("cors")
var bodyParser = require('body-parser');

const swaggerJSDoc = require("./swagger.json");
const swaggerUi = require("swagger-ui-express");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));

app.use(cors({
    origin:'*',
    methods:['GET', 'POST','PUT','DELETE'],
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);
app.use(testRouter);

mongoose
    .connect("mongodb://localhost:27017/Numer")
    .then(() => console.log("Connect To MongoDBs"))
    .catch((err) => console.log(err));

    
app.listen(5000, () => console.log("Server is running"));