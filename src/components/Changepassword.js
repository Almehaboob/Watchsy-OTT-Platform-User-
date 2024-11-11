import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Changepassword.css'; // Ensure this is correctly pointing to the CSS file

function ChangePassword() {
  const navigate = useNavigate();

  // State to hold password values
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // For success/error messages

  // Function to handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault(); // Prevents the form from submitting

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }

    try {
      // Make the API call to change password using PUT method
      const response = await axios.put('http://127.0.0.1:8000/change_password/', {
        old_password: oldPassword, // Corrected field name
        new_password: newPassword,
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`, // Include token in headers for authentication
        }
      });

      // Handle successful response
      if (response.status === 200) {
        setMessage('Password changed successfully!');
        navigate('/home')
        // Optionally, navigate to another page after success
        // navigate('/home');
      }
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || 'Failed to change password. Please try again.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <Card className="card">
        <Card.Body>
          <Card.Title className="card-title text-center mb-4">Change Password</Card.Title>
          <Form onSubmit={handleChangePassword}>
            <Form.Group className="mb-3" controlId="formBasicOldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)} // Update state with form input
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} // Update state with form input
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Update state with form input
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Change
            </Button>
          </Form>

          {/* Display success or error message */}
          {message && <p className="mt-3 text-center">{message}</p>}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ChangePassword;
