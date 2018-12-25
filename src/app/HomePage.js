import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getAllUser} from './actions/index';

class HomePage extends React.Component {
	componentDidMount() {
		let {getAllUser} = this.props;
		getAllUser();
	}

	render() {
		const {user, users} = this.props;
		return (
			<div className="col-md-12">
				<h1>Hi {user.firstName}!</h1>
				<p>You're logged in with React & JWT!!</p>
				<h3>Users from secure api end point:</h3>
				{users.loading && <em>Loading users...</em>}
				{users.error && <span className="text-danger">ERROR: {users.error}</span>}
				{users.items &&
				<ul>
					{users.items.map((user) => (
						<li key={user.id}>
							{`${user.firstName} ${user.lastName}`}
						</li>
					))}
				</ul>
				}
				<p>
					<Link to="/login">Logout</Link>
				</p>
			</div>
		);
	}
}

const mapStateToProps = ({users, authentication: {user}}) => ({user, users});

const mapDispatchToProps = dispatch => ({
	getAllUser: () => dispatch(getAllUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
