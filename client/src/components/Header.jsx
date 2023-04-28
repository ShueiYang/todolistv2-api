import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Header = ({handleChange, searchInput, gotoHomePage, customListName, getCustomList, deleteMenu}) => {
    
    return (
        
      <Navbar expand="lg">
        <Container>
        <Navbar.Brand 
          className="navbar-brand" 
          href="https://shueiyang.github.io/keeper-app"
          rel="noopener noreferrer"
          target="_blank"
        >
          Keeper Project
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Nav.Link onClick={gotoHomePage}>Home</Nav.Link>
            <Form className="d-flex ms-3 me-3">
              <Form.Control autoComplete="on"
                  type="search"
                  placeholder="Access or create new list here..."
                  className="me-2"
                  aria-label="Search"
                  onChange={handleChange}
                  value={searchInput}
              />
              <Button className="btn-outline" 
                    variant="outline-success"
                    onClick={()=> {getCustomList(searchInput)}}>
                Access
              </Button>
            </Form>
            <NavDropdown title="Custom List" id="basic-nav-dropdown">
              {customListName.map(list => (
                  <NavDropdown.Item 
                    key={list._id}
                    onClick={()=> {getCustomList(list.name)}}>
                    {list.name}
                  </NavDropdown.Item>
                  )
                )}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=> {deleteMenu()}}>
                Delete custom list
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Header;             
                