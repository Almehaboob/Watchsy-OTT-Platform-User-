import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure Axios is installed
import './watchHistory.css';
import CustomNavbar from './Navbar';
import CarouselComponent from './Carousel';
import WishListCard from './wishListCard';

function WishList() {
    const [movies, setMovies] = useState([]); // State to hold fetched movies
    const [currentPage, setCurrentPage] = useState(1);
    const [message, setMessage] = useState('');

    const moviesPerPage = 5; // Number of movies to show per page

    // Calculate total pages
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    // Get current movies to display
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Fetch movies when the component mounts
    useEffect(() => {
        const fetchWatchLaterMovies = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user');
    
            if (!token || !userId) {
                setMessage('You need to be logged in to view your Watch Later list.');
                return;
            }
    
            try {
                const response = await axios.get(`http://127.0.0.1:8000/watchlater/${userId}`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
    
                console.log('Watch Later Response Data:', response.data); // Log the response data

                if (response.status === 200) {
                    setMovies(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch Watch Later movies:', error.response ? error.response.data : error.message);
                setMessage('Failed to fetch movies. Please try again.');
            }
        };
    
        fetchWatchLaterMovies();
    }, [currentPage]);

    const handleRemoveMovie = (id) => {
        setMovies(movies.filter(movie => movie.movie.id !== id)); // Remove the movie from state
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

    return (
        <div className="home-container">
            <CustomNavbar />
            <CarouselComponent />

            <h2 className="watch-history-heading">Watch Later</h2>

            {message && <p className="error-message">{message}</p>}

            <div className="movie-cards-container">
                {currentMovies.length > 0 ? (
                    currentMovies.map((item, index) => (
                        <WishListCard
                            key={index}
                            id={item.movie.id} 
                            title={item.movie.title}                // Access movie title
                            rating={item.movie.rating}              // Access movie rating
                            thumbnail={item.movie.thumbnail}        // Access movie thumbnail
                            datee={item.date}                       // Access the added date
                            onRemove={handleRemoveMovie}            // Pass the remove handler
                        />
                    ))
                ) : (
                    <p>No movies found in your Watch Later list.</p>
                )}
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

export default WishList;
