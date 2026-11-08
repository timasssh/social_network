import { Outlet } from "react-router-dom"
import style from "./styles/App.module.css"
import { Link } from "react-router-dom"
import { LogoComponent } from "./routes/components/LogoComponent"
import { UserLoggedDisplay } from "./routes/components/UserLoggedDisplayComponent";

function App() {
  const userIsAuthentified = sessionStorage.getItem("token") !== null;

  return (
    <>
      <header>
        <LogoComponent onlyIcon={false} />
        <nav>
          <Link className={style.navLink} to="">Home</Link>
          <Link className={style.navLink} to="/notas">Notas</Link>
          {userIsAuthentified 
            ? <UserLoggedDisplay />
            : <Link className={style.navLink} to="/login">Login</Link>}
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default App
