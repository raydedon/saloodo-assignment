import {
	FETCH_SHIPMENTS_REQUEST,
	FETCH_SHIPMENTS_SUCCESS,
	SHIPMENT_STATUS_MARK_DELIVERED_SUCCESS, UPDATE_SHIPMENT_STATUS_SUCCESS,
	UPDATE_SHIPMENTS_BIKER_SUCCESS
} from '../constants';

export function shipments(state = [], action) {
	let {type, payload} = action;
	switch(type) {
		case FETCH_SHIPMENTS_REQUEST:
		case FETCH_SHIPMENTS_SUCCESS: {
			let {shipments = []} = payload;
			return shipments;
		}
		case SHIPMENT_STATUS_MARK_DELIVERED_SUCCESS:
		case UPDATE_SHIPMENT_STATUS_SUCCESS:
		case UPDATE_SHIPMENTS_BIKER_SUCCESS: {
			let {shipment} = payload;
			return state.map(s => s.id === shipment.id ? shipment : s);
		}
		default:
			return state;
	}
}