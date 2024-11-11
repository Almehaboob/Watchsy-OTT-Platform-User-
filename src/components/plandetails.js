import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './plandetails.css';

function Plandetails() {
    const { id } = useParams(); // Get the plan ID from the URL
    const [plan, setPlan] = useState(null); // State to hold plan details
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State to show success message

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(`http://127.0.0.1:8000/api_plans/${id}/`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                setPlan(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load plan details: ' + err.message);
                setLoading(false);
            }
        };

        fetchPlanDetails();
    }, [id]);

    // Function to handle "Buy Now" button click
    const handleBuyNow = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            // Make POST request to create subscription
            const response = await axios.post(
                'http://127.0.0.1:8000/create-subscription/', 
                { plan_id: id }, // Send the plan ID to subscribe
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                }
            );

            // Handle successful subscription
            setSuccessMessage('You have successfully subscribed to the plan!');
        } catch (err) {
            setError('Failed to subscribe: ' + err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="movie-details-container">
            <div className="movie-details-card">
                <h2 className="buy-now">Buy Now</h2>
                <h3 className="movie-title">{plan.name}</h3>
                <p className="movie-price">Price: ₹ {plan.price}</p>
                <p className="movie-duration">Duration: {plan.duration}</p>

                {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
                
                <div className="buttons-container">
                    <button className="buy-button" onClick={handleBuyNow}>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Plandetails;
