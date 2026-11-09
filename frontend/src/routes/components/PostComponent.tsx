import { useState } from "react"
import style from "./styles/PostComponent.module.css"

import { GoHeartFill, GoHeart } from "react-icons/go"
import { useAuth } from "./AuthProviderComponent"
import { TemporaryMessageComponent } from "./TemporaryMessageComponent"
import { fetchDislike, fetchLike } from "../services/PostService"

type postProps = {
    "title": string,
    "message": string,
    "author": string,
    "likes": number,
    "id": number
}

export function PostComponent(postProps: postProps) {
    const { token } = useAuth();
    
    const [isLiked, setIsLiked] = useState(false);
    const [likesTotal, setLikesTotal] = useState(postProps.likes);

    const [error, setError] = useState<string | null>(null);

    async function likePost() {
        if(!token){
            setError("Faça login para interagir com posts!");
            return;
        }

        try {
            await fetchLike(postProps.id, token); // no returning fetch to API
            
            setIsLiked(true);
            setLikesTotal(likesTotal + 1);
        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
            }
        }
    }
    async function dislikePost() {
        if(!token){
            setError("Faça login para interagir com posts!");
            return;
        }

        try {
            await fetchDislike(postProps.id, token); // no returning fetch to API
            
            setIsLiked(false);
            setLikesTotal(likesTotal - 1);
        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
            }
        }
    }

    return <article className={style.post + " simpleShadow"}>
        {error !== null && <TemporaryMessageComponent displayingSeconds={3} text={error} setVariableToNull={setError} />}
        <p className={style.postAuthor}>@{postProps.author}</p>
        <p className={style.postTitle}>{postProps.title}</p>
        <p>{postProps.message}</p>
        <div className={style.postInteractions}>
            <span className={style.postInteractionInfo} 
            onClick={() => !token ? setError("Faça login para interagir com posts!") : isLiked ? dislikePost() : likePost()}>
                {!isLiked ? <GoHeart className={style.likePostButton} /> : <GoHeartFill  className={style.likePostButton} />}{likesTotal}
            </span>
        </div>
    </article>
}