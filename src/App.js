import React, {useState, useEffect} from 'react';
import './App.css';
import ShowBlogs from './components/ShowBlogs';
import AddBlog from './components/AddBlog';
import ListBlog from './components/ListBlog';
import UpdateBlog from './components/UpdateBlog';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavbarMenu from './components/NavbarMenu';
import Search from './components/Search';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function App() {

  const url = 'http://localhost:8000/api'
  const[data, setData] = useState([])
  const[searchText, setsearchText] = useState("")


  useEffect(()=>{
    fetchData()
  }, [searchText])

  const fetchData = async()=> {
    const endpoint = `${url}/search/?search=${searchText}`
    try {
      const response = await fetch(endpoint,{
        method: 'GET'
      })
      const data = await response.json()
      setData(data)
    }
    catch(e){
      console.log(e)
    }
  }


  return (
    <div className="App">
      <Router>
      <NavbarMenu searchText={searchText} setsearchText={setsearchText}/>
      {searchText ? 
        <Container>
          <h2>Searched Blogs</h2>
          <Row>
            {
              data.map((blog,index)=>(
                <Card style={{ width: '18rem' }} className=" ms-2 my-2">
                  <Col>
                    <Card.Img variant="top" src={`http://localhost:8000${blog.image}/`} />
                    <Card.Body>
                      <Card.Title>{blog.name}</Card.Title>
                      <Card.Text>{blog.description}</Card.Text>
                    </Card.Body>
                    <Link className='btn btn-dark' to={`/${blog.id}/`}>Show Blog</Link>
                  </Col>
                </Card>
              ))
              
            }
          </Row>
        </Container> : "" }
        
        <Routes>
          <Route exact path="/" element={<ShowBlogs />} />
          <Route exact path="/addBlog" element={<AddBlog />} />
          <Route exact path="/:id" element={<ListBlog />} />
          <Route exact path="/:id/update" element={<UpdateBlog />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
