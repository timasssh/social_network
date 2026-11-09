import { useParams } from "react-router-dom";
import { ErrorComponent } from "./components/ErrorComponent";

export function UserPage() {
    const params = useParams();

    const username = params.username;
    if(!username) return <ErrorComponent error={new Error("Searching error")} errorTitle="Algo deu errado enquanto caregava informações do usuário :(" />
    
    return <>
        <h1>Olá, {username}</h1>
    </>
}