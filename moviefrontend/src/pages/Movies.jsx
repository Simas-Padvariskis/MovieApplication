import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import { useLoading } from '../context/LoadingContext';
import MovieDetails from '../components/MovieDetails';

function Movies() {
    const { accessToken, logout } = useAuth();
    const { getMovies } = useMovies();
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [modal, setModal] = useState({ type: null, data: null });
    
    const openModal = (type, data) => {
        setModal({ type, data });
    };

    useEffect(() => {
        document.title = 'Movie Application - Filmų sąrašas';

        const token = localStorage.getItem('jwtToken');  // Fallback to localStorage

        if (!token) {
            navigate('/login');
        } else {
            fetchMovies();
        }
    }, [navigate]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setModal({ type: null, data: null });
                setSuccess(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMovies();
            console.log('Movies data:', data); // Log the response
            setMovies(Array.isArray(data) ? data : []); // Make sure it's always an array
        } catch (err) {
            setError(`Klaida: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setLoading(true);
        logout();
        navigate('/');
        setLoading(false);
    };

    if (error) return <p>{error}</p>;

        return (
        <main className="content">
            <div className="dashboard-wrapper">
                <nav className="sidebar">
                    <div className="sidebar-header">
                        <h4 className="text-white">Filmų sąrašas</h4>
                    </div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link text-white">Grįžti į Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/movies" className="nav-link text-white">Filmų sąrašas</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="nav-link text-white w-100 text-start">Atsijungti</button>
                        </li>
                    </ul>
                </nav>

                <div className="main-content">
                    <div className="container-fluid p-5">
                        <h1 className="title">Filmų sąrašas</h1>
                        {/* Safe rendering: Ensure movies is always an array */}
                        {Array.isArray(movies) && movies.length > 0 ? (
                            <div className="row row-cols-1 row-cols-md-2 g-4">
                                {movies.map((movie) => (
                                    <MovieDetails
                                        key={movie.id}
                                        movie={movie}
                                        onEdit={(data) => openModal('update', data)}
                                        onDelete={(data) => openModal('delete', data)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>Nėra Filmų.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Movies;
