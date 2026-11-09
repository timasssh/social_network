import React, { useState } from "react";
import { LogoComponent } from "./LogoComponent";
import { GoX } from "react-icons/go"

import style from "./styles/CreatePostButton.module.css"
import type Post from "../types/Post";
import { fetchNewPost } from "../services/PostService";
import { LoadingComponent } from "./LoadingComponent";
import { TemporaryMessageComponent } from "./TemporaryMessageComponent";
import { useAuth } from "./AuthProviderComponent";

export function CreatePostButton() {
    const { token } = useAuth();
    if(!token) return null;

    const [menuIsHidden, setMenuIsHidden] = useState(true);

    const maxCharactersPostTitle = 32;
    const maxCharactersPostMessage = 255;

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState<{title : string, message : string}>({
        title: "",
        message: ""
    });

    const [fetchLoading, setFetchLoading] = useState(false);
    const [createdPost, setCreatedPost] = useState<Post | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    function clearErrors() {
        setErrors({title: "", message: ""});

        setFetchError(null);
    }

    function handleInput(value: string, updateValue: Function) {
        updateValue(value.trim());

        clearErrors();
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        if(!event) return;
        event.preventDefault();

        clearErrors();
        setCreatedPost(null);

        const trimmedTitle = title.trim();
        const trimmedMessage = message.trim();

        if(trimmedTitle.length === 0 || trimmedTitle.length > maxCharactersPostTitle) {
            setErrors(current => ({...current, title: "Digite um título válido!"}));
            return;
        }
        if(trimmedMessage.length === 0 || trimmedMessage.length > maxCharactersPostMessage) {
            setErrors(current => ({...current, message: "Digite uma mensagem válida!"}));
            return;
        }

        try {
            setFetchLoading(true);

            const data = await fetchNewPost(
                trimmedTitle,
                trimmedMessage,
                sessionStorage.getItem("token")
            );

            setCreatedPost(data);

            setTitle("");
            setMessage("");

            setMenuIsHidden(true);

        } catch (error) {
            if (error instanceof Error) {
                setFetchError(error.message);
            } else {
                setFetchError("Ocorreu um erro inesperado.");
            }
        } finally {
            setFetchLoading(false);
        }
    }

    return <>
        {createdPost !== null && <TemporaryMessageComponent displayingSeconds={3} text="Post criado com sucesso!" />}
        {fetchError !== null && <TemporaryMessageComponent displayingSeconds={3} text={"Error: " + fetchError} />}
    
        <button onClick={() => setMenuIsHidden(!menuIsHidden)} aria-description="button to create a post; button to post something in your account" className={style.createPostButton}><LogoComponent onlyIcon={true} /></button>

        {!menuIsHidden && <article className={style.menu}>
            <form onSubmit={handleSubmit} method="post">
                <button type="button" className={style.closeMenuButton} onClick={() => setMenuIsHidden(true)}><GoX /></button>
                <h2>No que você está pensando?...</h2>
                <label htmlFor="postTitleInput">Digite o titulo do post:</label>
                <section className={style.formularyInputMessageSection}>
                    <input onInput={(event) => handleInput(event.currentTarget.value, setTitle)} type="text" name="postTitle" id="postTitleInput"maxLength={maxCharactersPostTitle}  />
                    <span className={style.charactersCounter}>{title.length + "/" + maxCharactersPostTitle}</span>
                    <span className="errorMessage">{errors.title}</span>
                </section>
                <label htmlFor="postMessageInput">Digite a mensagem do post:</label>
                <section className={style.messageArea}>
                    <textarea onInput={(event) => handleInput(event.currentTarget.value, setMessage)} name="postMessage" id="postMessageInput" maxLength={maxCharactersPostMessage} ></textarea>
                    <span className={style.charactersCounter}>{message.length + "/" + maxCharactersPostMessage}</span>
                    <span className="errorMessage">{errors.message}</span>
                </section>


                {fetchError && (
                    <span className={style.errorMessage}>
                        {fetchError}
                    </span>
                )}

                <input type="submit" value="Postar" />
                {fetchLoading && <LoadingComponent text="Carregando"/>}
            </form>
        </article>}
    </>
}