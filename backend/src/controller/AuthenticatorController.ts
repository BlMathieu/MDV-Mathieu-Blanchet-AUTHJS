import { Router } from "express";
import AbstractController from "./AbstractController";

export default class AuthenticatorController extends AbstractController {
    constructor() {
        super();
    }

    public getRoutes(): Router {
        this.router.post('login', () => {

        });
        this.router.post('register', () => {

        });
        this.router.post('refresh', () => {

        });
        return this.router
    }
}