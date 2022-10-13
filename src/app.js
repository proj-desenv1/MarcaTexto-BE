const express = require("express");
const cors = require("cors");
const errorHandler = require("errorhandler");
const helmet = require("helmet");

const booksRoute = require("./routes/book.routes");
const readingRoute = require("./routes/reading.routes");
const userRoute = require("./routes/user.routes");
const authenticationRoute = require("./routes/authentication.routes");
const returnError = require("./controllers/utils/return-error");
const swaggerUi = require("swagger-ui-express");
const docs = require("./docs.json")

const app = express();

//Express middleware configuration
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || "localhost");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}

//Set up documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(docs));

//Adding routes
app.use(authenticationRoute);
app.use(booksRoute);
app.use(readingRoute);
app.use(userRoute);

app.use(returnError);
module.exports = app;