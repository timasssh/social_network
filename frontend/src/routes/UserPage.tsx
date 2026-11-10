import { useParams } from "react-router-dom";
import { ErrorComponent } from "./components/ErrorComponent";
import { useEffect, useState } from "react";
import type User from "./types/User";
import { LoadingComponent } from "./components/LoadingComponent";
import { fetchUser } from "./services/UserService";
import { UserProfileComponent } from "./components/UserProfileComponent";

import style from "./styles/UserPage_personalPage.module.css"
import { PostsList } from "./components/PostsList";

export function UserPage() {
    const params = useParams();
    const username = params.username;
    if(!username) return <ErrorComponent error={new Error("Searching error")} errorTitle="Algo deu errado enquanto caregava informações do usuário :(" />

    const [userData, setUserData] = useState<User | null>(null);
    const [userDataError, setUserDataError] = useState<Error | null>(null);

    useEffect(() => {
        async function getUserData () {
            try {
                if(!username) throw new Error("Error when fetching user data");
                const data = await fetchUser(username);

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
        <h2>Informações de: @{username}</h2>
        <section>
            {!userData 
                ? <LoadingComponent text="Carregando informações do usuário"/> 
                : <UserProfileComponent owner={false} user={userData}/>
            }
            {userDataError && <ErrorComponent error={userDataError} errorTitle="algo deu errado enquanto buscava informações do usuário :(" />}
        </section>

        <h2>Posts</h2>
        <section className={style.userPosts} >
            <PostsList username={username} />
        </section>
    </main>
}