var express=require('express');
var router=express.Router();
var User=require('../models/user');
var Feedback=require('../models/feedback_form');
var passport=require('passport');

const accountSid = 'ACdeca08a6d885a7251765610a073a05f9';
const authToken = '65ef60e65a021d1bacca40d259bad659';

const client=require('twilio')(accountSid,authToken);
//const bot = new Discord.client('ACdeca08a6d885a7251765610a073a05f9','65ef60e65a021d1bacca40d259bad659');

/*
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: 'c707bbe2',
    apiSecret: 'xsMVbjf7m6AWEwAs'
  });

  
const NEXMO_FROM_NUMBER="919381179028";
//   nexmo.message.sendSms(
//     919381179028, '919494292919', 'haiiii',
//       (err, responseData) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.dir(responseData);
//         }
//       }
//    );
*/

const authCheck=(req,res,next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};


router.post('/twilio',function(req,res){
    client.messages
      .create({from: '+18593286225', body: 'you got 15 knocks', to: '+919381179028'})
      .then(message => res.json(message.sid))
      .catch((err) => {res.json(err)})
      .done();
    // client.send({
    //     to:'+918686779678',
    //     from:'+919381179028',
    //     body:'helooooo'
    // },function(err,data){
    //     if(err)
    //     console.log(err);
    //     console.log(data);
    // });
});


router.get('/',function(req,res){
    res.send('haiiiii');
});

router.get('/home',authCheck,function(req,res){
    res.send('You r logged in as' + " " + req.user.username);
    //req.json({user:req.user});
});

/*
router.get('/login',(req, res) => {
     //console.log(req.headers.username);
    User.findOne({username: req.headers.username, password: req.headers.password}).then((data) => {
         res.json(data);
        //res.redirect('/home');
    });
 });
*/
 
/*
router.post('/login',passport.authenticate('local'),function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  User.findOne({username: req.headers.username, password: req.headers.password}).then((data) => {
    res.json(data);
});
});


router.post('/signup',function(req,res){
    req.body.username
    req.body.password
    User.create(new User({username:req.body.username}),req.body.password,req.body.emailid).then((data)=>{
        res.json(data);
    });
    
    });   

*/
/*
router.post('/signup',function(req,res){
   var username=req.body.username;
    var password=req.body.password;
    var emailid=req.body.emailid;
    var newuser={username:username,password:password,emailid:emailid}
    User.create(newuser,function(err,users){
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    });
 });
 


router.get('/signup',function(req,res){
    User.find({},function(err,allusers){
        if(err){
            console.log(err);
        }else{
            res.json(allusers);
        }
    });
})

*/

router.get('/globallist',function(req,res){
    res.send('globalll');
});

router.get('/globallist/feedback',function(req,res){
    res.send('feedbackkk');
});

router.get('/employeelist',function(req,res){
    //console.log(req.user);
    Feedback.find({},function(err,allfeedbacks){
        if(err){
            console.log(err);
        }else{
            res.json(allfeedbacks);
        }
    });
});

router.get('/employeelist/:id',function(req,res){
    Feedback.findById(req.params.id).then((data)=>{
        res.json(data);
    });
});

router.get('/employeelist/:id/lastpage',function(req,res){
    res.send('last page');
});

router.get('/employeelist/new',function(req,res){
    res.send('newwwww');
});

router.post('/employeelist',function(req,res){
    console.log("#$$$$$$$##############", req.body);
    // const data = JSON.stringify(req.body);
    const keys = Object.keys(req.body);
    console.log("%%%%%%%%%%%%%%%%%%", keys);
    const data = JSON.parse(keys);
    console.log("@@@@@@@@@@@@@@@@", data.username);

    // const data = JSON.parse(req.body);
    // console.log("PPPPPPPPPPP", data);
    Feedback.create(data,function(err,newFeedback){
         //console.log("Nothing" + req.body); 

        console.log("data" + req); 

        if(err){
            //console.log(req.body.body); 
            console.log('error');
        }else{
            console.log(req.body);
            console.log('data');
            res.redirect('/employeelist');
        }
    });
});
/*
router.post('/send',(req,res)=>{
    console.log(req.body);
    nexmo.message.sendSms(
        NEXMO_FROM_NUMBER, req.body.toNumber, req.body.message, {type: 'unicode'},
        (err, responseData) => {
            if(err) {
                console.log("%%%%%%%%%%%%%%",err);
            }
            else {
                res.json(responseData)
            }}
      );
});
*/



module.exports=router;
