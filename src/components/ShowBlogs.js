import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form } from "react-bootstrap";
import NavbarMenu from './NavbarMenu';
import ReactPaginate from "react-paginate";

const ShowBlogs = () => {

  const url = 'http://localhost:8000/api'
  // const[data, setData] = useState([])
  const[searchText, setsearchText] = useState("")

  const [items, setItems] = useState([])



  // const fetchData = async()=> {
  //   const endpoint = 'http://localhost:8000/api/blog-list/'
  //   try {
  //     const response = await fetch(endpoint,{
  //       method: 'GET'
  //     })
  //     const data = await response.json()
  //     setData(data)
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }


  // useEffect(()=>{
  //   fetchData()
  // }, [])

  const handlePageClick=(data)=>{
    console.log(data.selected)
  }

  useEffect(()=>{
    getComments()
  },[])

  
  const getComments = async() => {
    const res = await fetch(`http://localhost:8000/api/blog-list/?page=1`)
    const data1 = await res.json()
    setItems(data1)
  }

 
  
  console.log(items)
  return (
    <div>
      {/* <NavbarMenu searchText={searchText} setsearchText={setsearchText}/> */}
      
      <Container>
        <h2>All Blogs</h2>
        <Row>
          {
            items.map((blog,index)=>(
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
      </Container>

      <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={12}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />

    </div>
  );
}

export default ShowBlogs;
