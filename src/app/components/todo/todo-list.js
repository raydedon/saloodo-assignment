import React from 'react';
import Todo from './todo';
import {connect} from 'react-redux';
import GenericList from '../generic-list';

const TodoList = ({list}) => {
	return <GenericList list={list} ItemComp={Todo} />;
};

export default TodoList;

/*
const getFilteredTodos = (list, filter = '') => {
	return filter.length > 0 ? list.filter(t => t.status === filter) : list;
};

const mapStateToProps = (state, ownProps) => ({
	list: getFilteredTodos(state.list, ownProps.filter)
});

export default connect(mapStateToProps, {})(TodoList);
*/


