package kr.co.J2SM.controller.borad;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import kr.co.J2SM.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/boards/files")
@RequiredArgsConstructor
public class BoardFileController {

    private final CustomFileUtil customFileUtil;

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        log.info("Downloading file: " + fileName);
        return customFileUtil.getFile(fileName);
    }
}
