package MovieApplication.MovieApplication.mappers;

import MovieApplication.MovieApplication.dto.categoryDTO.CategoryCreateDTO;
import MovieApplication.MovieApplication.dto.categoryDTO.CategoryResponseDTO;
import MovieApplication.MovieApplication.dto.movieDTO.MovieResponseDTO;
import MovieApplication.MovieApplication.entities.Category;
import MovieApplication.MovieApplication.entities.Movie;

import java.time.LocalDateTime;

public class CategoryMapper {
    public static Category toEntity(CategoryCreateDTO dto) {
        Category category = new Category();
        category.setTitle(dto.getTitle());
        category.setCreated_at(LocalDateTime.now());
        return category;
    }

    public static CategoryResponseDTO toResponseDTO(Category entity) {
        CategoryResponseDTO dto = new CategoryResponseDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setUser_id(entity.getUser().getId());
        dto.setCreated_at(entity.getCreated_at());
        return dto;
    }
}
