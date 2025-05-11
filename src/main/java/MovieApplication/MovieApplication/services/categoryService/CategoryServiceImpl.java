package MovieApplication.MovieApplication.services.categoryService;

import MovieApplication.MovieApplication.dao.CategoryRepository;
import MovieApplication.MovieApplication.dao.MovieRepository;
import MovieApplication.MovieApplication.entities.Category;
import MovieApplication.MovieApplication.entities.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(Long id) {
        Optional<Category> result = categoryRepository.findById(id);

        Category category = null;

        if(result.isPresent()) {
            category = result.get();
        }else{
            throw new RuntimeException("Could not find category by id - " + id);
        }

        return category;
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }
}
