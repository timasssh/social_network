import { useState } from "react"
import type User from "../types/User"

import style from "./styles/UserProfileComponent.module.css"

import { FaGem } from "react-icons/fa"

type userProfileProps = {
    user: User,
    owner: boolean
}

export function UserProfileComponent(props: userProfileProps) {
    const [editingProfile, setEditingProfile] = useState(false);

    // TODO: fetch api to update profile

    if(editingProfile) return (
    <article className={style.profileWrapper} >
        <img className={style.userBanner} src="/background_texture_banner_image.jpg" alt="user banner image" />
        <section className={style.userWrapper} >
            <img className={style.userPhoto} src="/user_photo_icon.svg" alt="user photo image" />
            <section className={style.userEditWrapper} >
                <small>editando perfil...</small>
                <input type="text" defaultValue={props.user.name} />
                <div className={style.editUsername} >
                    <span>@</span>
                    <input className={style.editUsernameInput} type="text" defaultValue={props.user.username}/>
                </div>
            </section>
            <section className={style.actions} >
                <button style={{padding: "0.5rem 3rem"}} className="defaultButton">Salvar</button>
                <p>{props.user.followers} followers</p>
            </section>
        </section>
    </article>
    )

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
                    ? <button onClick={() => setEditingProfile(true)} style={{padding: "0.5rem 3rem"}} className="defaultButton">editar perfil</button>
                    : <button style={{padding: "0.5rem 3rem"}} className="defaultButton">seguir</button>
                }
                <p>{props.user.followers} followers</p>
            </section>
        </section>
    </article>
}
