import style from "./styles/PostComponent.module.css"

type postProps = {
    "title": string,
    "message": string
}

export function PostComponent(postProps: postProps) {
    return <article className={style.post}>
        <p className={style.postTitle}>{postProps.title}</p>
        <p>{postProps.message}</p>
    </article>
}