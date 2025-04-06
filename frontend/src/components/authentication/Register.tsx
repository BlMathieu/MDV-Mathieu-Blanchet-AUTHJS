import { useState } from "react"
import BaseForm from "./BaseForm"
import { Role } from "../../types/UserType";
import axios from "axios";
import { BaseResponse } from "../../types/AuthenticationResponse";
import toast from "react-hot-toast";

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('étudiant');

    const handleForm = async () => {
        const url = `${import.meta.env.VITE_SERVER_URL}/authentication/register`;
        const user = {
            email: email,
            username: username,
            password: password,
            role: role,
        }
        const response = await axios.post<BaseResponse>(url, user, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.data.status) toast.success(response.data.message);
        else toast.error(response.data.message);
    }

    return (
        <BaseForm handleForm={handleForm} fieldName="S'enregister">
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" onChange={(event) => { setEmail(event.target.value) }} />
            </div>
            <div>
                <label htmlFor="username">Nom d'utilisateur</label>
                <input id="username" type="text" onChange={(event) => { setUsername(event.target.value) }} />
            </div>
            <div>
                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" onChange={(event) => { setPassword(event.target.value) }} />
            </div>
            <div>
                <label htmlFor="role">Role</label>
                <select onChange={(event) => { setRole(event.target.value as Role) }}>
                    <option value="étudiant">Etudiant</option>
                    <option value="intervenant">Intervenant</option>
                    <option value="admin" >Administrateur</option>
                </select>
            </div>
            <div>
                <input type="submit" value="S'enregistrer" />
            </div>
        </BaseForm>
    )
}