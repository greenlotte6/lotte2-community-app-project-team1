package kr.co.J2SM.service.board;

import jakarta.transaction.Transactional;
import kr.co.J2SM.dto.board.CategoryDTO;
import kr.co.J2SM.entity.board.Category;
import kr.co.J2SM.entity.company.Company;
import kr.co.J2SM.repository.board.BoardRepository;
import kr.co.J2SM.repository.board.CategoryRepository;
import kr.co.J2SM.repository.company.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final BoardRepository boardRepository;
    private final CompanyRepository companyRepository;
    private final ModelMapper modelMapper;

    public CategoryDTO createCategory(CategoryDTO dto, int companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("회사 정보가 존재하지 않습니다."));

        Category category = Category.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .company(company)
                .build();

        Category saved = categoryRepository.save(category);
        return modelMapper.map(saved, CategoryDTO.class);
    }

    public List<CategoryDTO> getCategoriesByCompany(int companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("회사 정보가 존재하지 않습니다."));

        List<Category> categories = categoryRepository.findByCompany(company);
        return categories.stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다."));

        // 관련된 게시물 삭제
        boardRepository.deleteByCategory((category));

        categoryRepository.delete(category); // 연관된 게시글이 있으면 Cascade 설정 필요
    }
}
