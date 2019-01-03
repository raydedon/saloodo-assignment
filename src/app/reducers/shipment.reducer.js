import {
	FETCH_SHIPMENTS_SUCCESS,
	SHIPMENT_STATUS_MARK_DELIVERED_SUCCESS
} from '../constants';

export function shipments(state = {}, action) {
	let {type, payload} = action;
	switch(type) {
		case FETCH_SHIPMENTS_SUCCESS: {
			let {shipments = []} = payload;
			return shipments;
		}
		case SHIPMENT_STATUS_MARK_DELIVERED_SUCCESS: {
			let {shipments = []} = state;
			let {shipment} = payload;
			return shipments.map(s => s.id === shipment.id ? shipment : s);
		}
		default:
			return state;
	}
}