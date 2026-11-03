import type Post from "../types/Post";

export async function fetchNewPost(
    title: string,
    message: string
): Promise<Post> {
    const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            message
        })
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    // console.log(response);
    const data: Post = await response.json();

    return data;
}
export async function fetchPosts() : Promise<Post[]> {
    const response = await fetch("/api/posts");
    
    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data;
}
