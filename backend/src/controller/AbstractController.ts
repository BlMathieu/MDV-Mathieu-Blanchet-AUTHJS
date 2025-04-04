import { Response, Router } from "express";
import BaseResponse, { errorResponse } from "../utils/responses/BaseResponse";

export default abstract class AbstractController {
    protected router: Router;
    constructor() {
        this.router = Router();
    }
    protected async errorHandler(callback: () => BaseResponse | Promise<BaseResponse>, res: Response): Promise<void> {
        try {
            res.send(await callback());
        } catch (error) {
            if (error instanceof Error) res.send(errorResponse(error.message));
            else res.send(errorResponse(`Erreur du serveur !`));
        }
    }
    public getRoutes(): Router { throw new Error('Not implemented function !') };
}