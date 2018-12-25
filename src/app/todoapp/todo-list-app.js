import React from 'react';
import AddTodoCont from './containers/add-todo-cont';
import TodoListCont from './containers/todo-list-cont';
import Footer from './components/footer';
import {Route} from 'react-router-dom';
import {VisibilityFilters} from './actions/index';

const TodoListApp = () => {
	return [
		<AddTodoCont key="AddTodoCont" />,
		<Route path="/:filter" render={(props) => {
			return (
				<TodoListCont key="TodoListCont" filter={props.match.params.filter || VisibilityFilters.SHOW_ALL} />
			);
		}}
		key="maincontent" />,

		<Footer key="footer" />
	];
};

export default TodoListApp;

