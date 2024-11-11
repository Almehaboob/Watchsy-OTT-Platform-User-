import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import './watchHistory.css';
import CustomNavbar from './Navbar';
import CarouselComponent from './Carousel';
import WHmoviecard from './WHmoviecard';

function WatchHistory() {
    const [movies, setMovies] = useState([]); // State to store movies
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 2; // Number of movies to show per page

    // Fetch watch history data when component mounts
    useEffect(() => {
        const fetchWatchHistory = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from local storage
                const userId = localStorage.getItem('user');

                const response = await axios.get(`http://127.0.0.1:8000/watch-history/${userId}/`, {
                    headers: {
                        'Authorization': `Token ${token}`, // Include the token in the headers
                    },
                });
                setMovies(response.data); // Store the fetched movies in state
            } catch (error) {
                console.error('Error fetching watch history:', error.response?.data || error.message);
            }
        };
        

        fetchWatchHistory();
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    // Get current movies to display
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

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

            <h2 className="watch-history-heading">Watch History</h2>
            <div className="movie-cards-container">
                {currentMovies.map((item, index) => (
                    <WHmoviecard
                                key={index}
                            id={item.movie.id} 
                            title={item.movie.title}                // Access movie title
                            rating={item.movie.rating}              // Access movie rating
                            thumbnail={item.movie.thumbnail}        // Access movie thumbnail
                            datee={item.date} 
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

export default WatchHistory;
