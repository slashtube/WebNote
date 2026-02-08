'use strict'

/*
 * Utils source file.
 * every constant or function here is exported.
 * */

import { createLogger, transports, format } from 'winston';

// Inits Logger
// TODO: add logging to file
export const logger = createLogger({
	format: format.combine(
		format.json(),
		format.splat(),
		format.simple(), // remove after debugging
		format.errors({ stack: true }),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
	),
	transports: [
		new transports.Console()
	]
})

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
