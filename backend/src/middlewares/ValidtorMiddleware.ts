import { NextFunction, Request, Response } from "express";
import zod, { ZodSchema } from 'zod';
import { errorResponse } from "../utils/responses/BaseResponse";

const handleValidator = (req: Request, res: Response, next: NextFunction, schema: ZodSchema) => {
    const result = schema.safeParse(req.body);
    if (result.success) next();
    else {
        console.error(result.error);
        res.send(errorResponse(result.error.message));
    }
}

export function registerValidator(req: Request, res: Response, next: NextFunction) {
    const schema = zod.object({
        email: zod.string().email(),
        username: zod.string().min(3),
        password: zod.string().min(6),
        role: zod.enum(['étudiant', 'intervenant', 'admin']),
    });
    handleValidator(req, res, next, schema);
}

export function loginValidator(req: Request, res: Response, next: NextFunction) {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(6),
    })
    handleValidator(req, res, next, schema);
}