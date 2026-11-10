import { useState } from "react"
import style from "./styles/PostComponent.module.css"

import { GoHeartFill, GoHeart } from "react-icons/go"
import { useAuth } from "./AuthProviderComponent"
import { TemporaryMessageComponent } from "./TemporaryMessageComponent"
import { fetchDislike, fetchEditPostMessage, fetchExludePost, fetchLike } from "../services/PostService"
import { Link } from "react-router-dom"

import { HiDotsHorizontal } from "react-icons/hi"
import { FaGem } from "react-icons/fa"
import { BsTrashFill } from "react-icons/bs"

type postProps = {
    "title": string,
    "message": string,
    "author": string,
    "likes": number,
    "id": number
}

export function PostComponent(postProps: postProps) {
    const { token } = useAuth();
    const username = sessionStorage.getItem("username");
    
    const [displayPost, setDisplayPost] = useState(true);
    
    const [isLiked, setIsLiked] = useState(false);
    const [likesTotal, setLikesTotal] = useState(postProps.likes);

    const [error, setError] = useState<Error | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [showPostOptionsMenu, setShowPostOptionsMenu] = useState(false);

    const [showEditPostMessageMenu, setShowEditPostMessageMenu] = useState(false);
    const [editedMessage, setEditedMessage] = useState(postProps.message);
    const [currentMessage, setCurrentMessage] = useState(postProps.message);

    async function likePost() {
        if(!token) throw new Error("Faça login para interagir com posts!");

        try {
            await fetchLike(postProps.id, token); // no returning fetch to API
            
            setIsLiked(true);
            setLikesTotal(likesTotal + 1);
        } catch(error) {
            if(error instanceof Error) {
                setError(error);
            }
        }
    }
    async function dislikePost() {
        if(!token) throw new Error("Faça login para interagir com posts!");

        try {
            await fetchDislike(postProps.id, token); // no returning fetch to API
            
            setIsLiked(false);
            setLikesTotal(likesTotal - 1);
        } catch(error) {
            if(error instanceof Error) {
                setError(error);
            }
        }
    }

    function handleMenuOptionsClick() {
        setShowPostOptionsMenu(!showPostOptionsMenu)

        setTimeout(() => setShowPostOptionsMenu(false), 2500);            
    }
    
    async function deletePost() {
        try {
            if(!token) throw new Error("Found unexpected error when checking user authentication :(");

            await fetchExludePost(postProps.id, token);

            setSuccess("Post excluído com sucesso!");
            setDisplayPost(false);
        } catch(error) {
            if(error instanceof Error) {
                setError(error);
            }
        }
    }

    async function editPostMessage() {
        // TODO: fetch to API
        const maxCharactersPostMessage = 255;
        setEditedMessage(editedMessage.trim());

        if(editedMessage.length === 0 || editPostMessage.length > maxCharactersPostMessage) {
            setError(new Error("Invalid message!"));
            return;
        }

        try {
            await fetchEditPostMessage(postProps.id, editedMessage, token);
            
            setSuccess("Post editado com sucesso!");
            setShowEditPostMessageMenu(false);
            setCurrentMessage(editedMessage);
        } catch (error) {
            if(error instanceof Error) {
                setError(error);
            }
        }
    }

    if(!displayPost) return <>
        {error !== null && <TemporaryMessageComponent displayingSeconds={3} text={error.message} setVariableToNull={setError} />}
        {success !== null && <TemporaryMessageComponent displayingSeconds={3} text={success} setVariableToNull={setSuccess} />}
    </>

    return <article className={style.post + " simpleShadow"}>
        {error !== null && <TemporaryMessageComponent displayingSeconds={3} text={error.message} setVariableToNull={setError} />}
        {success !== null && <TemporaryMessageComponent displayingSeconds={3} text={success} setVariableToNull={setSuccess} />}
        <section className={style.postActions} >
            <Link to={"/user/" + postProps.author} className={style.postAuthor}>@{postProps.author}</Link>
            {username === postProps.author && <HiDotsHorizontal className={style.postOptionsDisplayButton} onClick={() => handleMenuOptionsClick()} />}
            {showPostOptionsMenu && <section className={style.postOptionsMenu} >
                <button onClick={deletePost} className="defaultButton">excluir post<BsTrashFill /></button>
                <button onClick={() => setShowEditPostMessageMenu(true)} className="defaultButton">editar post<FaGem/></button>
            </section>}
        </section>
        <p className={style.postTitle}>{postProps.title}</p>

        {!showEditPostMessageMenu && <p>{currentMessage}</p>}
        {showEditPostMessageMenu && <section className={style.editPostMessageWrapper} >
            <label htmlFor="editPostMessageInput"><small>editando mensagem do post...</small></label>
            <textarea onInput={(event) => setEditedMessage(event.currentTarget.value)} name="editPostMessage" id="editPostMessageInput" defaultValue={postProps.message}></textarea>

            <section className={style.editPostMessageOptions} >
                <button onClick={() => setShowEditPostMessageMenu(false)} className="defaultButton">Cancelar</button>
                <button onClick={() => editPostMessage()} className="defaultButton">Editar mensagem</button>
            </section>
        </section>}

        <section className={style.postInteractions}>
            <span className={style.postInteractionInfo} 
            onClick={() => !token ? setError(new Error("Faça login para interagir com posts!")) : isLiked ? dislikePost() : likePost()}>
                {!isLiked ? <GoHeart className={style.likePostButton} /> : <GoHeartFill  className={style.likePostButton} />}{likesTotal}
            </span>
        </section>
    </article>
}