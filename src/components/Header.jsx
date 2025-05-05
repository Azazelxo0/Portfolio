import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { motion } from "framer-motion"
import { NavbarCollapse } from 'react-bootstrap';



export default function Header() {
  return (
    <>
      

      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "linear" }}
      >
      
        <Navbar bg="" data-bs-theme="light" className='mt-' collapseOnSelect expand="lg">
          
          <Container>
            <Navbar.Brand href="#home" className='fs-4'>PORTFOLIO</Navbar.Brand>
            <Navbar.Toggle />
            <NavbarCollapse>
              <Nav className="ms-auto fs-5" >
                <Nav.Link href="#home" className='me-4'>Profile</Nav.Link>
                <Nav.Link href="#features" className='me-4'>About</Nav.Link>
                <Nav.Link href="#pricing" className='me-4'>Service</Nav.Link>
                <Nav.Link href="#pricing" className='me-4'>Skills</Nav.Link>
                <Nav.Link href="#pricing" className='me-4'>Project</Nav.Link>
                <Nav.Link href="#pricing" className='me-4'>Contact</Nav.Link>
              </Nav>

            </NavbarCollapse>

          </Container>
        </Navbar>
      </motion.div>


    </>

  )
}
