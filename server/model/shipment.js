const mongoose = require('mongoose');
const Util = require('../Util');
const Schema = mongoose.Schema;

const shipmentSchema = mongoose.Schema({
	origin: {
		type: String,
		required: true
	},
	destination: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true,
		default: Util.SHIPMENT_STATUS_WAITING
	},
	desc: String,
	updatedDate: {
		type: Date,
		default: Date.now
	},
	biker: {type: Schema.Types.ObjectId, ref: 'User'}
});

shipmentSchema.virtual('id').get(function() {
	return this._id.toHexString();
});

shipmentSchema.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('Shipment', shipmentSchema);