import type Comment from "../types/Comment";

export async function fetchNewComment(
    parent_comment_id: null | number,
    parent_post_id: null | number,
    message: string,
    token: string | null
): Promise<Comment> {
    const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            parent_comment_id,
            parent_post_id,
            message
        })
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    // console.log(response);
    const data: Comment = await response.json();

    return data;
}