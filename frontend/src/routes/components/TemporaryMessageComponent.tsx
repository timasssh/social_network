import { useEffect, useState } from "react";
import { LoadingComponent } from "./LoadingComponent";

import style from "./styles/TemporaryMessageComponent.module.css"
import { GoX } from "react-icons/go";

type temporaryMessageProps = {
    text: string;
    displayingSeconds: number
}

export function TemporaryMessageComponent(props: temporaryMessageProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, props.displayingSeconds * 1000);

        return () => clearTimeout(timer);
    }, [props.text, props.displayingSeconds]);

    if(!visible) return null;
    
    return <article className={style.messageWrapper + " simpleShadow"}>
        <LoadingComponent text={props.text} />
        <section className={style.progressBar}>
            <span style={{animationDuration: `${props.displayingSeconds}s`}} className={style.progressLoad}></span>
        </section>
        <button onClick={() => setVisible(false)} className={style.closeMessageButton}><GoX fontSize="1.5rem" /></button>
    </article>
}//#4949f9
