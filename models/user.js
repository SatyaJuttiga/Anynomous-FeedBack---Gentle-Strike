var mongoose=require('mongoose');
var passportLocalMongoose=require('passport-local-mongoose');

var UserSchema=new mongoose.Schema({
    username:String,
    emailid:String,
    password:String
});

UserSchema.plugin(passportLocalMongoose);
var User=module.exports=mongoose.model('User',UserSchema);

/*
User.create({
    username:'bharat',
    emailid:'bharat56@gmail.com',
    password:'897'
});
*/