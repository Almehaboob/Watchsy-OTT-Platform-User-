import React, { useState, useEffect } from 'react';
import './Home.css';
import MovieCard from './movieCard';
import CustomNavbar from './Navbar';
import CarouselComponent from './Carousel';
import axios from 'axios';

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 4;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                
                const response = await axios.get('http://127.0.0.1:8000/api_movies/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                
                console.log(response.data);
                setMovies(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load movies: ' + err.message);
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    // Filter movies based on search query
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to the first page when search query changes
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
                    placeholder="Search for movies or shows..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button onClick={() => setCurrentPage(1)} className="search-button">
                    Search
                </button>
            </div>
            <div className="movie-cards-container">
                {currentMovies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        id={movie.id}
                        title={movie.title}
                        rating={movie.rating}
                        thumbnail={movie.thumbnail}
                        description={movie.description}
                        videoUrl={movie.videoUrl}
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

export default Home;
