import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../helpers';
import {clearAlert} from '../actions/index';
import {PrivateRoute} from '../components/PrivateRoute';
import {HomePage} from '../HomePage/HomePage';
import {LoginPage} from '../LoginPage/LoginPage';

class App extends React.Component {
	constructor(props) {
		super(props);

		const {clearAlert} = this.props;
		history.listen((location, action) => {
			// clear alert on location change
			clearAlert();
		});
	}

	render() {
		const {alert} = this.props;
		return (
			<div className="jumbotron">
				<div className="container">
					<div className="col-sm-8 col-sm-offset-2">
						{alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
						}
						<Router history={history}>
							<div>
								<PrivateRoute exact path="/" component={HomePage} />
								<Route path="/login" component={LoginPage} />
							</div>
						</Router>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({alert = {}}) => ({alert});

const mapDispatchToProps = dispatch => ({
	clearAlert: text => dispatch(clearAlert(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
