import { ErrorRequestHandler, RequestHandler } from "express";
import helmet from "helmet";
import path from "path";

export const configuredHelmet = (): RequestHandler => helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			objectSrc: ["'none'"],
			scriptSrc: ["'self'", "unpkg.com", "polyfill.io"],
			styleSrc: ["'self'", "https: 'unsafe-inline'"],
			upgradeInsecureRequests: [],
		},
	},
});

export const httpsOnly = (): RequestHandler => (req, res, next): void => {
	if (!req.secure) {
		return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
	}
	next();
};

export const logErrors = (): ErrorRequestHandler => (err, _, res, next): void => {
	if (res.headersSent) {
		return next(err);
	}
	console.error(err);
	res.sendStatus(500);
};

export const pushStateRouting = (apiRoot: string, staticDir: string): RequestHandler => (req, res, next): void => {
	if (req.method === "GET" && !req.url.startsWith(apiRoot)) {
		return res.sendFile(path.join(staticDir, "index.html"));
	}
	next();
};
