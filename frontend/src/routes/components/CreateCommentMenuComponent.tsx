import { useState } from "react";
import { GoX } from "react-icons/go";
import { LoadingComponent } from "./LoadingComponent";

import style from "./styles/CreateCommentMenuComponent.module.css"
import { fetchNewComment } from "../services/CommentService";
import { useAuth } from "./AuthProviderComponent";

type createCommentMenuComponentProps = {
    setSuccessMessageFunction: (value: string | null) => void;
    setErrorMessageFunction: (value: Error | null) => void;
    setVisibilityOfMenu: (value: boolean) => void;
    parent_comment_id: number | null;
    parent_post_id: number | null;
}

export default function CreateCommentMenuComponent(props: createCommentMenuComponentProps) {
    const { token } = useAuth();
    
    const maxCharactersCommentMessage = 255;
    
    const [commentMessage, setCommentMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState<null | string>(null);

    const [fetchLoading, setFetchLoading] = useState(false);

    function handleInput(value: string, updateValueFunction: Function) {
        updateValueFunction(value);
    }
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        // TODO: fetch to api here
        if(!event) return;
        event.preventDefault();

        setErrorMessage(null);

        const trimmedComment = commentMessage.trim();

        if(trimmedComment.length === 0 || trimmedComment.length > maxCharactersCommentMessage) {
            setErrorMessage("Digite um comentário válido!");
            return;
        }

        try {
            setFetchLoading(true);

            const data = await fetchNewComment(
                props.parent_comment_id,
                props.parent_post_id,
                trimmedComment,
                token,
            );

            setCommentMessage("");
        } catch (error) {
            if (error instanceof Error) {
                props.setErrorMessageFunction(error);
            } else {
                props.setErrorMessageFunction(new Error("Ocorreu um erro inesperado."));
            }
        } finally {
            setFetchLoading(false);
            props.setVisibilityOfMenu(false);
        }
    }
    
    return <article className="popUpMenu">
        <form onSubmit={handleSubmit} method="post">
                <button type="button" className="closePopUpMenu" onClick={() => props.setVisibilityOfMenu(false)}><GoX /></button>
                <h2>No que você está pensando?...</h2>
                <label htmlFor="postTitleInput">Digite sua resposta para o post:</label>
                <section className={style.formularyInputMessageSection}>
                    <textarea onInput={(event) => handleInput(event.currentTarget.value, setCommentMessage)} name="postTitle" id="postTitleInput" maxLength={maxCharactersCommentMessage}> </textarea>
                    <span className={style.charactersCounter}>{commentMessage.length + "/" + maxCharactersCommentMessage}</span>
                    <span className="errorMessage">{errorMessage}</span>
                </section>

                <input type="submit" value="Postar" />
            {fetchLoading && <LoadingComponent text="Carregando"/>}
        </form>
    </article>
}