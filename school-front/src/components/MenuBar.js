import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

export default function MenuBar() {
  const adminToken = localStorage.getItem('token')

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
        <Navbar.Brand href="/">School Allotment System</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ml-auto">
            <Link to="/" className="nav-link">Home</Link>
            {/* <Link to="/howwork" className="nav-link">How Its Work</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link> */}
            {
              adminToken ?
                <>
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  <Link to="/logout" className="nav-link">Logout</Link>
                </>
                :
                <Link to="/login" className="nav-link">Login</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
