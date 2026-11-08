import { useEffect, useState } from "react";
import { UserComponent } from "./UserComponent"
import type User from "../types/User";
import { ErrorComponent } from "./ErrorComponent";
import { fetchUsers } from "../services/UserService";
import { LoadingComponent } from "./LoadingComponent";

export function UsersListComponent() {
    const [fetchLoading, setFetchLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchUsers();
                setUsers(data);
                setFetchLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                }
            }
        }
        fetchData();
    }, []);

    if (error) {//Algo deu errado enquanto buscava os posts :(
        return <ErrorComponent error={error} errorTitle="Algo deu errado enquanto buscava por usuários :(" />
    }

    return <>
        {fetchLoading ? <LoadingComponent text="Carregando"/> : users.map((user, index) => <UserComponent key={index} name={user.name} username={user.username} followers={user.followers} />)}
    </>
}