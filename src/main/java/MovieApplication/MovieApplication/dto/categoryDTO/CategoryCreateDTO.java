package MovieApplication.MovieApplication.dto.categoryDTO;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

public class CategoryCreateDTO {
    @NotBlank(message = "Category must have a title")
    private String title;


    //Getters and setters


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
