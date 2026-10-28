import { Link } from "react-router-dom"
import style from "./styles/Login_SignIn.module.css"

export function SignIn() {
    return <main>
        <h1>Cadastro</h1>
        <form action="">
            <label htmlFor="usernameInput">Digite seu nome de usuário: </label>
            <input type="email" name="username" id="usernameInput"/>
            <label htmlFor="emailInput">Digite seu email: </label>
            <input type="email" name="email" id="emailInput"/>
            <label htmlFor="passwordInput">Digite sua senha: </label>
            <input type="password" name="password" id="passwordInput"/>
            <label htmlFor="passwordConfirmationInput">Confirme sua senha: </label>
            <input type="password" name="passwordConfirmation" id="passwordConfirmationInput"/>
            
            <input type="submit" value="enviar" />
        </form>
        <Link to="/login">Já tem conta? Faça login</Link>
    </main>
}