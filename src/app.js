const express = require("express");
const cors = require("cors");
const app = express();
//Express middleware configuration
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || "localhost");

const errorHandler = require("errorhandler");

const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const docs = require("./docs.json")

const booksRoute = require("./routes/book.routes");
const readingRoute = require("./routes/reading.routes");
const userRoute = require("./routes/user.routes");
const authenticationRoute = require("./routes/authentication.routes");
const authenticationController = require('./controllers/authentication.controller');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

//Set up documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(docs));

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}
//Adding routes
app.use(authenticationRoute);
app.use(userRoute);
app.use(authenticationController.tokenValidation);
app.use(booksRoute);
app.use(readingRoute);

module.exports = app;