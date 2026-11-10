import type User from "../types/User";

export async function fetchUsers() : Promise<User[]> {
    const response = await fetch("/api/users");
    
    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data;
}
export async function fetchUser(
    username: string
) : Promise<User> {
    const response = await fetch(`/api/users/${username}`);
    
    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data;
}
