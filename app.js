require("dotenv").config();
     express = require("express"),
      exphbs = require("express-handlebars"),
        path = require("path"),
     favicon = require("serve-favicon"),
      logger = require("morgan"),
  bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
     session = require("express-session"),
MongoDBStore = require("connect-mongodb-session")(session),
expressSanitizer = require("express-sanitizer"),
      routes = require("./routes/html"),
         app = express();

app.engine(
  ".handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: app.get("views") + "/layouts",
    partialsDir: [app.get("views") + "/partials"]
  })
);
app.set("view engine", ".handlebars");

// view engine setup
const environment = process.env.NODE_ENV; //set env variable to node_devlopment - changes db location
// console.log(process.env); //logs entire .env object
console.log(process.env[environment + "_db"]); //logs out current database

// uncomment after placing your favicon in /public
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(express.static(path.join(__dirname, "public")));

////////////////Session Storage////////////////////
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || "mongodb://localhost/DetailDevilDB",
  collection: "MySessions"
});

app.use(
  session({
    secret: "I love New York",
    resave: true,
    saveUninitialized: true,
    store: store,
    store: store,
    cookie: {
      maxAge: new Date(Date.now() + (60*60*1000))
    }
  })
);
////////////////////////////////////////////

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/DetailDevilDB"
);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
