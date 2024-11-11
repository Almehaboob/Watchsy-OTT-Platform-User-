import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Logout.css'; // Import CSS for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting

function LogoutModal({ show, handleClose }) {
    const navigate = useNavigate(); // Initialize navigate
    const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

    // Function to handle logout
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Check the token value
    
        if (!token) {
            setErrorMessage('No token found. Please log in.');
            return;
        }
    
        try {
            const response = await axios.delete('http://127.0.0.1:8000/logout/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
    
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
                handleClose();
            }
        } catch (error) {
            console.error('Logout failed:', error);
            setErrorMessage('Failed to log out. Please try again.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="logout-modal">
            <Modal.Header closeButton>
                <Modal.Title>Leaving us already?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to logout?</p>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message if exists */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Back
                </Button>
                <Button variant="danger" onClick={handleLogout}> {/* Trigger the logout API call */}
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogoutModal;
