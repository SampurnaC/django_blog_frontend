import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ReactPaginate from "react-paginate";
import styles from "./ShowBlogs.module.css";
import Category from './Category';

const ShowBlogs = () => {

  const url = 'http://localhost:8000/api'
  const [items, setItems] = useState([])


  useEffect(()=>{
    const getBlogs = async()=>{
      const res = await fetch(`http://localhost:8000/api/blog-list/?page=1`)
      const data=await res.json()
      setItems(data.results)
    }
    getBlogs()
  },[])


  const handlePageClick = async (data1)=>{
    let currentPage = data1.selected + 1
    const getPaginatedBlogs = await getBlogs(currentPage)
    setItems(getPaginatedBlogs.results)
  }

  
  
  const getBlogs = async (currentPage) => {
    const res = await fetch(`http://localhost:8000/api/blog-list/?page=${currentPage}`)
    const data = await res.json()
    return data 
    
  }


  return (
    <div>
      {items&&
      <Container>
        <Category />
        <h2>All Blogs</h2>
        <Row className="d-flex justify-content-center">
          {
            
            items.map((blog,index)=>(
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
}


      <div className={styles.pagination}>
        <ReactPaginate style={{ position: "fixed", bottom: "0", width: "100", color: "red" }} 
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
    </div>
  );
}

export default ShowBlogs;
