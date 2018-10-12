var express=require('express');
var app=express();
var bodyparser=require('body-parser');
var methodOverirde=require('method-override');
var expressSession=require('express-session');
var mongoose=require('mongoose');
var keys=require('./config/keys');
var cookieSession=require('cookie-session')
var expressSession=require('express-session');
var passport=require('passport');
var passportSetup=require('./config/passport-setup'); 
//var cors = require('cors');
//const Nexmo = require('nexmo');

var User=require('./models/user');
var Feedback=require('./models/feedback_form');
var indexRoutes=require('./routes/index');
var authRoutes=require('./routes/auth-routes');
const port=process.env.PORT || 8080;



/*
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
*/

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    next();
});

app.use(cookieSession({
    maxAge:24 * 60 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverirde('_method'));
app.use(indexRoutes);
app.use('/auth',authRoutes);

mongoose.connect(keys.mongodb.dbURI,() => {
    console.log('connected to mongo db');
});


//passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());





  


app.listen(port,function(req,res){
    console.log('server started on port' + port);
});
