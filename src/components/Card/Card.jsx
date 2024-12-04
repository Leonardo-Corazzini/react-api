import Button from "../Button/Button"
import style from "./Card.module.css"
import { API_BASE_URI } from "../Main";
const placeHolderImage = "https://placehold.co/600x400"


function Card({ props, }) {
    const { title, image, content, tags, id } = props;


    return (
        <div className={style.card}>
            <div className={style.img}>
                <img className={style.thumb} src={image && id < 6 ? API_BASE_URI + image : image && id > 5 ? image : placeHolderImage} alt="" />
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