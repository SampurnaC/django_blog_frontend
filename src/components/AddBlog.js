import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

const AddBlog = () => {

    const [image, setImage] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [artist, setArtist] = useState("")
    const [image_url, setImageUrl] = useState("")



    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const navigate = useNavigate();

    const addNewBlog = async() => {
      let formField = new FormData()

      formField.append('name', name)
      formField.append('description', description)
      formField.append('category', category)
      formField.append('url', url)
      formField.append('artist', artist)
      formField.append('image_url', image_url)




      // if(image != '') {
      //   formField.append('image', image)

      // }
  
      await axios({
          method: 'post',
          url: 'http://localhost:8000/api/blog-create/',
          data: formField
      }).then((response) => {
          navigate('/')
      })


    }

    useEffect(()=>{
      const getCategories = async()=>{
        const res = await fetch('http://localhost:8000/api/category-list/')
        const data=await res.json()
        setCategories(data)

      }
      getCategories()

    },[])
    
    console.log(image_url)
    return (
      <div className="container">
        
        <div className="w-75 mx-auto shadow p-5 mx-auto my-5">
            <h2 className="text-center mb-4">Add A Blog</h2>
            
            {/* <div className="form-group">
              <label>Image</label>
                <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
            </div> */}
            <br />
            <div className="form-group">
              <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Unsplash URL"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              />
            </div>
            <br />
            <div className="form-group">
              <input
              type="hidden"
              className="form-control form-control-lg"
              placeholder="Enter Your Blog Title"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />
            </div>
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
            <div className="form-group">
              <input
              type="hidden"
              className="form-control form-control-lg"
              placeholder="Enter Your Artist"
              name="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              
              />
            </div>
            
            <br />
            <div className="form-group">
              <input
              type="hidden"
              className="form-control form-control-lg"
              placeholder="Image URL"
              name="image_url"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              
              />
            </div>

            <label>Choose a Category: </label>
              <select value={category} onChange={(e)=> setCategory(e.target.value)}>
              {categories.map((cat,index)=>(
                <option value={cat.id}>{cat.name}</option>
                ))
                }
              </select>
              <br />
            {/* <p>You selected: {category}</p> */}
            {/* {
              category.map((cat,index)=>(
                <h1>{cat.name}</h1>
              ))
            } */}
            
            <br />
            <button className="btn btn-primary btn-block" onClick={addNewBlog}>Add Blog</button>
        
        </div>

        
      </div>
  );
}
 
export default AddBlog;
