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
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const url = `${import.meta.env.VITE_SERVER_URL}/users/${props.userTypeSelector}`;
        axios.get(url, {
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
                setUsers(content.data);
                toast.success(content.message);
            }
        }).catch((error) => {
            setUsers([]);
            console.error(error);
        });

    }, [props.userTypeSelector]);

    const getCards = (): ReactNode => {
        return users.map((user, index) => { return <UserCard key={index} user={user} /> });
    }

    return (
        <section>
            {getCards()}
        </section>)
}