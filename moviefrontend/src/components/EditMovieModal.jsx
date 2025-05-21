import { useState, useEffect } from 'react';

const EditMovieModal = ({ movie, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imdb_rating: '',
        category_id: ''
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (movie) {
            setFormData({
                title: movie.title || '',
                description: movie.description || '',
                imdb_rating: movie.imdb_rating || '',
                category_id: movie.category?.id || ''
            });
        }
    }, [movie]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/v1/categories');
                const data = await res.json();
                setCategories(data.data);  // Assumes { data: [...] }
            } catch (err) {
                console.error('Failed to load categories:', err);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...movie, ...formData });
    };

    return (
        <div className="edit-modal-backdrop">
            <div className="edit-modal-content">
                <h5>Redaguoti filmą</h5>
                <form onSubmit={handleSubmit} className="edit-form">
                    <label>Pavadinimas</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <label>Aprašymas</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <label>IMDB reitingas</label>
                    <input
                        type="number"
                        step="0.1"
                        name="imdb_rating"
                        value={formData.imdb_rating}
                        onChange={handleChange}
                    />
                    <label>Kategorija</label>
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                    >
                        <option value="">-- Pasirinkti kategoriją --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                    <div className="actions">
                        <button type="submit" className="btn btn-primary">Išsaugoti</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Atšaukti</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMovieModal;
