import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import Axios
import './Signup.css';

function Signup() {
  const navigate = useNavigate(); // Initialize useNavigate

  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  // State to store messages (success or error)
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match before making API request
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // Make the API request to Django backend
      const response = await axios.post('http://127.0.0.1:8000/api_signup/', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      // Handle successful response
      setMessage(response.data.message || 'Registration successful!');
      
      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate('/login'); // Redirect to the login page
      }, 1500); // Optionally delay the redirection for better UX
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || 'Registration failed.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <Card className="card">
        <Card.Body>
          <Card.Title className="card-title text-center mb-4">Sign Up</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>

          {/* Display success or error message */}
          {message && <p className="mt-3 text-center">{message}</p>}

          <div className="mt-3 text-center">
            <span>Already have an account? </span>
            <Link to="/login" className="login-link">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
