import UserType from "../../types/UserType";

interface UserCardProps {
    user: UserType
}
export default function (props: UserCardProps) {
    return (
        <article className="flex [&>p]:m-2  [&>p]:max-w-60 [&>p]:overflow-auto">
            <p>Email : {props.user.email}</p>
            <p>|</p>
            <p>Nom : {props.user.username}</p>
            <p>|</p>
            <p>Role :  {props.user.role}</p>
            <p>|</p>
            <p>Mot de passe : {props.user.password}</p>
            <p>|</p>
            <p>RefreshToken : {props.user.refresh_token}</p>
            <p>|</p>
            <p>MFASecret : {props.user.mfaSecret}</p>
            <p>|</p>
            <p>MFAValidated : {props.user.mfaValidated.toString()}</p>
        </article>
    )
}