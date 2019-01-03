export const authHeader = () => {
	// return authorization header with jwt token
	let token = localStorage.getItem('jwtToken') || '';

	if(token.length) {
		return {'Authorization': `Bearer ${token}`};
	} else {
		return {};
	}
};