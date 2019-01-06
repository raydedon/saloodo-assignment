import React from 'react';
import {connect} from 'react-redux';
import {updateBiker} from '../../actions/shipment.actions';

const SelectBox = ({users = [], updateBiker, shipmentId = '', biker = {} }) => {
	let onChangeHandler = (event) => {
		console.info(`shipmentId: ${shipmentId}, ${event.target.value}`);
		event.preventDefault();
		updateBiker(shipmentId, event.target.value);
	};
	
	let {id: bikerId} = biker;
	
	return (
		<select className="input-sm" onChange={onChangeHandler} value={bikerId}>
			<option key={'selectoption'} value={''}>{'Select Option'}</option>
			{users.map((i) => (
				<option key={i.id} value={i.id}>{i.name}</option>
			))}
		</select>
	);
};

const mapStateToProps = ({users = []}, ownProps) => ({users, ...ownProps});

const mapDispatchToProps = dispatch => ({
	updateBiker: (shipmentId, bikerId) => dispatch(updateBiker(shipmentId, bikerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectBox);
