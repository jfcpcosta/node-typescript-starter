import { NextFunction, Request, Response } from "express";
import { ConsoleColor, Console } from "../console";

export default class Logger {

    public static async logRequestsMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
        const start = new Date();

        req.on("end", () => {
            const now = new Date()
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, "");

            let method = req.method;
            switch (method) {
                case "GET": method = Console.colorizedText(method, ConsoleColor.FgGreen); break;
                case "POST": method = Console.colorizedText(method, ConsoleColor.FgYellow); break;
                case "PUT": method = Console.colorizedText(method, ConsoleColor.FgBlue); break;
                case "DELETE": method = Console.colorizedText(method, ConsoleColor.FgRed); break;
            }

            let status: string = "" + req.res.statusCode;
            if (req.res.statusCode >= 200 && req.res.statusCode < 300) {
                status = Console.colorizedText(status, ConsoleColor.FgGreen);
            } else if (req.res.statusCode >= 400 && req.res.statusCode < 500) {
                status = Console.colorizedText(status, ConsoleColor.FgYellow);
            } else if (req.res.statusCode >= 500 && req.res.statusCode < 600) {
                status = Console.colorizedText(status, ConsoleColor.FgRed);
            }

            const loadTime = (new Date()).getTime() - start.getTime();
            let log = `${Console.colorizedText(`[${now}]`, ConsoleColor.FgMagenta)}\t${Console.colorizedText(method, ConsoleColor.Bright)}\t${req.path}\t${status}\t${Console.colorizedText(loadTime + 'ms', ConsoleColor.Dim)}`;

            if (["POST", "PUT"].includes(req.method)) {
                log += `\t\t${Console.colorizedText(JSON.stringify(req.body), ConsoleColor.FgCyan)}`;
            }

            Console.write(log);
        });

        return next();
    }
}
