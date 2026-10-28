import style from "./styles/LogoComponent.module.css"

export function LogoComponent({onlyIcon}: {onlyIcon: boolean}) {
    return <span className={style.logo}>
        {!onlyIcon ? <h1>Viraliza</h1> : ""}
        <div className={style.logoIcon}>
            <span className={style.logoIconSpan}></span>
            <span className={style.logoIconSpan}></span>
            <span className={style.logoIconSpan}></span>
        </div>
    </span>
}
