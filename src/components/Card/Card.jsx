import Button from "../Button/Button"
import style from "./Card.module.css"
const placeHolderImage = "https://placehold.co/600x400"


function Card({ props, }) {
    const { title, image, content, tags } = props;


    return (
        <div className={style.card}>
            <div className={style.img}>
                <img className={style.thumb} src={image || placeHolderImage} alt="" />
            </div>
            <div className={style.body}>
                <h3 className={style.title}>{title}</h3>


                <div className={style.tagSection}> {tags.map((tag, i) =>
                    <span key={i} className={style[tag]}>{tag}</span>
                )}
                </div>


                <p className={style.description}>{content}</p>
                <Button />
            </div>
        </div>
    )
}

export default Card