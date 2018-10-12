const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./keys');
const Oauth=require('../models/oauth_user');

passport.serializeUser((oauth,done) => {
    done(null,oauth.id)
});


passport.deserializeUser((id,done) => {
    Oauth.findById(id).then((oauth) => {
        done(null,oauth);
    });
});




passport.use(
    new GoogleStrategy({
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    },(accessToken,refreshToken,profile,done) => {
         //console.log('passport callback function fired');
         //console.log(profile);
         Oauth.findOne({googleid:profile.id}).then((currentOauth) => {
             if(currentOauth){
                 console.log('user is:',currentOauth);
                 done(null,currentOauth);
             }else{
                new Oauth({
                    username:profile.displayName,
                    googleid:profile.id,
                    thumbnail:profile._json.image.url
                }).save().then((newOauth) => {
                    console.log('new user created:' + newOauth);
                    done(null,currentOauth);
                });
             }
         });
    })
)



