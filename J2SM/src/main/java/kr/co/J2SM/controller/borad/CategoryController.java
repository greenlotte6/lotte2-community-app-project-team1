package kr.co.J2SM.controller.borad;


import kr.co.J2SM.dto.board.CategoryDTO;
import kr.co.J2SM.service.board.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/company/{companyId}")
    public List<CategoryDTO> getByCompany(@PathVariable int companyId) {
        return categoryService.getCategoriesByCompany(companyId);
    }

    @PostMapping("/company/{companyId}")
    public CategoryDTO createCategory(@PathVariable int companyId,
                                      @RequestBody CategoryDTO dto) {
        return categoryService.createCategory(dto, companyId);
    }
}