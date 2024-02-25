import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactPaginate from "react-paginate";

const ListBlog = () => {

    const [blog, setBlog] = useState("")
    const {id} = useParams();
    const navigate = useNavigate()

    const getSingleBlog = async() => {
        const {data} = await axios.get(`http://localhost:8000/api/blog-detail/${id}`)
        setBlog(data)
    }

    useEffect(()=> {
        getSingleBlog()
    }, [])


    const deleteUser = async(id)=> {
        await axios.delete(`http://localhost:8000/api/blog-delete/${id}/`)
        navigate('/')
    }

    return (
      <div>
        <h1>Blog Detail Page</h1>
        <Container>
          <Row>
            <Col></Col>
            <Col>
            <img src={`http://localhost:8000${blog.image}/`} alt="" className="img-fluid"/>
            <p>{blog.name}</p>
            <p>{blog.description}</p>
            <Link className="btn btn-outline-primary mr-2 mx-2" to={`/${blog.id}/update`}>Update</Link>
            <Link className="btn btn-danger" onClick={() => deleteUser(blog.id)}>Delete</Link></Col>
            <Col></Col>
          </Row>
        </Container>

       
        
      </div>
    );
}
 
export default ListBlog;
