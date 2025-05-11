package MovieApplication.MovieApplication.dao;

import MovieApplication.MovieApplication.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Boolean existsByTitle(String title);
}
