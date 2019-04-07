import { Request, Response } from "express";
import ErrorResponse from "../core/http/errors/error.response";
import UsersRepository from "../repositories/users.repository";

class UsersController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        const users = await UsersRepository.findAll();
        return res.json(users);
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number.parseInt(req.params.id, 10);
            const user = await UsersRepository.findOne(id);

            return res.json(user);
        } catch (e) {
            return res.status(404).json(ErrorResponse.genericError(404, e.message));
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const userId = res.locals.decodedToken.user_id

            const user = await UsersRepository.create(body);

            return res.status(201).json(user);
        } catch (e) {
            return res.status(400).json(ErrorResponse.genericError(400, e.message));
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const id = Number.parseInt(req.params.id, 10);
            const user = await UsersRepository.update(id, body);

            return res.status(200).json(user);
        } catch (e) {
            return res.status(404).json(ErrorResponse.genericError(400, e.message));
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number.parseInt(req.params.id, 10);
            const user = await UsersRepository.delete(id);

            return res.status(200).json(user);
        } catch (e) {
            return res.status(404).json(ErrorResponse.genericError(400, e.message));
        }
    }
}

export default new UsersController();
