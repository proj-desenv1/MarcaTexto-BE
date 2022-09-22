const express = require("express");
const cors = require("cors");
const errorHandler = require("errorhandler");
const helmet = require("helmet");

const exampleRoute = require("./routes/example.route");

const app = express();

//Express middleware configuration
app.set('port', process.env.PORT || 3000);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}


//Adding routes
app.use(exampleRoute);

module.exports = app;