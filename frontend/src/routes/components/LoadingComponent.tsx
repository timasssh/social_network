import style from "./styles/LoadingComponent.module.css"

export function LoadingComponent({text}: {text: string}) {
    return <span className={style.loading}>
        <h4>{text}</h4>
        <span />
        <span />
        <span />
    </span>
}