import { Request, Response } from "express";

class DefaultController {

    public async index(req: Request, res: Response): Promise<Response | void> {
        return res.render("index");
    }
}

export default new DefaultController();
