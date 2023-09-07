import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

function Header(props) {
    return (
        <header className="Header">
            <Navbar bg="success" variant="dark" className="headerNav">
                <div className="Title_nav">
                    <Navbar.Brand as={Link} to="http://localhost:3000/">WEE!</Navbar.Brand>
                </div>
                <Nav className="mr-auto">
                    {/*<Nav.Link as={Link} to="http://localhost:3000/">영화</Nav.Link>*/}
                    {/* Add other menu items */}
                </Nav>
            </Navbar>
        </header>
    )
}

export default Header;