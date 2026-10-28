import { PostsList } from "./components/PostsList";

import style from "./styles/Notas.module.css"

export function Notas() {
    return <main className={style.main}>
        <h1>Notas</h1>
        <PostsList />
    </main>
}