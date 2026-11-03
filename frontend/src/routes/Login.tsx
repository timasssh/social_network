import { useState } from "react";
import style from "./styles/Login_SignIn.module.css"

import { Link } from "react-router-dom"
import { fetchLogin } from "./services/AuthService";
import type Authentication from "./types/Authentication";

export function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState<{identifierError : string, passwordError : string}>(
        {
            identifierError: "",
            passwordError: ""
        }
    );

    const [authData, setAuthData] = useState<Authentication>();

    function clearErrors() {
        setErrors({identifierError: "", passwordError: ""});
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        clearErrors();

        const minPasswordLength = 8;
        const maxPasswordLength = 127;
        const maxIdentifierLength = 127;

        const trimmedIdentifier = identifier.trim();

        if(trimmedIdentifier.length === 0 || trimmedIdentifier.length > maxIdentifierLength) {
            setErrors(current => ({...current, identifierError: "Digite um login válido!"}));
            return;
        }
        if(password.length < minPasswordLength || password.length > maxPasswordLength) {
            setErrors(current => ({...current, passwordError: "Digite uma senha válida (min 8 caracteres)!"}));
            return;
        }
        
        try {
            // setFetchLoading(true);

            const data = await fetchLogin(
                trimmedIdentifier,
                password
            );

            setAuthData(data);
            // console.log(data);

            // setTitle("");
            // setMessage("");

            // setMenuIsHidden(true);

        } catch (error) {
            console.log(error);
            // if (error instanceof Error) {
            //     setFetchError(error.message);
            // } else {
            //     setFetchError("Ocorreu um erro inesperado.");
            // }
        } finally {
            // setFetchLoading(false);

            console.log(authData);
        }
    }

    return <main>
        <h1>Login</h1>
        <form method="post" onSubmit={handleSubmit}>
            <label htmlFor="loginInput">Digite seu email ou nome de usuário: </label>
            <section>
                <input onChange={(event) => setIdentifier(event.currentTarget.value)} type="login" name="identifier" id="identifierInput"/>
                <span className="errorMessage">{errors.identifierError}</span>
            </section>
            <label htmlFor="passwordInput">Digite sua senha: </label>
            <section>
                <input onChange={(event) => setPassword(event.currentTarget.value)} type="password" name="password" id="passwordInput"/>
                <span className="errorMessage">{errors.passwordError}</span>
            </section>
            
            <input type="submit" value="enviar" />
        </form>
        <Link to="/cadastro">Não tem conta? Cadastre-se</Link>
    </main>
}