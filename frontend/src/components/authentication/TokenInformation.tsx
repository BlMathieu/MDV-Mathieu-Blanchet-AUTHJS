import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../stores/Store";
import { logout } from "../../stores/authentication/AuthenticationSlicer";
export default function PersonalInformation() {
    const authInstance = useSelector((state: any) => state.authentication);
    const [loginDelay, setLoginDelay] = useState(Number(authInstance.user.exp - (Date.now() / 1000)));
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (authInstance.isLogged) {
            const interval = setInterval(() => {
                const delay = Number(authInstance.user.exp - (Date.now()) / 1000);
                setLoginDelay(delay);
                const logState = delay > 0;
                if (logState === false) dispatch(logout());
            }, 100);
            return () => clearInterval(interval);
        }
    }, [authInstance.user.exp, dispatch, authInstance.isLogged]);

    if (authInstance.isLogged) {
        return (
            <article className="flex justify-center [&>p]:m-2 [&>p>span]:text-green-500">
                <p>Email : <span>{authInstance.user.email}</span></p>
                <p>|</p>
                <p>Nom : <span>{authInstance.user.username}</span></p>
                <p>|</p>
                <p>Role : <span>{authInstance.user.role}</span></p>
                <p>|</p>
                <p>IsLogged : <span>{authInstance.isLogged.toString()}</span></p>
                <p>|</p>
                <p>Token Délais : <span>{loginDelay.toString()}</span></p>
            </article>
        )
    }

}