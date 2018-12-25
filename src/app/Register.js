import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from './actions';

class Create extends Component {

	constructor() {
		super();
		this.state = {
			userName: '',
			password: '',

		};
	}
	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	onSubmit = (e) => {
		e.preventDefault();

		let {userName, password} = this.state;
		let {history} = this.props;

		registerUser({userName, password}, history);
	}

	render() {
		const {userName, password} = this.state;
		return (
			<div className="container">
				<form className="form-signin" onSubmit={this.onSubmit}>
					<h2 className="form-signin-heading">Register</h2>
					<label htmlFor="inputEmail" className="sr-only">Email address</label>
					<input type="email" className="form-control" placeholder="Email address" name="userName" value={userName} onChange={this.onChange} required />
					<label htmlFor="inputPassword" className="sr-only">Password</label>
					<input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required />
					<button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
					<p>
						<Link to="/login">Home</Link>
					</p>
				</form>
			</div>
		);
	}
}

const mapStateToProps = ({loggingIn}) => ({loggingIn});

const mapDispatchToProps = dispatch => ({
	registerUser: (user, history) => dispatch(registerUser(user, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
