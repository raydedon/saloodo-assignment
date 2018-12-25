if(process.env.NODE_ENV === 'production') {
	console.info('configureStore.prod');
	module.exports = require('./configureStore.prod');
} else {
	console.info('configureStore.dev');
	module.exports = require('./configureStore.dev');
}