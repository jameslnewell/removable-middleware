'use const';

module.exports = initialMiddleware => {

	if (typeof initialMiddleware !== 'function') {
		throw new Error('`replacableMiddleware(initialMiddleware)`: `initialMiddleware` must be a middleware function.');
	}

	let currentMiddleware = initialMiddleware;

	const middleware = (...args) => {
		if (currentMiddleware) {

			//call the wrapped middleware
			currentMiddleware(...args);

		} else {

			//call the next middleware
			args[args.length - 1]();

		}
	};

	middleware.replace = nextMiddleware => {

		if (typeof nextMiddleware !== 'function') {
			throw new Error('`replacableMiddleware.replace(nextMiddleware)`: `nextMiddleware` must be a middleware function.');
		}

		currentMiddleware = nextMiddleware;
	};

	middleware.remove = () => {
		currentMiddleware = null;
	};

	return middleware;
};
