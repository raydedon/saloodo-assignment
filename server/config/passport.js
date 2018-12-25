const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');
module.exports = function(passport) {
	// passport init setup
	// serialize the user for the session
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	// deserialize the user
	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
	opts.secretOrKey = settings.secret;
	passport.use('local-login', new JwtStrategy(opts, function(jwt_payload, done) {
		User.findOne({id: jwt_payload.id}, function(err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));

	
	
	passport.use('local-login', new LocalStrategy({
			usernameField : 'userName',
			passwordField : 'password',
			passReqToCallback : true
		},
		function(req, userName, password, done) {
			if (userName)
			// format to lower-case
				userName = userName.toLowerCase();
			// process asynchronous
			process.nextTick(function() {
				User.findOne({userName}, function(err, user) {
					// if errors
					if (err)
						return done(err);
					// check errors and bring the messages
					if (!user)
						return done(null, false, req.flash('loginMessage', 'No user found.'));
					if (!user.validPassword(password))
						return done(null, false, req.flash('loginMessage', 'Wohh! Wrong password.'));
					// everything ok, get user
					else
						return done(null, user);
				});
			});
		}));
	
	
	// Signup local strategy
	passport.use('local-signup', new LocalStrategy({
			usernameField : 'userName',
			passwordField : 'password',
			passReqToCallback : true
		},
		function(req, userName, password, done) {
			if (userName)
			// format to lower-case
				userName = userName.toLowerCase();
			// asynchronous
			process.nextTick(function() {
				// if the user is not already logged in:
				if (!req.user) {
					User.findOne({userName}, function(err, user) {
						// if errors
						if (err)
							return done(err);
						// check userName
						if (user) {
							return done(null, false, req.flash('signupMessage', 'Wohh! the userName is already taken.'));
						} else {
							// create the user
							let {
								name = '',
								phoneNumber = '',
								email = '',
								userName = '',
								password = '',
								gender = 0,
								country = '',
								state = '',
								pinCode = ''
							} = req.body;
							const newUser = new User({name, phoneNumber, email, userName, password: User.generateHash(password), gender, country, state, pinCode});

							// save data
							newUser.save(function(err) {
								if (err)
									throw err;
								return done(null, newUser);
							});
						}
					});
				} else {
					return done(null, req.user);
				}
			});
		}));

}