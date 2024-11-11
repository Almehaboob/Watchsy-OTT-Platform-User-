// CustomNavbar.js
import React, { useState } from 'react'; // Import useState to manage modal visibility
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoutModal from './Logout';
import './Navbar.css';

function CustomNavbar() {
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State to manage modal visibility

    const handleLogoutClick = (e) => {
        e.preventDefault(); // Prevent default link behavior
        setShowLogoutModal(true); // Show the logout modal
    };

    const handleClose = () => {
        setShowLogoutModal(false); // Close the modal
    };

    return (
        <>
            <Navbar expand="lg" className="custom-navbar" fixed="top">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="navbar-brand">
                        Watchsy
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/home" className="nav-link">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/subscribe" className="nav-link">
                                Subscribe
                            </Nav.Link>
                            <NavDropdown
                                title="Activities"
                                id="activities-dropdown"
                                className="nav-link activities-dropdown"
                            >
                                <NavDropdown.Item as={Link} to="/wishlist">
                                    Watch Later                               </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/watchhistory">
                                    Watch History
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                title="Account"
                                id="account-dropdown"
                                className="nav-link account-dropdown"
                            >
                                <NavDropdown.Item as={Link} to="/subshistory">
                                    Subscriptions & History
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/changepassword">
                                    Change Password
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogoutClick}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Logout Modal */}
            <LogoutModal show={showLogoutModal} handleClose={handleClose} />
        </>
    );
}

export default CustomNavbar;
