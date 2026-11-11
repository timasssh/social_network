import { useState } from "react"
import type User from "../types/User"

import style from "./styles/UserProfileComponent.module.css"

import { FaGem } from "react-icons/fa"
import { TemporaryMessageComponent } from "./TemporaryMessageComponent"
import { fetchEditProfile } from "../services/UserService"
import { useAuth } from "./AuthProviderComponent"
import { ErrorComponent } from "./ErrorComponent"

type userProfileProps = {
    user: User,
    owner: boolean
}

export function UserProfileComponent(props: userProfileProps) {
    const { token } = useAuth();
    if(!token) return <ErrorComponent errorTitle="Algo deu errado enquanto verificava a sessão do usuário :(" error={new Error("Sessão de usuário inválida!")} />
    
    const [editingProfile, setEditingProfile] = useState(false);

    const [editedName, setEditedName] = useState(props.user.name);
    const [currentName, setCurrentName] = useState(props.user.name);
    const [editedUsername, setEditedUsername] = useState(props.user.username);
    const [currentUsername, setCurrentUsername] = useState(props.user.username);

    const [error, setError] = useState<Error | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // TODO: fetch api to update profile
    async function handleEditProfile() {
        const maxIdentifierLength = 127;
        
        setEditedName(editedName.trim());
        setEditedUsername(editedUsername.trim());

        if(editedName.length === 0 || editedName.length > maxIdentifierLength) {
            setError(new Error("Nome de usuário inválido!"));
            return;
        }
        if(editedUsername.length === 0 || editedUsername.length > maxIdentifierLength) {
            setError(new Error("Username de usuário inválido!"));
            return;
        }

        try {
            if(!token) throw new Error("Sessão de usuário inválida!");
            await fetchEditProfile(editedName, editedUsername, token);

            setCurrentName(editedName);
            setCurrentUsername(editedUsername);

            setEditingProfile(false);
            setSuccess("Perfil editado com sucesso!");
        } catch(error) {
            if(error instanceof Error) {
                setError(error);
            }
        }
    }

    if(editingProfile) return <>
        {error && <TemporaryMessageComponent text={error.message} displayingSeconds={3} setVariableToNull={setError} />}
        <article className={style.profileWrapper} >
            <img className={style.userBanner} src="/background_texture_banner_image.jpg" alt="user banner image" />
            <section className={style.userWrapper} >
                <img className={style.userPhoto} src="/user_photo_icon.svg" alt="user photo image" />
                <section className={style.userEditWrapper} >
                    <small>editando perfil...</small>
                    <input onInput={(event) => setEditedName(event.currentTarget.value)} type="text" defaultValue={currentName} />
                    <div className={style.editUsername} >
                        <span>@</span>
                        <input onInput={(event) => setEditedUsername(event.currentTarget.value)} className={style.editUsernameInput} type="text" defaultValue={currentUsername}/>
                    </div>
                </section>
                <section className={style.actions} >
                    <button onClick={handleEditProfile} style={{padding: "0.5rem 3rem"}} className="defaultButton">Salvar</button>
                    <button onClick={() => setEditingProfile(false)} style={{padding: "0.5rem 3rem"}} className="defaultButton">Cancelar</button>
                    <p>{props.user.followers} followers</p>
                </section>
            </section>
        </article>
    </>

    return <article className={style.profileWrapper} >
        {success && <TemporaryMessageComponent text={success} displayingSeconds={3} setVariableToNull={setSuccess} />}
        <img className={style.userBanner} src="/background_texture_banner_image.jpg" alt="user banner image" />
        <section className={style.userWrapper} >
            <img className={style.userPhoto} src="/user_photo_icon.svg" alt="user photo image" />
            <section className={style.userInfoWrapper} >
                <h2 className={style.userNameInfo}>{currentName}</h2>
                <p>@{currentUsername}</p>
                {props.user.premium && <FaGem />}
            </section>
            <section className={style.actions} >
                {props.owner
                    ? <button onClick={() => setEditingProfile(true)} style={{padding: "0.5rem 3rem"}} className="defaultButton">editar perfil</button>
                    : <button style={{padding: "0.5rem 3rem"}} className="defaultButton">seguir</button>
                }
                <p>{props.user.followers} followers</p>
            </section>
        </section>
    </article>
}
