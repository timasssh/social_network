import { CardComponent } from "./components/CardComponent"
import style from "./styles/Home.module.css"

export function Home() {
    return <main>
        <h1>Viraliza, a rede social do Brasil!</h1>
        <CardComponent title="Faça login ou crie uma conta!" text={"Faça login ou registre-se para interagir com outras pessoas, postando, curtindo e se divertindo! :). Faça login ou registre-se clicando em \"login\" e após isso poderá aproveitar a interação virtual com amigos, páginas de notícias e memes (0_0)."} image_url={new URL("/login_demonstrative_image.png", window.location.origin)} image_alt="login informative image" />
        <CardComponent title="Interaja com outros usuários!" text="Curta, comente e poste seus pensamentos, interagindo com outros usuários e expressando seus pensamentos! No Viraliza você pode curtir, repostar, comentar posts de outras pessoas, além de compartilhar seus pensamentos e personalizar seu próprio perfil." image_url={new URL("/interaction_demonstrative_image.png", window.location.origin)} image_alt="interaction demonstrative image" />
        <CardComponent title="Assine o premium e desbloqueie a real experiência!" text="Com prêmium você desbloqueia diversos recursos: como editar suas postagens, gifs como imagem de perfil e posts maiores com o dobro de caracteres. Venha ser premium para viralizar suas postangens no Viraliza, a rede social Brasileira!" image_url={new URL("/be_premium_demonstrative_image.png", window.location.origin)} image_alt="premium demonstrative image" />
    </main>
}