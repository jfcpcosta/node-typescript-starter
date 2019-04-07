import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default class TokenMiddleware {

    public static async tokenVerify(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const allowedPaths = [
            "/",
            "/auth/login"
        ];

        if (allowedPaths.includes(req.path)) {
            next();
            return;
        }

        if (!req.headers.authorization) {
            return res.status(403).json({
                code: 403,
                message: "No credentials sent!"
            });
        }

        try {
            const token = req.headers.authorization.split("Bearer ")[1];
            res.locals.decodedToken = verify(token, process.env.JWT_SECRET);
            return next();
        } catch (err) {
            return res.status(403).json({
                code: 403,
                message: "Invalid token"
            });
        }
    }
}
