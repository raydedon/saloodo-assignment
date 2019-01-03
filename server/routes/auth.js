let passport = require('passport');
require('../config/passport')(passport);
let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();
let User = require('../model/user');
const config = require('config');

router.post('/register', function(req, res) {
	if(!req.body.userName || !req.body.password) {
		res.json({success: false, msg: 'Please pass username and password.'});
	} else {
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
		// save the user
		newUser.save(function(err) {
			if(err) {
				return res.json({success: false, msg: 'Username already exists.'});
			}
			res.json({success: true, msg: 'Successful created new user.'});
		});
	}
});

router.post('/login', function(req, res) {
	User.findOne({
		userName: req.body.userName
	}, function(err, user) {
		if(err) throw err;

		if(!user) {
			res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
		} else {
			// check if password matches
			user.comparePassword(req.body.password, function(err, isMatch) {
				if(isMatch && !err) {
					// if user is found and password is right create a token
					let token = jwt.sign(user.toJSON(), config.get('jwt.secret'));
					// return the information including token as JSON
					res.json({success: true, token, user: user.toJSON()});
				} else {
					res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
				}
			});
		}
	});
});

module.exports = router;
