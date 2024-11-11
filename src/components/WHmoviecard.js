import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css'; // Import your CSS file

function WHmoviecard({ id, title, rating, thumbnail, description, videoUrl, datee }) {
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
                <p className="watch-date" style={{ color: "#622469" }}>Watched on: {datee}</p>
                <div className="d-flex align-items-center justify-content-center mb-2">
                    <FaStar style={{ color: '#FFD700', marginRight: '5px' }} />
                    <span>{rating}</span>
                </div>
                <div className="d-flex justify-content-center mt-auto">
                    <Button variant="outline-primary" className="d-flex align-items-center">
                        <FaStar className="me-2" />
                        Watch Later
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default WHmoviecard;
