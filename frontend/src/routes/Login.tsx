import style from "./styles/Login_SignIn.module.css"

import { Link } from "react-router-dom"

export function Login() {
    return <main>
        <h1>Login</h1>
        <form action="">
            <label htmlFor="emailInput">Digite seu email: </label>
            <input type="email" name="email" id="emailInput"/>
            <label htmlFor="passwordInput">Digite sua senha: </label>
            <input type="password" name="password" id="passwordInput"/>
            
            <input type="submit" value="enviar" />
        </form>
        <Link to="/cadastro">Não tem conta? Cadastre-se</Link>
    </main>
}