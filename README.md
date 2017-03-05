# removable-middleware

A middleware wrapper allowing you to remove and replace the wrapped middleware while the server is running.

> WARNING: It is not recommended to remove or replace middleware in a production
app [#2418](https://github.com/expressjs/express/issues/2418). However, removing middleware during development can be useful e.g. for
code-splitting.

## Installation

    npm install --save removable-middleware

## Usage

> Example: Hot-reloading a server app bundled with Webpack:

```js
import express from 'express';
import removableMiddleware from 'removable-middleware';
import myAppMiddleware from './myAppMiddleware';

const app = express();
const middleware = removableMiddleware(myAppMiddleware);

app
	.use(middleware)
	.listen(3000)
;

if(module.hot) {
	module.hot.accept('./myAppMiddleware', () => {
		import('./myAppMiddleware').then(module => middleware.replace(module.default));
	});
}

```

## API

### `removableMiddleware(initialMiddleware)`

Creates a new middleware that wraps the another middleware.

### `.replace(nextMiddleware)`

Replaces the wrapped middleware with another middleware.

### `.remove()`

Removes the wrapped middleware.
