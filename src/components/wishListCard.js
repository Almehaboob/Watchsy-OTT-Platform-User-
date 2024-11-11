import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css'; // Import your CSS file
import axios from 'axios';

function WishListCard({ id, title, rating, thumbnail, datee, onRemove }) {
    const navigate = useNavigate();

    // Handler for clicking on the thumbnail
    const handleThumbnailClick = () => {
        console.log('Navigating to movie details with ID:', id); // Log the ID
        navigate(`/home/${id}`, {
            state: {
                id, // Passing the ID of the movie
            },
        });
    };

    // Handler for removing the movie from the watch later list
    const handleRemoveClick = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage

        try {
            const response = await axios.delete(`http://127.0.0.1:8000/watchlater/delete/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`, // Include the token in the headers
                },
            });

            if (response.status === 204) { // Check if the response status indicates success
                console.log('Movie removed from Watch Later successfully');
                if (onRemove) {
                    onRemove(id); // Call the onRemove prop to update the parent component state
                }
            }
        } catch (error) {
            console.error('Error removing movie from Watch Later:', error.response ? error.response.data : error.message);
        }
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
                <p className="watch-date" style={{ color: '#622469' }}>Added on: {datee}</p>
                <div className="d-flex align-items-center justify-content-center mb-2">
                    <FaStar style={{ color: '#FFD700', marginRight: '5px' }} />
                    <span>{rating}</span>
                </div>
                <div className="d-flex justify-content-center mt-auto">
                    <Button variant="outline-danger" className="d-flex align-items-center" onClick={handleRemoveClick}>
                        <FaStar className="me-2" />
                        Remove
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default WishListCard;
