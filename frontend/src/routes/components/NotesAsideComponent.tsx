import style from "./styles/NotesAsideComponent.module.css"
import { UsersListComponent } from "./UsersListComponent"

export function NotesAsideComponent() {
    return <aside className={style.aside + " simpleShadow"} >
        <section className={style.searchBarWrapper} >
            <label htmlFor="searchBarInput" className={style.asideTitles} >Pesquise por notas ou usuários...</label>
            <input type="text" name="searchBar" id="searchBarInput" />
        </section>
        <section className={style.findNewPeopleWrapper} >
            <h1 className={style.asideTitles} >Descubra novas pessoas</h1>
            <UsersListComponent />
        </section>
    </aside>
}