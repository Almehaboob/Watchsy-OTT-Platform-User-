import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import './resetpassword.css'; // Import your new CSS file

function ForgotPassword() {
  return (
    // <h2 className="text-center mb-4">Oops! Did you forget the password? Don’t worry, we got you!</h2>

    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="card">
        <Card.Body>
          <Card.Title className="text-center mb-4 card-title">Forgot Password</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Registered Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your registered email" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-2">
              Send Email
            </Button>
          </Form>
          <p className="text-center">
remembered the password? <a href="/login">Login here</a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ForgotPassword;
