import { Request, Response, Router } from "express";
import AbstractController from './AbstractController';
import { userSuccess } from "../utils/responses/UserResponse";
import UserType from "../utils/types/UserType";
import UserModel from "../model/UserModel";

export default class UserController extends AbstractController {
    constructor() { super(); }
    public getRoutes(): Router {
        this.router.get('/:email', (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const { email } = req.params;
                const user = await UserModel.findOne({ where: { email: email } });
                if (!user) throw new Error('Aucun utilisateur trouvé !');
                return userSuccess(`Utilisateur ${user.get('username')} trouvé !`, user as unknown as UserType);
            }, res);
        });
        this.router.get('/etudiants', (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const users = await UserModel.findAll({ where: { role: 'étudiant' } });
                return userSuccess(`Les étudiants ont été trouvé !`, users as unknown as UserType[]);
            }, res)
        });
        this.router.get('/intervenants', (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const users = await UserModel.findAll({ where: { role: 'intervenant' } });
                return userSuccess(`Les intervenants on été trouvé`, users as unknown as UserType[]);
            }, res)
        });

        this.router.post('/', (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const user: UserType = req.body;
                const response = await UserModel.create(user);
                console.log(response);
                return userSuccess(`Utilisateur ${user.username} créé !`);
            }, res);
        });
        return this.router;
    }
}