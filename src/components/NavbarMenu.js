import { Link, NavLink } from "react-router-dom";
import React, { useState } from 'react';
import { Form, Nav, Navbar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


const NavbarMenu = ({searchText, setsearchText}) => {

   
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">BlogApp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/addBlog">Add Blog</Nav.Link>
            <Form className="ms-auto">
              <Form.Group  className= "d-flex align-items-center flex-nowrap" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Search by blog title" value={searchText} onChange={e=>setsearchText(e.target.value)} />
                <Button variant="warning" type="button" size="lg" onClick={(e) => setsearchText('')}>
                  Clear
                </Button>
              </Form.Group>
            </Form>
          
          </Nav>
          
        </Container>
      </Navbar>
    );
};

export default NavbarMenu;
