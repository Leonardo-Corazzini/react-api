
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"
import axios from 'axios'
import Card from "./Card/Card"
import ModifyForm from './ModifyForm/ModifyForm'
const initialFormData = {
    title: '',
    image: '',
    content: '',
    tags: '',
    published: true,
}
export const API_BASE_URI = 'http://localhost:3000/'

function Main() {
    const [posts, setPosts] = useState([])
    const [formData, setFormData] = useState(initialFormData)

    function fetchPosts() {
        axios.get(`${API_BASE_URI}posts`)
            .then((res) => setPosts(res.data))
            .catch(err => {
                console.log(err)
            })


    }
    useEffect(fetchPosts, [])





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
        const newPost = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim())
        }
        axios.post(`${API_BASE_URI}posts`, newPost)
            .then(res => {
                setPosts([...posts, res.data])
                setFormData(initialFormData)
            }).catch(err => {
                console.log(err)
            })


    }

    function deletePost(id) {

        axios.delete(`${API_BASE_URI}posts/${id}`)
            .then(() => fetchPosts())
            .catch(err => console.log(err))


    }

    // useEffect(() => {
    //     alert('change')
    // }, [formData.published])    // 

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
                    <label htmlFor="title">inserisci titolo</label>
                    <input onChange={handlerFormData} type="text" name='title' placeholder="inserisci titolo" value={formData.title} />
                    <label htmlFor="image">inserisci percorso immagine</label>
                    <input onChange={handlerFormData} type="text" name='image' placeholder="inserisci percorso immagine" value={formData.image} />
                    <label htmlFor="content">Inserisci contentuto</label>
                    <textarea onChange={handlerFormData} type="text" name='content' placeholder="Contentuto articolo..." value={formData.content} ></textarea>
                    <label htmlFor="tags">Tags</label>
                    <input onChange={handlerFormData} type="text" name='tags' id='tags' value={formData.tags} placeholder='tag1,tag2,ecc...' />
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
                                <div onClick={() => deletePost(post.id)} className='xmark'><FontAwesomeIcon icon={faXmark} /></div>
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