// import express
const express = require('express');
// import ejs layout
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();

const flash=require("connect-flash");
const session=require("express-session");

const passport=require("passport");
require("./config/passport")(passport);

// config file
require('./config/config');

// use template engine ejs
app.use(expressEjsLayouts);
app.set("view engine", "ejs");

// bodyParser

app.use(express.urlencoded({
    extended: true
}));

// express session 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// flash

app.use(flash());

// vars
app.use((req,res,next)=>{
	res.locals.success_msg=req.flash("success_msg");
	res.locals.error_msg=req.flash("error_msg");
	next();
});


// routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));

// create port
const port = process.env.PORT || 5000;

// listen the port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))