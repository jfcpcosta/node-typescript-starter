import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import TokenMiddleware from "./core/auth/token.middleware";
import Logger from "./core/logger";
import router from "./routes";
import { join } from "path";

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();

        this.setupViewEngine();
        this.setupLoggger();
        this.setupMiddlewares();

        this.routes();
    }

    private setupViewEngine() {
        this.express.set("views", join(__dirname, "views"));
        this.express.set("view engine", "ejs");
    }

    private setupMiddlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
    }

    private setupLoggger(): void {
        this.express.use(Logger.logRequestsMiddleware);
    }

    private routes(): void {
        this.express.use(TokenMiddleware.tokenVerify);
        this.express.use(router);
    }
}

export default new App().express;
