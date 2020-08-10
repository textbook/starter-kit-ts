import { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import path from "path";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export const configuredHelmet = (): Middleware => helmet({
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

export const httpsOnly = (): Middleware => (req, res, next): void => {
	if (!req.secure) {
		return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
	}
	next();
};

export const pushStateRouting = (apiRoot: string, staticDir: string): Middleware => (req, res, next): void => {
	if (req.method === "GET" && !req.url.startsWith(apiRoot)) {
		return res.sendFile(path.join(staticDir, "index.html"));
	}
	next();
};
