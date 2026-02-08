'use strict'

import { logger } from './index.js';

// Middleware functions called when validating a schema
export function json_validate(options) {
	const { schema } = options

	return function(req, res, next) {
		const { error } = schema.validate(req.body);

		if (error) {
			logger.log('error', error);
			res.sendStatus(400);
			return;
		}

		next();

	}
}
