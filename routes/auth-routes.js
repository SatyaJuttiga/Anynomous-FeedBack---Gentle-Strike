var express=require('express');
var router=express.Router();
const passport=require('passport');



//auth routes

router.get('/login',(req,res) => {
    res.send('login page');
});

router.get('/logout',(req,res)=>{
    //res.send('logging out');
    req.logout();
    res.redirect('/');
});

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
    //res.send(req.user);
    res.redirect('/home');
});

module.exports=router;

