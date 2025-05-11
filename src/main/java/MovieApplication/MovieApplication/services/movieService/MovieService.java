package MovieApplication.MovieApplication.services.movieService;

import MovieApplication.MovieApplication.entities.Movie;

import java.util.List;

public interface MovieService {
    List<Movie> findAll();

    Movie findById(Long id);

    Movie save(Movie movie);

    void deleteById(Long id);

    List<Movie> getMoviesByCategory(Long categoryId);

    List<Movie> getMoviesByUser();
}
