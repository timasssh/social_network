import { Link } from "react-router-dom"
import style from "./styles/Login_SignIn.module.css"
import { useState } from "react";
import type Authentication from "./types/Authentication";
import { fetchSignin } from "./services/AuthService";
import { TemporaryMessageComponent } from "./components/TemporaryMessageComponent";

export function SignIn() {
    const [identified, setIdentified] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [errors, setErrors] = useState<{usernameError : string | null, emailError : string | null, passwordError: string | null, passwordConfirmationError: string | null}>(
        {
            usernameError: null,
            emailError: null,
            passwordError: null,
            passwordConfirmationError: null
        }
    );

    const [fetchError, setFetchError] = useState<string | null>(null);

    const [authData, setAuthData] = useState<Authentication>();

    function clearErrors() {
        setErrors({usernameError: null, emailError: null, passwordError: null, passwordConfirmationError: null});
        setFetchError(null);
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        clearErrors();

        const regexCodeForEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        const minPasswordLength = 8;
        const maxPasswordLength = 127;
        const maxIdentifierLength = 127;

        setUsername(username.trim());
        setEmail(email.trim());

        if(username.length === 0 || username.length > maxIdentifierLength) {
            setErrors(current => ({...current, usernameError: "Digite um username válido!"}));
            return;
        }
        if(email.length === 0 || email.length > maxIdentifierLength || !email.match(regexCodeForEmail)) {
            setErrors(current => ({...current, emailError: "Digite um email válido!"}));
            return;
        }
        if(password.length < minPasswordLength || password.length > maxPasswordLength) {
            setErrors(current => ({...current, passwordError: "Digite uma senha válida!"}));
            return;
        }
        if(passwordConfirmation !== password) {
            setErrors(current => ({...current, passwordConfirmationError: "As senhas devem ser iguais!"}));
            return;
        }

        // TODO: fetch to API
        try {
            const data = await fetchSignin(username, email, password, passwordConfirmation);

            setAuthData(data);
            
            sessionStorage.setItem("token", data.accessToken);
            sessionStorage.setItem("username", data.user.username);
            sessionStorage.setItem("name", data.user.name);

            setUsername("");
            setEmail("");
            setPassword("");
            setPasswordConfirmation("");

            setIdentified(true);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                setFetchError(error.message);
            } else {
                setFetchError("Ocorreu um erro inesperado.");
            }
        } finally {
            console.log(authData);
        }
    }

    return <main className={style.main}>
        {identified && <TemporaryMessageComponent redirectionLink="/notas" text={"identified as " + authData?.user.name} displayingSeconds={3} />}
        {fetchError !== null && <TemporaryMessageComponent text={"Error: " + fetchError} displayingSeconds={3} />}
        <h1>Cadastro</h1>
        <form method="post" onSubmit={handleSubmit}>
            <label htmlFor="usernameInput">Digite seu nome de usuário: </label>
            <section>
                <input onInput={(event) => setUsername(event.currentTarget.value)} type="text" name="username" id="usernameInput"/>
                <span className="errorMessage">{errors.usernameError}</span>
            </section>
            <label htmlFor="emailInput">Digite seu email: </label>
            <section>
                <input onInput={(event) => setEmail(event.currentTarget.value)} type="text" name="email" id="emailInput"/>
                <span className="errorMessage">{errors.emailError}</span>
            </section>
            <label htmlFor="passwordInput">Digite sua senha: </label>
            <section>
                <input onInput={(event) => setPassword(event.currentTarget.value)} type="password" name="password" id="passwordInput"/>
                <span className="errorMessage">{errors.passwordError}</span>
            </section>
            <label htmlFor="passwordConfirmationInput">Confirme sua senha: </label>
            <section>
                <input onInput={(event) => setPasswordConfirmation(event.currentTarget.value)} type="password" name="passwordConfirmation" id="passwordConfirmationInput"/>
                <span className="errorMessage">{errors.passwordConfirmationError}</span>
            </section>
            
            <input type="submit" value="enviar" />
        </form>
        <Link to="/login">Já tem conta? Faça login</Link>
    </main>
}