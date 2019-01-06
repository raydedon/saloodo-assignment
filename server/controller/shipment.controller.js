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

// get all shipments
exports.read = (req, res) => {
	var token = getToken(req.headers);
	if(token) {
		jwt.verify(token, config.get('jwt.secret'), function(err, decoded) {
			if(err) {
				res.status(403).send({success: false, msg: 'Unauthorized.'});
			} else {
				Shipment.find()
					.populate('biker')
					.exec()
					.then(shipments => {
						res.send(shipments);
					})
					.catch(err => {
						res.status(500).send({message: err.message || 'Some error occurred while retrieving Shipments.'});
					});
			}
		});
	} else {
		res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
};

// get shipment by id
exports.readById = (req, res) => {
	var token = getToken(req.headers);
	if(token) {
		jwt.verify(token, config.get('jwt.secret'), function(err, decoded) {
			if(err) {
				res.status(403).send({success: false, msg: 'Unauthorized.'});
			} else {
				if(decoded.role === Util.ROLE_BIKER) {
					Shipment.findById(req.params.shipmentId)
						.lean()
						.exec()
						.then(shipment => {
							res.send(shipment);
						})
						.catch(err => {
							res.status(500).send({message: err.message || 'Some error occurred while retrieving Shipment.'});
						});
				}
			}
		});
	} else {
		res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
};


// get shipments biker id
exports.readByUserId = (req, res) => {
	var token = getToken(req.headers);
	if(token) {
		jwt.verify(token, config.get('jwt.secret'), function(err, decoded) {
			if(err) {
				res.status(403).send({success: false, msg: 'Unauthorized.'});
			} else {
				if(decoded.role === Util.ROLE_BIKER) {
					Shipment.find({biker: req.params.userId})
						.exec()
						.then(shipments => {
							res.send(shipments);
						})
						.catch(err => {
							res.status(500).send({message: err.message || 'Some error occurred while retrieving Shipment.'});
						});
				}
			}
		});
	} else {
		res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
};

exports.update = (req, res) => {
	var token = getToken(req.headers);
	if(token) {
		jwt.verify(token, config.get('jwt.secret'), function(err, decoded) {
			if(err) {
				res.status(403).send({success: false, msg: 'Unauthorized.'});
			} else {
				if(decoded.role === Util.ROLE_BIKER) {
					Shipment.findByIdAndUpdate(req.params.shipmentId, {$set: {...req.body, updatedDate: Date.now()}}, {new: true, upsert: true})
						.then(shipment => {
							res.send(shipment);
						})
						.catch(err => {
							res.status(500).send({message: err.message || 'Some error occurred while updating Users.'});
						});
				}
			}
		});
	} else {
		res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
};

exports.updateBiker = (req, res) => {
	var token = getToken(req.headers);
	if(token) {
		jwt.verify(token, config.get('jwt.secret'), function(err, decoded) {
			if(err) {
				res.status(403).send({success: false, msg: 'Unauthorized.'});
			} else {
				if(decoded.role === Util.ROLE_MANAGER) {
					User.findById(req.params.userId, {lean: true}, function(error, user) {
						if(error) {
							return res.status(403).send({success: false, msg: 'Unauthorized.'});
						}
						return Shipment.findByIdAndUpdate(req.params.shipmentId, {$set: {biker: user.id, status: Util.SHIPMENT_STATUS_ASSIGNED}}, {new: true, upsert: true})
							.populate('biker')
							.exec()
							.then(shipment => {
								res.send(shipment);
							})
							.catch(err => {
								res.status(500).send({message: err.message || 'Some error occurred while updating Users.'});
							});
					});
				} else {
					res.status(403).send({success: false, msg: 'Unauthorized.'});
				}
			}
		});
	} else {
		res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
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
