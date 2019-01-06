import {GET_REQUEST, PUT_REQUEST, ROOT_URL} from '../constants';
import {authHeader} from '../helpers';

export const shipmentService = {
	markDelivered,
	fetchShipments,
	updateBiker
};

function markDelivered(id) {
	const requestOptions = {
		method: PUT_REQUEST,
		headers: authHeader()
	};

	return fetch(`${ROOT_URL}/api/shipments/${id}`, requestOptions)
		.then(res => res.json())
		.then(({shipment = {}}) => {
			return shipment;
		});
}

function fetchShipments() {
	const requestOptions = {
		method: GET_REQUEST,
		headers: authHeader()
	};

	return fetch(`${ROOT_URL}/api/shipments`, requestOptions)
		.then(res => res.json())
		.then(shipments => {
			return shipments;
		});
}

function updateBiker(shipmentId, bikerId) {
	const requestOptions = {
		method: PUT_REQUEST,
		headers: authHeader()
	};

	return fetch(`${ROOT_URL}/api/shipments/${shipmentId}/user/${bikerId}`, requestOptions)
		.then(res => res.json())
		.then(shipment => {
			return shipment;
		});
}
