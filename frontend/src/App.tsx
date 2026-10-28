import { Outlet } from "react-router-dom"
import style from "./styles/App.module.css"
import { Link } from "react-router-dom"

function App() {
  return (
    <>
      <header>
        <span className={style.logo}>
          <h1>Viraliza</h1>
          <div className={style.logoIcon}>
            <span className={style.logoIconSpan}></span>
            <span className={style.logoIconSpan}></span>
            <span className={style.logoIconSpan}></span>
          </div>
        </span>
        <nav>
          <Link className={style.navLink} to="">Home</Link>
          <Link className={style.navLink} to="/login">Login</Link>
          <Link className={style.navLink} to="/notas">Notas</Link>
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default App
