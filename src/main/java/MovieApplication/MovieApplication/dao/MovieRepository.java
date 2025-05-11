package MovieApplication.MovieApplication.dao;

import MovieApplication.MovieApplication.entities.Category;
import MovieApplication.MovieApplication.entities.Movie;
import MovieApplication.MovieApplication.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> getMoviesByCategory(Category category);
    List<Movie> getMoviesByUser(User user);
}
