import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Form, Nav, Navbar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
      const getCategories = async()=>{
        const res = await fetch('http://localhost:8000/api/category-list/')
        const data=await res.json()
        setCategories(data)

      }
      getCategories()

    },[])

    return (
      <Navbar>
        <Container>
          <Row className="d-flex justify-content-center">
            <Nav className="me-auto">
              {categories.map((cat,index)=>(
                // <Nav.Link as={Link} to='/category/${cat.name}'>{cat.name}</Nav.Link>
                <Nav.Link as={Link} to={encodeURI(`/category/${cat.id}`)} className="btn btn-dark me-1" style={{color: "white", backgroundColor: "black"}}>
                {cat.name}
              </Nav.Link>
              ))
            }
            </Nav>
          </Row>
        </Container>
      </Navbar>
    );
}
 
export default Category;
