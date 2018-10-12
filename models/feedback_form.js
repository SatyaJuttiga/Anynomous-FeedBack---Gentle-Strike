var mongoose=require('mongoose');
var passportLocalMongoose=require('passport-local-mongoose');

var FeedbackSchema=new mongoose.Schema({
    username:String,
    image:String,
    designation:String
});

FeedbackSchema.plugin(passportLocalMongoose);
var Feedback=module.exports=mongoose.model('Feedback',FeedbackSchema);
/*
Feedback.create({
    username:'Lalitha',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfU-6-NInHngeBMQbktdF487LbvjdBAAzRmZoFX46YC_xI3Qfp',
    designation:'Software Engineer' 
});
*/