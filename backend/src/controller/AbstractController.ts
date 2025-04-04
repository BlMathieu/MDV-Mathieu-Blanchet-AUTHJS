import { Response, Router } from "express";
import AbstractService from "../services/AbstractService";
import BaseResponse, { errorResponse } from "../utils/responses/BaseResponse";

export default abstract class AbstractController {
    protected router: Router;
    protected service?: AbstractService;
    constructor(service?: AbstractService) {
        this.router = Router();
        this.service = service;
    }
    protected errorHandler(callback: () => BaseResponse, res: Response): void {
        try {
            res.send(callback());
        } catch (error) {
            if (error instanceof Error) res.send(errorResponse(error.message));
            else res.send(errorResponse(`Erreur du serveur !`));
        }
    }
    public getRoutes(): Router { throw new Error('Not implemented function !') };
}