import type User from "../types/User"

import style from "./styles/UserProfileComponent.module.css"

import { FaGem } from "react-icons/fa"

type userProfileProps = {
    user: User,
    owner: boolean
}

export function UserProfileComponent(props: userProfileProps) {
    return <article className={style.profileWrapper} >
        <img className={style.userBanner} src="/background_texture_banner_image.jpg" alt="user banner image" />
        <section className={style.userWrapper} >
            <img className={style.userPhoto} src="/user_photo_icon.svg" alt="user photo image" />
            <section className={style.userInfoWrapper} >
                <h2 className={style.userNameInfo}>{props.user.name}</h2>
                <p>@{props.user.username}</p>
                {props.user.premium && <FaGem />}
            </section>
            <section className={style.actions} >
                {props.owner
                    ? <button style={{padding: "0.5rem 3rem"}} className="defaultButton">editar perfil</button>
                    : <button style={{padding: "0.5rem 3rem"}} className="defaultButton">seguir</button>
                }
                <p>{props.user.followers} followers</p>
            </section>
        </section>
    </article>
}
