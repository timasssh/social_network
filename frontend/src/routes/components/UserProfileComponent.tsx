import { useState } from "react"
import type User from "../types/User"

import style from "./styles/UserProfileComponent.module.css"

import { FaGem } from "react-icons/fa"
import { TemporaryMessageComponent } from "./TemporaryMessageComponent"
import { fetchDeleteProfile, fetchEditProfile } from "../services/UserService"
import { useAuth } from "./AuthProviderComponent"
import { ErrorComponent } from "./ErrorComponent"
import { BsTrashFill } from "react-icons/bs"
import { GoX } from "react-icons/go"
import { useNavigate } from "react-router-dom"

type userProfileProps = {
    user: User,
    owner: boolean
}

export function UserProfileComponent(props: userProfileProps) {
    const navigate = useNavigate();
    const { token, logout } = useAuth();
    if(!token) return <ErrorComponent errorTitle="Algo deu errado enquanto verificava a sessão do usuário :(" error={new Error("Sessão de usuário inválida!")} />
    
    const [editingProfile, setEditingProfile] = useState(false);

    const [editedName, setEditedName] = useState(props.user.name);
    const [currentName, setCurrentName] = useState(props.user.name);
    const [editedUsername, setEditedUsername] = useState(props.user.username);
    const [currentUsername, setCurrentUsername] = useState(props.user.username);

    const [deleteProfileMenuVisibility, setDeleteProfileMenuVisibility] = useState(false);

    const [error, setError] = useState<Error | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [redirect, setRedirect] = useState<string | undefined>(undefined);
    const [loggingOut, setLoggingOut] = useState(false);

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

    async function handleDeleteProfile() {
        setDeleteProfileMenuVisibility(false);
        try {
            if(!token) throw new Error("Sessão de usuário inválida!");

            await fetchDeleteProfile(token);

            setRedirect("/");
            setSuccess("A sua conta foi excluída com sucesso!");
            setLoggingOut(true);
            setEditingProfile(false);

            sessionStorage.clear();
        } catch (error) {
            setError(new Error(error instanceof Error ? error.message : "Erro inesperado!"));
        }
    }

    function handleLogOut() {
        navigate("/");
        logout();
    }

    if(editingProfile) return <>
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
                    <button onClick={handleEditProfile} className={"defaultButton " + style.actionButton}>Salvar</button>
                    <button onClick={() => setEditingProfile(false)} className={"defaultButton " + style.actionButton}>Cancelar</button>
                    <button onClick={() => setDeleteProfileMenuVisibility(true)} className={style.actionButton +" defaultButton " + style.deleteAccountButton}>Delete profile<BsTrashFill /></button>
                    <p>{props.user.followers} followers</p>
                </section>
            </section>
        </article>
        {deleteProfileMenuVisibility && 
            <div className="popUpMenu">
                <article className={style.deleteProfileMenu}>
                    <button type="button" className="closePopUpMenu" onClick={() => setDeleteProfileMenuVisibility(false)}><GoX /></button>
                    <h3>Você tem certeza?</h3>
                    <p>Você deseja excluir sua conta?</p>
                    <small className="errorMessage">* essa ação é irreversível!</small>
                    <section>
                        <button className={"defaultButton " + style.actionButton} onClick={handleDeleteProfile}>Sim</button>
                        <button className={"defaultButton " + style.actionButton} onClick={() => setDeleteProfileMenuVisibility(false)}>Cancelar</button>
                    </section>
                </article>
            </div>
        }
        {error && <TemporaryMessageComponent text={error.message} displayingSeconds={3} setVariableToNull={setError} />}
    </>

    return <>
        <article className={style.profileWrapper} >
            {success && <TemporaryMessageComponent text={success} displayingSeconds={3} setVariableToNull={setSuccess} redirectionLink={redirect} logOutAfterMessgae={loggingOut} />}
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
                        ? <>
                            <button onClick={() => setEditingProfile(true)} className={"defaultButton " + style.actionButton}>editar perfil</button>
                            <button onClick={handleLogOut} className={"defaultButton " + style.actionButton}>Sair</button>
                        </>
                        : <button className={"defaultButton " + style.actionButton}>seguir</button>
                    }
                    <p>{props.user.followers} followers</p>
                </section>
            </section>
        </article>
    </>
}
