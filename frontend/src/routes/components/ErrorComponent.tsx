import style from "./styles/ErrorComponent.module.css"

type ErrorComponentProps = {
    error: Error,
    errorTitle: string
}

export function ErrorComponent(errorComponentProps: ErrorComponentProps) {
    return <article className={style.errorArticle}>
        <h4>{errorComponentProps.errorTitle}</h4>
        <p className={style.errorName}>{errorComponentProps.error.name}</p>
        <p>{errorComponentProps.error.message}</p>
        {errorComponentProps.error.cause ? <p>Causa: {errorComponentProps.error.cause.toString()}</p> : ""}
    </article>
}