import { Outlet } from "react-router-dom"
import style from "./styles/App.module.css"
import { Link } from "react-router-dom"
import { LogoComponent } from "./routes/components/LogoComponent"

function App() {
  return (
    <>
      <header>
        <LogoComponent onlyIcon={false} />
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
