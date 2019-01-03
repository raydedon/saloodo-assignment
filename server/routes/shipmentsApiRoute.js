const express = require('express');
const Shipment = require('../controller/shipment.controller');
var passport = require('passport');
require('../config/passport')(passport);

const shipmentsApiRouter = express.Router();

shipmentsApiRouter.post('/', Shipment.create);

shipmentsApiRouter.get('/', passport.authenticate('jwt', {session: false}), Shipment.read);

shipmentsApiRouter.put('/:shipmentId', Shipment.update);

shipmentsApiRouter.delete('/:userName', Shipment.delete);



module.exports = shipmentsApiRouter;