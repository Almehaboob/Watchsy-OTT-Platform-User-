import React, { useState } from 'react';
import './Subscribe.css';
import PlanCard from './plancard';
import CustomNavbar from './Navbar';
import CarouselComponent from './Carousel';
import Card from 'react-bootstrap/Card';

function SubscriptionsHistory() {
    // Array of plan details to display multiple cards
    const plans = [
        {
            title: "One Month Plan",
            price: 199,
            thumbnail: "https://img.freepik.com/premium-vector/limited-offer-flat-purple-limited-offer-banner-vector-illustration_748571-1713.jpg",
            duration: "29 Days",
            expirationDate: "2024-10-20"
        },
        {
            title: "Two Month Plan",
            price: 399,
            thumbnail: "https://img.freepik.com/premium-vector/limited-offer-flat-purple-limited-offer-banner-vector-illustration_748571-1713.jpg",
            duration: "59 Days",
            expirationDate: "2024-09-15"
        },
        {
            title: "Three Month Plan",
            price: 399,
            thumbnail: "https://img.freepik.com/premium-vector/limited-offer-flat-purple-limited-offer-banner-vector-illustration_748571-1713.jpg",
            duration: "89 Days",
            expirationDate: "2024-08-01"
        },
        {
            title: "Ultimate Plan",
            price: 399,
            thumbnail: "https://img.freepik.com/premium-vector/limited-offer-flat-purple-limited-offer-banner-vector-illustration_748571-1713.jpg",
            duration: "29 Days",
            expirationDate: "2024-09-25"
        },
        {
            title: "Savings Plan",
            price: 399,
            thumbnail: "https://img.freepik.com/premium-vector/limited-offer-flat-purple-limited-offer-banner-vector-illustration_748571-1713.jpg",
            duration: "29 Days",
            expirationDate: "2024-09-10"
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const plansPerPage = 2; // Number of plans to show per page

    // Split plans into activated and previous based on expiration date
    const currentDate = new Date();
    const activatedPlans = plans.filter(plan => new Date(plan.expirationDate) >= currentDate);
    const previousPlans = plans.filter(plan => new Date(plan.expirationDate) < currentDate);

    // Ensure only one plan is in activated plans
    const currentActivatedPlan = activatedPlans.length > 0 ? activatedPlans[0] : null;

    // Calculate total pages for previous plans
    const totalPages = Math.ceil(previousPlans.length / plansPerPage);

    // Get current previous plans to display based on pagination
    const indexOfLastCard = currentPage * plansPerPage;
    const indexOfFirstCard = indexOfLastCard - plansPerPage;
    const currentPreviousPlans = previousPlans.slice(indexOfFirstCard, indexOfLastCard);

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

    return (
        <div className="home-container">
            <CustomNavbar />
            <CarouselComponent />

            {/* Activated Plans Section */}
            <h2 className='available-plan'>Activated Plan</h2>
            <div className="plan-cards-container">
                {currentActivatedPlan ? (
                    <PlanCard
                        title={currentActivatedPlan.title}
                        price={currentActivatedPlan.price}
                        thumbnail={currentActivatedPlan.thumbnail}
                        duration={currentActivatedPlan.duration}
                    />
                ) : (
                    <p>No active plans available</p>
                )}
            </div>

            {/* Previous Plans Section */}
            <h2 className='available-plan'>Previous Plans</h2>
            <div className="plan-cards-container">
                {currentPreviousPlans.length > 0 ? (
                    currentPreviousPlans.map((plan, index) => (
                        <Card key={index} className="plan-card" style={{ width: '18rem', margin: '10px' }}>
                            <Card.Img
                                variant="top"
                                src={plan.thumbnail}
                                alt={`${plan.title} Thumbnail`}
                                style={{ height: '15rem', objectFit: 'cover' }}
                            />
                            <Card.Body className="d-flex flex-column justify-content-between" style={{ padding: '0.5rem' }}>
                                <Card.Title className="text-center mb-1">{plan.title}</Card.Title>
                                <Card.Text className="text-center mb-1">
                                    Price: ₹{plan.price}
                                </Card.Text>
                                <Card.Text className="text-center mb-1">
                                    Expired on: {plan.expirationDate}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No previous plans available</p>
                )}
            </div>

            {/* Pagination for Previous Plans */}
            {totalPages > 1 && (
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
            )}
        </div>
    );
}

export default SubscriptionsHistory;
