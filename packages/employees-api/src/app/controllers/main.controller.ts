import { Request, Response } from "express";

export const mainController = (_req: Request, res: Response) => {
    res.send(`Index`);
}