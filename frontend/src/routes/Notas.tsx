import { LogoComponent } from "./components/LogoComponent";
import { PostsList } from "./components/PostsList";

import style from "./styles/Notas.module.css"

export function Notas() {
    return <main className={style.main}>
        <h1>Notas</h1>
        <PostsList />
        <button aria-description="button to create a post; button to post something in your account" className={style.createPostButton}><LogoComponent onlyIcon={true} /></button>
    </main>
}