import React from 'react';
import GenericList from '../generic-list';

const TodoList = ({list = [], itemComp}) => {
	if(list.length === 0) return null;
	return <GenericList list={list} ItemComp={itemComp} />;
};

export default TodoList;
