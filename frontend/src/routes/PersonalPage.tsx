import { useAuth } from "./components/AuthProviderComponent";
import { ErrorComponent } from "./components/ErrorComponent";

export function PersonalPage() {
    const { token } = useAuth();
    if(!token) return <ErrorComponent error={new Error("Authentication error")} errorTitle="Algo deu errado enquanto caregava informações do usuário :(" />

    return <main>
        <h1>Olá, Usuário</h1>
    </main>
}