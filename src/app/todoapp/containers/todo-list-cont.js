import {connect} from 'react-redux';
import {markCompleted, VisibilityFilters} from '../actions';
import TodoList from '../components/todo-list';

const getVisibleTodos = (list, filter = VisibilityFilters.SHOW_ALL) => {
	switch(filter) {
		case VisibilityFilters.SHOW_COMPLETED: {
			return list.filter(t => t.completed);
		}
		case VisibilityFilters.SHOW_ACTIVE: {
			return list.filter(t => !t.completed);
		}
		case VisibilityFilters.SHOW_ALL: {
			return list;
		}
		default: {
			return list;
		}
	}
};

const mapStateToProps = (state, ownProps) => ({
	list: getVisibleTodos(state.list, ownProps.filter)
});

const mapDispatchToProps = dispatch => ({
	markCompleted: (id, completed) => dispatch(markCompleted(id, completed))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);