import React, { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MovieCard.css'; // Import your CSS file

function MovieCard({ id, title, rating, thumbnail }) {
    const navigate = useNavigate();
    
    const [isAdded, setIsAdded] = useState(false); // State to track if the movie is already added
    const [message, setMessage] = useState(''); // State to capture messages

    // Check if the movie is already in the Watch Later list
    const checkIfAdded = useCallback(async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user');
        if (!token|| ! userId) return;

        try {
            const response = await axios.get('http://127.0.0.1:8000/watchlater/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            // Check if the movie exists in the response
            const exists = response.data.some(item => item.movie.id === id);
            setIsAdded(exists);
        } catch (error) {
            console.error('Error checking Watch Later list:', error.response ? error.response.data : error.message);
            setMessage('Failed to load Watch Later list.');
        }
    }, [id]); // Add id as a dependency

    // Check if the user is logged in and if the movie is added
    useEffect(() => {
        checkIfAdded();
    }, [checkIfAdded]); // Run once when the component mounts or when checkIfAdded changes

    const handleWatchLaterClick = async () => {
        setMessage(''); // Clear previous messages
    
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user'); // Make sure the key is 'userId'
    
        if (!token || !userId) {
            setMessage('You need to be logged in to add to Watch Later.');
            return;
        }
    
        const parsedUserId = parseInt(userId, 10); // Convert userId to an integer
    
        if (isNaN(parsedUserId)) {
            setMessage('Invalid User ID. Please log in again.');
            return;
        }
    
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/watchlater/',
                {
                    date: currentDate,
                    movie: id, 
                    user: parsedUserId 
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`, // Corrected: Token with proper formatting
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            if (response.status === 201) {
                setMessage('Movie added to Watch Later!');
                setIsAdded(true); 
            }
        } catch (error) {
            console.error('Failed to add movie to Watch Later:', error.response ? error.response.data : error.message);
            setMessage('Failed to add movie. Please try again.');
        }
    };
    
    // Handler for clicking on the thumbnail
    const handleThumbnailClick = () => {
        // Navigate to movie details page with the movie ID
        navigate(`/home/${id}`, {
            state: {
                id, // Passing the ID of the movie
            },
        });
    };

    return (
        <Card className="movie-card" style={{ width: '18rem', margin: '10px' }}>
            <Card.Img
                variant="top"
                src={thumbnail}
                alt={`${title} Thumbnail`}
                style={{ height: '15rem', objectFit: 'cover', cursor: 'pointer' }}
                onClick={handleThumbnailClick} // Attach the click handler
            />
            <Card.Body className="d-flex flex-column justify-content-between" style={{ padding: '0.5rem' }}>
                <Card.Title className="text-center mb-1">{title}</Card.Title>
                <div className="d-flex align-items-center justify-content-center mb-2">
                    <FaStar style={{ color: '#FFD700', marginRight: '5px' }} />
                    <span>{rating}</span>
                </div>
                {message && <div className={`alert ${message.includes('added') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                <div className="d-flex justify-content-center mt-auto">
                    <Button 
                        variant="outline-primary" 
                        className="d-flex align-items-center"
                        onClick={handleWatchLaterClick}
                        disabled={isAdded} // Disable the button if the movie is already added
                    >
                        {isAdded ? 'Added to Watch Later' : 'Watch Later'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;
