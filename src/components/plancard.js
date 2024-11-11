import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './plancard.css'; // Import your CSS file

function PlanCard({ id, title, price, thumbnail, duration }) {
    const navigate = useNavigate();
    
    
    const handleThumbnailClick = () => {
        // Navigate to the details page and pass the plan ID
        navigate(`/subscribe/${id}`, {
            state: {
                id, // Passing the ID of the plan
            },
        });
    };

    return (
        <Card className="plan-card" style={{ width: '18rem', margin: '10px' }}>
            <Card.Img
                variant="top"
                src={thumbnail}
                alt={`${title} Thumbnail`}
                style={{ height: '15rem', objectFit: 'cover', cursor: 'pointer' }}
                onClick={handleThumbnailClick}
            />
            <Card.Body className="d-flex flex-column justify-content-between" style={{ padding: '0.5rem' }}>
                <Card.Title className="text-center mb-1">{title}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default PlanCard;
