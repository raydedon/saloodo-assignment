import React from 'react';
import {NavLink} from 'react-router-dom';

const FilterLink = ({filter, children}) => (
	<NavLink
		activeClassName="active"
		to={`/${filter}`}
		activeStyle={{
			textDecoration: 'none',
			color: 'black'
		}}
		isActive={() => children.toUpperCase() === filter}>
		{children}
	</NavLink>
);

export default FilterLink;