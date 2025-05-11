package MovieApplication.MovieApplication.controllers;

import MovieApplication.MovieApplication.dto.categoryDTO.CategoryResponseDTO;
import MovieApplication.MovieApplication.dto.commentDTO.CommentCreateDTO;
import MovieApplication.MovieApplication.dto.commentDTO.CommentResponseDTO;
import MovieApplication.MovieApplication.entities.Comment;
import MovieApplication.MovieApplication.entities.Movie;
import MovieApplication.MovieApplication.entities.User;
import MovieApplication.MovieApplication.mappers.CategoryMapper;
import MovieApplication.MovieApplication.mappers.CommentMapper;
import MovieApplication.MovieApplication.security.services.UserDetailsImpl;
import MovieApplication.MovieApplication.services.commentService.CommentService;
import MovieApplication.MovieApplication.services.movieService.MovieService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {
    private final CommentService commentService;
    private final MovieService movieService;

    @Autowired
    public CommentController(CommentService commentService, MovieService movieService) {
        this.commentService = commentService;
        this.movieService = movieService;
    }

    // Return all comments
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllComments() {
        List<CommentResponseDTO> comments;

        comments = commentService.findAll()
                .stream()
                .map(CommentMapper::toResponse)
                .collect(Collectors.toList());

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "success");
        response.put("results", comments.size());
        response.put("data", comments);

        return ResponseEntity.ok(response);
    }

    // Return all comments from movie_id
    @GetMapping("/movies/{movieId}")
    public ResponseEntity<List<CommentResponseDTO>> getCommentsByMovieId(@PathVariable Long movieId) {
        List<Comment> comments = commentService.findByMovieId(movieId);
        List<CommentResponseDTO> response = comments.stream()
                .map(CommentMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    // Create new comment
    @PostMapping
    public ResponseEntity<CommentResponseDTO> addComment(@Valid @RequestBody CommentCreateDTO commentDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = new User(userDetails.getUsername(), userDetails.getEmail(), userDetails.getPassword());
        user.setId(userDetails.getId());

        Movie movie = movieService.findById(commentDTO.getMovie_id());
        Comment comment = CommentMapper.toEntity(commentDTO, movie);
        comment.setUser(user);
        Comment saved = commentService.save(comment);
        return ResponseEntity.ok(CommentMapper.toResponse(saved));
    }

    //Delete comment by id
    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId){
        Comment theComment = commentService.findById(commentId);

        if(theComment == null){
            return ResponseEntity.notFound().build();
        }

        commentService.deleteById(commentId);

        return ResponseEntity.ok("Deleted comment with id - " + commentId);
    }
}
