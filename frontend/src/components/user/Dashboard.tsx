import { ReactNode, useEffect, useState } from "react";
import UserType from "../../types/UserType";
import UserCard from "./UserCard";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

interface DashboardProps {
    userTypeSelector: string;
}

export default function Dashboard(props: DashboardProps) {
    const token = useSelector((state: any) => state.authentication.token);
    const email = useSelector((state: any) => state.authentication.user.email);
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_SERVER_URL
        const route = (props.userTypeSelector != 'detail') ? props.userTypeSelector : `user/${email}`;
        const url = `${baseUrl}/users/${route}`;
        const controller = new AbortController();

        axios.get(url, {
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then((value) => {
            const content = value.data;
            if (!content.status) {
                setUsers([]);
                toast.error(content.message);
            }
            else {
                if (props.userTypeSelector == 'detail') setUsers([content.data])
                else setUsers(content.data);
                toast.success(content.message);
            }
        }).catch((error) => {
            setUsers([]);
            console.error(error);
        });

        return () => controller.abort();
    }, [props.userTypeSelector]);

    const getCards = (): ReactNode => { return users.map((user, index) => { return <UserCard key={index} user={user} /> }); }

    return (
        <section>
            {getCards()}
        </section>)
}