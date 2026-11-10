import type Post from "../types/Post";

export async function fetchNewPost(
    title: string,
    message: string,
    token: string | null
): Promise<Post> {
    const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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
export async function fetchLike(
    postId: number,
    token: string
): Promise<void> {
    if(!token) throw new Error("Invalid session token :(");
    
    const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }
}
export async function fetchDislike(
    postId: number,
    token: string
): Promise<void> {
    if(!token) throw new Error("Invalid session token :(");
    
    const response = await fetch(`/api/posts/${postId}/like`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }
}
export async function fetchPostsFromUser(
    username: string
) : Promise<Post[]> {
    const response = await fetch(`/api/users/${username}/posts`);
    
    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data;
}
export async function fetchExludePost(
    postId: number,
    token: string
): Promise<void> {
    if(!token) throw new Error("Invalid session token :(");
    
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    console.log(response);
    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }
}
