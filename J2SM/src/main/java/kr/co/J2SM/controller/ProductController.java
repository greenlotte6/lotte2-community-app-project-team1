package kr.co.J2SM.controller;

import kr.co.J2SM.dto.PageRequestDTO;
import kr.co.J2SM.dto.PageResponseDTO;
import kr.co.J2SM.dto.ProductDTO;
import kr.co.J2SM.service.ProductService;
import kr.co.J2SM.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;


@Log4j2
@RequiredArgsConstructor
@RestController
public class ProductController {

    private final ProductService productService;
    private final CustomFileUtil fileUtil;

    @GetMapping("/product")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO){
        log.info("pageRequestDTO : " + pageRequestDTO);

        PageResponseDTO<ProductDTO> pageResponseDTO = productService.list(pageRequestDTO);
        log.info("pageResponseDTO : " + pageResponseDTO);

        return pageResponseDTO;
    }

    @PostMapping("/product")
    public ResponseEntity<Map<String, Integer>> register(ProductDTO productDTO){
        log.info(productDTO);

        List<MultipartFile> files = productDTO.getThumbFiles();

        Map<String, String> uploadFileNames = fileUtil.saveFiles(files);
        productDTO.setThumbNames(uploadFileNames);

        int pno = productService.register(productDTO);

        return ResponseEntity.ok(Map.of("pno", pno));
    }

    @GetMapping("/product/thumb/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName){
        return fileUtil.getFile(fileName);
    }

}
