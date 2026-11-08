import { useEffect, useState } from "react";
import { PostComponent } from "./PostComponent";
import { ErrorComponent } from "./ErrorComponent";
import { LoadingComponent } from "./LoadingComponent";
import type Post from "../types/Post";

import style from "./styles/PostsList.module.css";
import { fetchPosts } from "../services/PostService";

export function PostsList() {
    const [fetchLoading, setFetchLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchPosts();
                setPosts(data);
                setFetchLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                }
            }
        }
        fetchData();
    }, []);

    if (error) {
        return <ErrorComponent errorTitle="Algo deu errado enquanto buscava os posts :(" error={error} />
    }
   
    return <section className={style.postsList}>
        {fetchLoading ? <LoadingComponent text="Carregando"/> : posts.map((post) => <PostComponent key={post.id} title={post.title} message={post.message} author={post.author} likes={post.likes} />)}
    </section>
}