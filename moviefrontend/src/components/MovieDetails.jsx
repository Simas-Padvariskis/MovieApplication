const MovieDetails = ({ movie, onEdit, onDelete }) => {
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{movie.title || 'Be pavadinimo'}</h5>
                    <p className="card-text">
                        <strong>Aprašymas:</strong> {movie.description || 'Nėra aprašymo'}<br />
                        <strong>IMDB reitingas:</strong> {movie.imdb_rating || 'Nėra IMDB reitingo'}<br />
                        <strong>Kategorija:</strong> {movie.category_id || 'Nėra kategorijos'}<br />
                    </p>
                    <div className="card-actions">
                        {/* Removed the undefined onTasks */}
                        <button onClick={() => onEdit(movie)} className="btn btn-sm btn-warning">Redaguoti</button>
                        <button onClick={() => onDelete(movie)} className="btn btn-sm btn-danger">Ištrinti</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
