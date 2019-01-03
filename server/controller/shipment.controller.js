const User = require('../model/user');
const Shipment = require('../model/shipment');
const Util = require('../Util');
const config = require('config');
let jwt = require('jsonwebtoken');

exports = module.exports = {};

exports.create = (req, res) => {
	var token = getToken(req.headers);
	if(token) {
		let {
			origin = '',
			destination = '',
			status = Util.SHIPMENT_STATUS_WAITING,
			desc = ''
		} = req.body;
		const shipment = new Shipment({origin, destination, status, desc});
		// Save User in the database
		jwt.verify(token, config.get('jwt.secret'), function(err, decoded) {
			if(err) {
				res.status(403).send({success: false, msg: 'Unauthorized.'});
			} else {
				shipment.save()
					.then(data => {
						res.send(data);
					})
					.catch(err => {
						res.status(500).send({
							message: err.message || 'Some error occurred while creating the Shipment.'
						});
					});
			}
		});
	} else {
		res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
};

exports.read = (req, res) => {
	var token = getToken(req.headers);
	if(token) {
		jwt.verify(token, config.get('jwt.secret'), function(err, decoded) {
			if(err) {
				res.status(403).send({success: false, msg: 'Unauthorized.'});
			} else {
				if(decoded.role === Util.ROLE_BIKER) {
					
					Shipment.find()
						.then(shipments => {
							res.send(shipments);
						})
						.catch(err => {
							res.status(500).send({message: err.message || 'Some error occurred while retrieving Shipments.'});
						});
				}
			}
		});
	} else {
		res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
};

exports.readAll = (req, res) => {
};

exports.update = (req, res) => {
};

exports.delete = (req, res) => {
};

function getToken(headers) {
	if(headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if(parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
}
