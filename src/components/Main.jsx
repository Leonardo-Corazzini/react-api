
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"
import Card from "./Card/Card"
import initialPosts from "../posts"
import ModifyForm from './ModifyForm/ModifyForm'
const initialFormData = {
    title: '',
    image: '',
    content: '',
    tags: [],
    published: true,
}

const allTags = ["html", "css", "js", "php"]

function Main() {
    const [posts, setPosts] = useState(initialPosts)
    const [formData, setFormData] = useState(initialFormData)



    function handlerTagChange(e) {

        const clickTag = e.target.value
        setFormData((formData) => ({
            ...formData,
            tags: formData.tags.includes(clickTag) ? formData.tags.filter((tag) => tag !== clickTag) : [...formData.tags, clickTag]
        }))
    }


    function handlerFormData(e) {
        const value =
            e.target.type === "checkbox" ?
                e.target.checked : e.target.value


        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value
        }))
    }


    function addPost(event) {
        event.preventDefault()


        setPosts([...posts, { id: Date.now(), ...formData }])
        setFormData(initialFormData)


    }

    function deletePost(postToDelete) {




        setPosts(posts.filter(post => post !== postToDelete))
    }

    useEffect(() => {
        alert('change')
    }, [formData.published])    // 

    const [clickedCardID, setClickedCardID] = useState(0)
    const [modifyMode, setModifyMode] = useState(false)
    const [modifyTitle, setModifyTitle] = useState('')
    function modifyFormToggle(id) {
        setModifyTitle('')
        setClickedCardID(id)
        setModifyMode(modifyMode ? false : true)
    }
    function confirmModifyForm(post, title) {

        title ? post.title = title : post.title = post.title
        setClickedCardID(0)
        setModifyMode(false)
    }


    return (
        <main>
            <div className="container">
                <form onSubmit={addPost} action="" className="form">
                    <input onChange={handlerFormData} type="text" name='title' placeholder="inserisci titolo" value={formData.title} />
                    <input onChange={handlerFormData} type="text" name='image' placeholder="inserisci percorso immagine" value={formData.image} />
                    <input onChange={handlerFormData} type="text" name='content' placeholder="inserisci percorso immagine" value={formData.content} />

                    {
                        allTags.map((tag, i) => {
                            return (
                                <span>
                                    <input type="checkbox" name="tags" id={`tag-${i}`} onChange={handlerTagChange} value={tag} />
                                    <label htmlFor={`tag-${i}`}>{tag}</label>
                                </span>
                            )
                        })
                    }

                    <input onChange={handlerFormData} checked={formData.published} name='published' id='published' type="checkbox" />
                    <label htmlFor='published' >Pubblica</label>

                    <input type="submit" value="aggiungi" />
                </form>
            </div>
            <div className="container">
                <div className="row">
                    {
                        posts.map((post) =>
                            post.published && <div key={post.id} className="col-6 card-container">
                                <div>{clickedCardID === post.id && modifyMode ? <ModifyForm callback={setModifyTitle} title={modifyTitle} callback2={() => confirmModifyForm(post, modifyTitle)} /> : ''}</div>
                                <div onClick={() => modifyFormToggle(post.id)} className='xwrench'><FontAwesomeIcon icon={faWrench} /></div>
                                <div onClick={() => deletePost(post)} className='xmark'><FontAwesomeIcon icon={faXmark} /></div>
                                <Card props={post} />
                            </div>
                        )

                    }

                </div>

            </div>
        </main>
    )

}

export default Main