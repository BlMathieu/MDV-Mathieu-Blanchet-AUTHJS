import { Request, Response, Router } from "express";
import AbstractController from './AbstractController';
import { authSuccess } from "../utils/responses/AuthenticationResponse";

export default class UserController extends AbstractController {
    constructor() { super(); }

    public getRoutes(): Router {
        this.router.get('/:email', (req: Request, res: Response) => {
            this.errorHandler(() => {
                const { email } = req.body;
                return authSuccess(`Utilisateur trouvé !`);
            }, res)
        });
        
        this.router.get('/etudiants', (req: Request, res: Response) => {
            res.send({})
        });
        this.router.get('/intervenants', (req: Request, res: Response) => {

        });

        this.router.post('/', (req: Request, res: Response) => {

        });
        this.router.patch('/', (req: Request, res: Response) => {

        });
        return this.router;
    }
}