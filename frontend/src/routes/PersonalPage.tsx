import { useEffect, useState } from "react";
import { useAuth } from "./components/AuthProviderComponent";
import { ErrorComponent } from "./components/ErrorComponent";
import { PostsList } from "./components/PostsList";
import { fetchLoggedUserData } from "./services/UserService";
import { LoadingComponent } from "./components/LoadingComponent";
import { UserProfileComponent } from "./components/UserProfileComponent";
import type User from "./types/User";

import style from "./styles/UserPage_personalPage.module.css"

export function PersonalPage() {
    const { token } = useAuth();
    const username = sessionStorage.getItem("username");
    const name = sessionStorage.getItem("name");
    if(!token || !username || !name) return <ErrorComponent error={new Error("Authentication error")} errorTitle="Algo deu errado enquanto caregava informações do usuário :(" />

    const [userData, setUserData] = useState<User | null>(null);
    const [userDataError, setUserDataError] = useState<Error | null>(null);

    useEffect(() => {
        async function getUserData () {
            try {
                if(!token) throw new Error("Error when fetching user data");
                const data = await fetchLoggedUserData(token);

                setUserData(data)
            } catch (error) {
                if(error instanceof Error) {
                    setUserDataError(error);
                }
            } finally {
                console.log(userData);
            }
        }
        getUserData();
    }, [username]);

    return <main className={style.main} >
        <h2>Informações do seu perfil</h2>
        <section>
            {!userData 
                ? <LoadingComponent text="Carregando informações do usuário"/> 
                : <UserProfileComponent owner={true} user={userData}/>
            }
            {userDataError && <ErrorComponent error={userDataError} errorTitle="algo deu errado enquanto buscava informações do usuário :(" />}
        </section>

        <h2>Seus posts</h2>
        <section className={style.userPosts} >
            <PostsList username={username} />
        </section>
    </main>
}