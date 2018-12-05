var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require ('./schemas/users.js');
const passport = require ('passport');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretforjwtxd';
opts.usernameField = 'email';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //console.log('exee');
    //console.log(jwt_payload);
    //console.log(jwt_payload._id);
    User.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
          console.log(err);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
        console.log("algo");
    });
}));
