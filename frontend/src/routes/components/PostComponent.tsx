import { useState } from "react"
import style from "./styles/PostComponent.module.css"

import { GoHeartFill, GoHeart } from "react-icons/go"

type postProps = {
    "title": string,
    "message": string,
    "author": string,
    "likes": number
}

export function PostComponent(postProps: postProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [likesTotal, setLikesTotal] = useState(postProps.likes);

    function likePost() {
        // fetch to Api, if liking post is succed, then: 

        setIsLiked(true);
        setLikesTotal(likesTotal + 1);
    }
    function dislikePost() {
        // fetch to Api, if disliking post is succed, then: 

        setIsLiked(false);
        setLikesTotal(likesTotal - 1);
    }

    return <article className={style.post}>
        <p className={style.postAuthor}>@{postProps.author}</p>
        <p className={style.postTitle}>{postProps.title}</p>
        <p>{postProps.message}</p>
        <div className={style.postInteractions}>
            <span className={style.postInteractionInfo} onClick={() => isLiked ? dislikePost() : likePost()} >{!isLiked ? <GoHeart className={style.likePostButton} /> : <GoHeartFill  className={style.likePostButton} />}{likesTotal}</span>
        </div>
    </article>
}