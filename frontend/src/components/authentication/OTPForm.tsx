import { useEffect, useState } from "react";
import BaseForm from "./BaseForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { otpThunk } from "../../stores/authentication/AuthenticationThunk";

export default function OTPForm() {
    const [qr, setQr] = useState('');
    const [secret, setSecret] = useState('');
    const token = useSelector((state: any) => state.authentication.token);
    const dispatch: any = useDispatch();

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_SERVER_URL;
        const url = `${baseUrl}/authentication/otp`;
        const controller = new AbortController();
        axios.get(url, {
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((value) => { setQr(value.data.qrCode); });
        return () => controller.abort();
    }, [])

    const handleForm = () => { dispatch(otpThunk(secret)); }
    
    return (
        <BaseForm fieldName="OTPAuthentification" handleForm={handleForm}>
            <div>
                <img src={qr} alt="QRCODE"></img>
            </div>
            <div>
                <label htmlFor="secret">Secret</label>
                <input id='secret' type="text" onChange={(event) => { setSecret(event.target.value) }} />
            </div>
            <div>
                <input type="submit" value="envoyer" />
            </div>
        </BaseForm>
    )
}
