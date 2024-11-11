import React, { useState, useEffect } from 'react';
import './Subscribe.css';
import PlanCard from './plancard';
import CustomNavbar from './Navbar';
import CarouselComponent from './Carousel';
import axios from 'axios'; // Import Axios to fetch data from the API

function Subscribe() {
    // State to hold plans fetched from the API
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const plansPerPage = 5; // Number of plans to show per page

    // Fetch plans from the API on component mount
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token); // Check if token exists
                if (!token) {
                    throw new Error('No token found'); // Error if token is missing
                }

                const response = await axios.get('http://127.0.0.1:8000/api_plans/', {
                    headers: {
                        'Authorization': `Token ${token}`,  // Use "Token" instead of "Bearer"
                    },
                });
                setPlans(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load plans: ' + err.message);
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);
     // Empty array means this effect runs only once after the initial render

    // Calculate total pages
    const totalPages = Math.ceil(plans.length / plansPerPage);

    // Get current plans to display
    const indexOfLastPlan = currentPage * plansPerPage;
    const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
    const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        console.log('Search query:', searchQuery);
        // Implement search logic if needed
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="home-container">
            <CustomNavbar />
            <CarouselComponent />
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search for plans..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button onClick={handleSearchClick} className="search-button">
                    Search
                </button>
            </div>
            <h2 className='available-plan'>Available Plans</h2>
            <div className="plan-cards-container">
                {currentPlans.map((plan, index) => (
                    <PlanCard
                        key={index}
                        id={plan.id}
                        title={plan.name}
                        price={plan.price}
                        thumbnail={plan.thumbnail} // Make sure your API returns the correct paths
                        duration={plan.duration}    // Assuming your API returns duration
                    />
                ))}
            </div>
            <div className="pagination-container">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Subscribe;
