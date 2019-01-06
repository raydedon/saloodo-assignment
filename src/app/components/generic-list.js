import React from 'react';
import './generic-list.scss';

const GenericList = ({list = [], ItemComp}) => {
	return (
		<div className="generic-list">
			{list.map((i) => (
				<ItemComp {...i} key={i.id} />
			))}
		</div>
	);
};

export default GenericList;