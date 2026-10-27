import style from "./styles/CardComponent.module.css"

type cardProps = {
    title: string,
    image_url: URL,
    image_alt: string, 
    text: string
}

export function CardComponent(cardProps: cardProps) {
    return <article className={style.card}>
        <h3>{cardProps.title}</h3>
        <p>{cardProps.text}</p>
        <img className={style.card_image} src={cardProps.image_url.toString()} alt={cardProps.image_alt} />
    </article>
}