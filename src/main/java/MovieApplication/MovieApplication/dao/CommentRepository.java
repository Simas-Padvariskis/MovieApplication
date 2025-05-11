package MovieApplication.MovieApplication.dao;

import MovieApplication.MovieApplication.entities.Comment;
import MovieApplication.MovieApplication.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByMovieId(Long movieId);
}
