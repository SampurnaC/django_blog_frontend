import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Form, Nav, Navbar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

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

    console.log(categories)
    return (
      // <div>
      //   {categories.map((cat,index)=>(
      //     <option value={cat.id}>{cat.name}</option>
      //     ))
      //     }
      // </div>

      <Navbar >
      <Container>
        <Nav className="me-auto">
          {categories.map((cat,index)=>(
            // <Nav.Link as={Link} to='/category/${cat.name}'>{cat.name}</Nav.Link>
            <Nav.Link as={Link} to={encodeURI(`/category/${cat.id}`)}>
            {cat.name}
          </Nav.Link>
          ))
        }
        </Nav>
      </Container>
    </Navbar>
    );
}
 
export default Category;
{/* <ul>
          {categories.map((cat,index)=>(
            <li key={cat.id}><a href={"category"+'/'+cat.name}>{cat.name}</a>
            </li>
          ))
}
          </ul> */}
