import React from 'react';

const GenericList = ({list, ItemComp}) => {
	return (
		<ul>
			{list.map((i) => (
				<li key={i.id}>
					<ItemComp {...i} />
				</li>
			))}
		</ul>
	);
};

export default GenericList;