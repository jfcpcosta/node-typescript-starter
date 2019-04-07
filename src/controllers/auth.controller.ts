import { Request, Response } from "express";
import ErrorResponse from "../core/http/errors/error.response";
import AuthRepository from "../repositories/auth.repository";

class AuthController {

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const token = await AuthRepository.doLogin(body.username, body.password);
            return res.json({ token });
        } catch (e) {
            return res.status(401).json(ErrorResponse.genericError(401, e.message));
        }
    }
}

export default new AuthController();
