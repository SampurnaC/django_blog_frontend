import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const CategoryBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const {id} = useParams()

    useEffect(()=>{
      const getCategories = async()=>{
        const res = await fetch(`http://localhost:8000/api/category/${id}`)
        const data=await res.json()
        setBlogs(data)

      }
      getCategories()

    },[])
    console.log(id)
    console.log(blogs)
    return (
        <Container>
        <h2>Blogs for Category {id}</h2>
        <Row className="d-flex justify-content-center">
          {
            
            blogs.map((blog,index)=>(
              <Card style={{ width: '18rem' }} className=" ms-2 my-2 ">
                <Col>
                  {blog.image == null ? <Card.Img variant="top" src={'http://localhost:8000/media/uploads/images/default.png/'} alt=""/>
                  
                :
                
                <Card.Img variant="top" src={`http://localhost:8000${blog.image}/`} alt=""/>
                }  
                  {/* <Card.Img variant="top" src={`http://localhost:8000${blog.image}/`} alt=""/> */}
                  <Card.Body>
                    <Card.Title>{blog.name}</Card.Title>

                    <Card.Text>{blog.description}</Card.Text>
                    <Card.Text>{blog.category}</Card.Text>
                    
                  </Card.Body>
                  <Link className='btn btn-dark' to={`/${blog.id}/`}>Show Blog</Link>
                </Col>
              </Card>
            ))
          }
        </Row>

      </Container>
    );
}
 
export default CategoryBlogs;
