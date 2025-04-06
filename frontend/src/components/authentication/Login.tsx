import { useState } from "react";
import { UserCredentials } from "../../types/UserType"
import BaseForm from "./BaseForm"
import { useDispatch } from "react-redux";
import { loginThunk } from "../../stores/authentication/AuthenticationThunk";
import { Dispatch } from "@reduxjs/toolkit";

export default function Login() {
    const dispatch: Dispatch<any> = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleForm = () => {
        const credentials: UserCredentials = {
            email: email,
            password: password,
        }
        dispatch(loginThunk(credentials));
    }

    return (
        <BaseForm handleForm={handleForm} fieldName="Se connecter">
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" onChange={(event) => { setEmail(event.target.value) }} />
            </div>
            <div>
                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" onChange={(event) => { setPassword(event.target.value) }} />
            </div>
            <div>
                <input type="submit" value="Connexion" />
            </div>
        </BaseForm>
    )
}