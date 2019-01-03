const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const User = require('../model/user');
const config = require('config');

module.exports = function(passport) {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = config.get('jwt.secret');
	passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
		User.findOne({_id: jwtPayload.id}, function(err, user) {
			if(err) {
				return done(err, false);
			}
			if(user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
};