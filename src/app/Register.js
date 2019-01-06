import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from './actions';
import {ROLE_BIKER} from './constants';

class Create extends Component {

	constructor() {
		super();
		this.state = {
			userName: '',
			password: '',
			gender: 0,
			country: '',
			state: '',
			pinCode: ''
		};


		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		const {name, value} = e.target;
		this.setState({[name]: value});
	}

	onSubmit(e) {
		e.preventDefault();

		let {history, registerUser} = this.props;

		registerUser(this.state, history);
	}

	render() {
		const {
			name = '',
			phoneNumber = '',
			email = '',
			userName = '',
			password = '',
			role = ROLE_BIKER
		} = this.state;
		return (
			<div className="container">
				<form className="form-signin" onSubmit={this.onSubmit}>
					<h2 className="form-signin-heading">Register</h2>
					<label htmlFor="inputName" className="sr-only">Full Name</label>
					<input type="text" id="inputName" className="form-control" placeholder="Full Name" name="name" value={name} onChange={this.onChange} />

					<label htmlFor="inputPhoneNumber" className="sr-only">Email address</label>
					<input type="text" id="inputPhoneNumber" className="form-control" placeholder="Phone Number" name="phoneNumber" value={phoneNumber} onChange={this.onChange} />

					<label htmlFor="inputEmail" className="sr-only">Email address</label>
					<input type="email" id="inputEmail" className="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} />

					<label htmlFor="inputUserName" className="sr-only">User Name</label>
					<input type="text" id="inputUserName" className="form-control" placeholder="User Name" name="userName" value={userName} onChange={this.onChange} />

					<label htmlFor="inputPassword" className="sr-only">Password</label>
					<input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required />

					<label htmlFor="inputRole" className="sr-only">Role</label>
					<input type="text" id="inputRole" className="form-control" placeholder="Role" name="role" value={role} onChange={this.onChange} required />


					<button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
					<p>
						<Link to="/login">Home</Link>
					</p>
				</form>
			</div>
		);
	}
}

const mapStateToProps = ({loggingIn}, {history}) => ({loggingIn, history});

const mapDispatchToProps = dispatch => ({
	registerUser: (user, history) => dispatch(registerUser(user, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
