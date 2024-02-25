import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {

    const [image, setImage] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const navigate = useNavigate();

    const addNewBlog = async() => {
        let formField = new FormData()

        formField.append('name', name)
        formField.append('description', description)

        if(image !== null) {
            formField.append('image', image)
        }

        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/blog-create/',
            data: formField
        }).then((response) => {
            console.log(response.data)
            navigate('/')
        })
    }


    return (
      <div className="container">
        <div className="w-75 mx-auto shadow p-5 mx-auto my-5">
            <h2 className="text-center mb-4">Add A Blog</h2>
            
            <div className="form-group">
              <label>Image</label>
                <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])} required/>
            </div>
            <br />
            <div className="form-group">
              <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Blog Title"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />
            </div>
            <br />
            <div className="form-group">
              <textarea
              type="description"
              className="form-control form-control-lg"
              placeholder="Enter Your Blog Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              />
            </div>
            <br />
            <button className="btn btn-primary btn-block" onClick={addNewBlog}>Add Blog</button>
        
        </div>
      </div>
  );
}
 
export default AddBlog;
