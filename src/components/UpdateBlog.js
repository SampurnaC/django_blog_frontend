import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UpdateBlog = () => {
    const [image, setImage] = useState(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const navigate = useNavigate()
    const {id} = useParams()


    useEffect(()=>{
        loadBlogs();
    }, [])

    const loadBlogs = async() => {
        const result = await axios.get(`http://localhost:8000/api/blog-detail/${id}/`)
        setImage(result.data.image)
        setName(result.data.name)
        setDescription(result.data.description)
    }

   
    const updateBlog = async () => {
        let formField = new FormData()
        formField.append('name', name)
        formField.append('description', description)

        if(image !== null) {
            formField.append('image', image)
        }

        await axios({
            method: 'PUT',
            url: `http://localhost:8000/api/blog-update/${id}/`,
            data: formField,
        }).then(response => {
            navigate("/");
        })
    }
    
    return (
        <div>
            <h1>Update Blog</h1>
            <div className="form-group">
                <img src={image} alt="" />
                    <label>Image</label>
                        <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>

                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-group">
                        <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Your E-mail Address"
                        name="email"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary btn-block" onClick={updateBlog}>Update Blog</button>

        </div>
    );
}
 
export default UpdateBlog;
