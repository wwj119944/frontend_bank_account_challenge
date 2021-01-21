import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import BrandLogo from '../Images/BrandLogo.png';

function NavBar() {

    return (

        <Navbar bg="light" expand="lg">
            <Navbar.Brand><Image src={BrandLogo} style={{ width: '95px', height: '50px' }} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link><NavLink to="/">Home</NavLink></Nav.Link> */}
                    <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                        <LinkContainer to="/TransactionsPage"><NavDropdown.Item>Transactions Page</NavDropdown.Item></LinkContainer>
                        {/* <NavDropdown.Item href="/Bmi&IntakeCalculator">BMI & Intake</NavDropdown.Item> */}
                        <NavDropdown.Divider />
                        <LinkContainer to="/MakeATransaction"><NavDropdown.Item>Make A Transaction</NavDropdown.Item></LinkContainer>
                        {/* <NavDropdown.Item href="/FoodCalorieCalculator">Food Calorie</NavDropdown.Item> */}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default NavBar;