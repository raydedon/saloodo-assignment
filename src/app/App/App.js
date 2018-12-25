import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {clearAlert} from '../actions/index';
import {PrivateRoute} from '../components/PrivateRoute';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const {alert} = this.props;
		return (
			<div className="jumbotron">
				<div className="container">
					{alert.message &&
					<div className={`alert ${alert.type}`}>{alert.message}</div>
					}
					<HashRouter>
						<div>
							<PrivateRoute exact path="/" component={HomePage} />
							<Route path="/login" component={LoginPage} />
						</div>
					</HashRouter>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({alert = {}}) => ({alert});

const mapDispatchToProps = dispatch => ({
	clearAlert: () => dispatch(clearAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
