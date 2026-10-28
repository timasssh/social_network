import style from "./styles/ErrorComponent.module.css"

export function ErrorComponent(error: Error) {
    return <article className={style.errorArticle}>
        <h4>Algo deu errado enquanto buscava os posts :(</h4>
        <p className={style.errorName}>{error.name}</p>
        <p>{error.message}</p>
        {error.cause ? <p>Causa: {error.cause.toString()}</p> : ""}
    </article>
}