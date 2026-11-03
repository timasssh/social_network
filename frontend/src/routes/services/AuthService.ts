import type Authentication from "../types/Authentication";

export async function fetchLogin(
    identifier: string,
    password: string
): Promise<Authentication> {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identifier,
            password
        })
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data: Authentication = await response.json();
    console.log(data);

    return data;
}