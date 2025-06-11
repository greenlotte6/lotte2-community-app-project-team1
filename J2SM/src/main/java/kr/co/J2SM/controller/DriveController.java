package kr.co.J2SM.controller;

import jakarta.servlet.http.HttpServletResponse;
import kr.co.J2SM.dto.drive.DriveDTO;
import kr.co.J2SM.entity.drive.Drive;
import kr.co.J2SM.repository.drive.DriveRepository;
import kr.co.J2SM.service.drive.DriveService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/drive")
@RequiredArgsConstructor
public class DriveController {

    private final DriveService driveService;
    private final DriveRepository driveRepository;

    // 파일 전체 목록 조회 (휴지통 제외)
    @GetMapping
    public List<DriveDTO> listFiles() {
        return driveService.getAllDriveFiles();
    }

    // 파일 다운로드
    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws IOException {
        DriveDTO dto = driveService.getDriveFile(id);

        Path filePath = Paths.get(dto.getFilePath());
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new FileNotFoundException("파일을 찾을 수 없습니다.");
        }

        String encodedFilename = URLEncoder.encode(dto.getOriginalFilename(), StandardCharsets.UTF_8)
                .replace("+", "%20");

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + encodedFilename + "\"; filename*=UTF-8''" + encodedFilename)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    // 즐겨찾기 토글
    @PatchMapping("/{id}/favorite")
    public ResponseEntity<Void> toggleFavorite(@PathVariable Long id) {
        driveService.toggleFavorite(id);
        return ResponseEntity.ok().build();
    }

    // 이름 변경
    @PatchMapping("/{id}/rename")
    public ResponseEntity<Void> renameFile(@PathVariable Long id, @RequestBody RenameRequest request) {
        driveService.renameFile(id, request.getName());
        return ResponseEntity.ok().build();
    }

    // 휴지통으로 이동 (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> moveToTrash(@PathVariable Long id) {
        driveService.deleteFile(id);
        return ResponseEntity.ok().build();
    }

    // 휴지통 목록 조회
    @GetMapping("/trash")
    public List<DriveDTO> trashFiles() {
        return driveService.getTrashedFiles();
    }

    // 휴지통 복원
    @PutMapping("/{id}/restore")
    public ResponseEntity<Void> restoreFile(@PathVariable Long id) {
        driveService.restoreFile(id);
        return ResponseEntity.ok().build();
    }

    // 휴지통에서 완전 삭제
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> hardDeleteFile(@PathVariable Long id) {
        driveService.hardDeleteFile(id);
        return ResponseEntity.ok().build();
    }

    // 이름 변경용 DTO
    public static class RenameRequest {
        private String name;
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    // 파일 업로드
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                        @RequestParam("user") String user)  {
        try {
            System.out.println("업로드 시도: " + file.getOriginalFilename());

            String uuid = UUID.randomUUID().toString();
            String originalName = file.getOriginalFilename();
            String saveName = uuid + "-" + originalName;
            String uploadDir = "uploads";

            Path savePath = Paths.get(uploadDir + saveName);
            file.transferTo(savePath.toFile());

            String fileType = getFileExtension(originalName);

            Drive drive = new Drive();
            drive.setDeleted(false);
            drive.setFavorite(false);
            drive.setFilePath(savePath.toString());
            drive.setLocation("내 드라이브");
            drive.setName(originalName);
            drive.setOriginalFilename(originalName);
            drive.setType(fileType);
            drive.setUploadedAt(LocalDateTime.now());
            drive.setUser(user);



            driveRepository.save(drive);

            System.out.println("파일 업로드 및 저장 완료: " + originalName);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            e.printStackTrace(); // 👈 실제 예외 메시지 확인 가능
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");
        }
    }


    // 확장자 추출 유틸 메서드
    private String getFileExtension(String filename) {
        if (filename == null) return "unknown";
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex != -1 && dotIndex < filename.length() - 1)
                ? filename.substring(dotIndex + 1).toLowerCase()
                : "unknown";
    }
}
