const express = require('express');
const Shipment = require('../controller/shipment.controller');
var passport = require('passport');
require('../config/passport')(passport);

const shipmentsApiRouter = express.Router();

shipmentsApiRouter.post('/', Shipment.create);

shipmentsApiRouter.get('/', passport.authenticate('jwt', {session: false}), Shipment.read);
shipmentsApiRouter.get('/:shipmentId', passport.authenticate('jwt', {session: false}), Shipment.readById);
shipmentsApiRouter.get('/user/:userId', passport.authenticate('jwt', {session: false}), Shipment.readByUserId);

shipmentsApiRouter.put('/:shipmentId', Shipment.update);
shipmentsApiRouter.put('/:shipmentId/user/:userId', Shipment.updateBiker);



module.exports = shipmentsApiRouter;