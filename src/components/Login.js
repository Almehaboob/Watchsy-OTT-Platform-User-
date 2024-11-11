import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Footer from './Footer';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api_login/', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.user);

                navigate('/home');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.error || 'Login failed. Please try again.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <Card className="login-card">
                    <Card.Body>
                        <Card.Title className="card-title text-center mb-4">Login</Card.Title>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>

                        {message && <p className="mt-3 text-center">{message}</p>}

                        <div className="mt-3 text-center">
                            <Link to="/forgotpassword">Forgot password?</Link>
                        </div>
                        <div className="mt-3 text-center">
                            <span>Don't have an account? </span>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
