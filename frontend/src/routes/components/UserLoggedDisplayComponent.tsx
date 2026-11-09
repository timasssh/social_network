import style from "./styles/UserLoggedDisplayCompponent.module.css"

import { Link } from "react-router-dom";
import { ErrorComponent } from "./ErrorComponent";
import { useAuth } from "./AuthProviderComponent";

export function UserLoggedDisplay() {
    const { token } = useAuth();
    
    if(!token) {
        return <ErrorComponent error={new Error("Usuário não encontrado!")} errorTitle="Algo deu errado enquanto buscava usuário :(" />
    }

    const username = sessionStorage.getItem("username");
    const name = sessionStorage.getItem("username");
    const photo = sessionStorage.getItem("photo");

    return <Link to={"/me"} className={style.userWrapper} >
        <img className={style.userPhoto} src={photo ? photo : "/user_photo_icon.svg"} alt="user photo" />
        <section>
            <p>{name}</p>
            <p>@{username}</p>
        </section>
    </Link>  
}
