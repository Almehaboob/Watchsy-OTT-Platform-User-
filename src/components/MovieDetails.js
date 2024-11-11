import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get URL params
import axios from 'axios'; // Import Axios for API requests
import './MovieDetails.css'; // Import your CSS file for styling
import { FaStar } from 'react-icons/fa';
import CustomNavbar from './Navbar';
function MovieDetails() {
    const { id } = useParams(); // Get the movie ID from URL parameters
    const videoRef = useRef(null); // Create a ref to access the video element

    const [movie, setMovie] = useState(null); // Store movie data
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch movie details using the movie ID
    useEffect(() => {
        console.log('Fetching details for movie ID:', id); // Log the ID being fetched
        const fetchMovieDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from local storage
                const response = await fetch(`http://127.0.0.1:8000/api_movies/${id}/`, {
                    headers: {
                        'Authorization': `Token ${token}`, // Include the token in the headers
                    },
                });
                if (!response.ok) {
                    const errorMsg = await response.text();
                    console.error(`Error! status: ${response.status}, message: ${errorMsg}`);
                    throw new Error(`Error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Movie Details:', data);
                setMovie(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setLoading(false);
            }
        };
        
        fetchMovieDetails();
    }, [id]);

    // Function to handle "Watch Movie" button click
    const handleWatchMovie = async () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0; // Reset video to the start
            videoRef.current.play(); // Play the video
    
            // Get the current date in the format expected by your backend
            const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
            // Store the movie in watch history
            try {
                const token = localStorage.getItem('token'); // Get the token from local storage
                const watchHistoryResponse = await axios.post(
                    'http://127.0.0.1:8000/watch-history/',
                    {
                        movie: id, // Pass the movie ID
                        date: currentDate, // Pass the current date
                    },
                    {
                        headers: {
                            'Authorization': `Token ${token}`, // Include the token in the headers
                        },
                    }
                );
                console.log('Watch history updated:', watchHistoryResponse.data);
            } catch (error) {
                // Enhanced error logging
                console.error('Error adding to watch history:', error.response?.data || error.message);
            }
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div className="movie-details-container">
            <CustomNavbar/>
            <div className="movie-details-card">
                <h2 className="movie-title">{movie.title || 'Title not available'}</h2>
                <img
                    className="movie-thumbnail"
                    src={movie.thumbnail || 'default-thumbnail.jpg'}
                    alt={`${movie.title || 'No title'} Thumbnail`}
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />
                <div className="movie-video" style={{ margin: '5px' }}>
                    <video
                        ref={videoRef} // Assign the ref to the video element
                        width="100%"
                        height="315"
                        controls
                    >
                        <source src={movie.video || 'default-video.mp4'} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <p className="movie-description">{movie.description || 'No description available'}</p>
                <div className="buttons-container">
                    <div className="movie-rating">
                        <FaStar style={{ color: '#FFD700', marginRight: '5px' }} />
                        <span>{movie.rating || 'N/A'}</span>
                    </div>
                    <button className="watch-later-button" >
                        Add Rating
                    </button>
                    <button className="add-rating-button" onClick={handleWatchMovie}>
                        Watch Movie
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
