import {
	SHIPMENT_STATUS_MARK_DELIVERED_REQUEST,
	SHIPMENT_STATUS_MARK_DELIVERED_SUCCESS,
	SHIPMENT_STATUS_MARK_DELIVERED_FAILURE,
	FETCH_SHIPMENTS_REQUEST,
	FETCH_SHIPMENTS_SUCCESS,
	FETCH_SHIPMENTS_FAILURE, UPDATE_SHIPMENTS_BIKER_REQUEST, UPDATE_SHIPMENTS_BIKER_SUCCESS,
	UPDATE_SHIPMENTS_BIKER_FAILURE
} from '../constants';
import {shipmentService} from '../services/shipment.service';

export function markDelivered(id) {
	const request = (id) => ({type: SHIPMENT_STATUS_MARK_DELIVERED_REQUEST, payload: {id}});
	const success = (shipment) =>  ({type: SHIPMENT_STATUS_MARK_DELIVERED_SUCCESS, payload: {shipment}});
	const failure = (error) => ({type: SHIPMENT_STATUS_MARK_DELIVERED_FAILURE, payload: {error}});

	return dispatch => {
		dispatch(request(id));

		shipmentService.markDelivered(id)
			.then(
				shipment => dispatch(success(shipment)),
				error => dispatch(failure(error))
			);
	};
}

export function fetchShipments() {
	const request = () => ({type: FETCH_SHIPMENTS_REQUEST});
	const success = (shipments) =>  ({type: FETCH_SHIPMENTS_SUCCESS, payload: {shipments}});
	const failure = (error) => ({type: FETCH_SHIPMENTS_FAILURE, payload: {error}});

	return dispatch => {
		dispatch(request());

		shipmentService.fetchShipments()
			.then(
				shipments => dispatch(success(shipments)),
				error => dispatch(failure(error))
			);
	};
}

export function updateBiker(shipmentId, bikerId) {
	const request = () => ({type: UPDATE_SHIPMENTS_BIKER_REQUEST});
	const success = (shipment) =>  ({type: UPDATE_SHIPMENTS_BIKER_SUCCESS, payload: {shipment}});
	const failure = (error) => ({type: UPDATE_SHIPMENTS_BIKER_FAILURE, payload: {error}});
	
	return dispatch => {
		dispatch(request());
		
		shipmentService.updateBiker(shipmentId, bikerId)
			.then(
				shipment => dispatch(success(shipment)),
				error => dispatch(failure(error))
			);
	};
}
