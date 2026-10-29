import { useState } from "react";
import { LogoComponent } from "./LogoComponent";
import { GoX } from "react-icons/go"

import style from "./styles/CreatePostButton.module.css"

export function CreatePostButton() {
    const maxCharactersPostMessage = 255;
    const [messageLength, setMessageLength] = useState(0);
    const [menuIsHidden, setMenuIsHidden] = useState(true);

    return <>
        <button onClick={() => setMenuIsHidden(!menuIsHidden)} aria-description="button to create a post; button to post something in your account" className={style.createPostButton}><LogoComponent onlyIcon={true} /></button>

        {!menuIsHidden && <article className={style.menu}>
            <form>
                <button className={style.closeMenuButton} onClick={() => setMenuIsHidden(true)}><GoX /></button>
                <h2>No que você está pensando?...</h2>
                <label htmlFor="postTitleInput">Digite o titulo do post:</label>
                <input type="text" name="postTitle" id="postTitleInput" />
                <label htmlFor="postMessageInput">Digite a mensagem do post:</label>
                <section className={style.messageArea}>
                    <textarea onInput={(event) => {setMessageLength(event.currentTarget.value.length)}} maxLength={255} name="postMessage" id="postMessageInput"></textarea>
                    <span className={style.charactersCounter}>{messageLength + "/" + maxCharactersPostMessage}</span>
                </section>

                <input type="submit" value="Postar" />
            </form>
        </article>}
    </>
}