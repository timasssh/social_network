import style from "./styles/UserComponent.module.css"

type userComponentProps = {
    name: string,
    followers: number,
    username: string,
    photo?: string | undefined
}

export function UserComponent(userComponentProps: userComponentProps) {
    return <article className={style.userWrapper} >
        <img className={style.userPhoto} src={userComponentProps.photo ? userComponentProps.photo : "/user_photo_icon.svg"} alt="user photo" />
        <section>
            <p>{userComponentProps.name}</p>
            <p>@{userComponentProps.username}</p>
        </section>
        <p>{userComponentProps.followers} followers</p>
    </article>
}