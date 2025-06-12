package kr.co.J2SM.controller;

import kr.co.J2SM.dto.drive.DriveDTO;
import kr.co.J2SM.entity.drive.Drive;
import kr.co.J2SM.repository.drive.DriveRepository;
import kr.co.J2SM.service.drive.DriveService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
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

    @GetMapping
    public List<DriveDTO> listFiles() {
        return driveService.getAllDriveFiles();
    }

    // ✅ 한글 파일명 문제 해결
    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws IOException {
        DriveDTO dto = driveService.getDriveFile(id);
        Path filePath = Paths.get(dto.getFilePath());

        Resource resource = new UrlResource(filePath.toUri());
        if (!resource.exists() || !resource.isReadable()) {
            throw new FileNotFoundException("파일을 찾을 수 없습니다.");
        }

        String contentType = Files.probeContentType(filePath);
        if (contentType == null) contentType = "application/octet-stream";

        String originalName = dto.getOriginalFilename();
        String encodedFilename = URLEncoder.encode(originalName, StandardCharsets.UTF_8).replace("+", "%20");

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename*=UTF-8''" + encodedFilename); // ✅ fallback 완전히 제거

        headers.add(HttpHeaders.CONTENT_TYPE, contentType);

        return ResponseEntity.ok().headers(headers).body(resource);
    }


    @PatchMapping("/{id}/favorite")
    public ResponseEntity<Void> toggleFavorite(@PathVariable Long id) {
        driveService.toggleFavorite(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/rename")
    public ResponseEntity<Void> renameFile(@PathVariable Long id, @RequestBody RenameRequest request) {
        driveService.renameFile(id, request.getName());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> moveToTrash(@PathVariable Long id) {
        driveService.deleteFile(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/trash")
    public List<DriveDTO> trashFiles() {
        return driveService.getTrashedFiles();
    }

    @PutMapping("/{id}/restore")
    public ResponseEntity<Void> restoreFile(@PathVariable Long id) {
        driveService.restoreFile(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> hardDeleteFile(@PathVariable Long id) {
        driveService.hardDeleteFile(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                        @RequestParam("user") String user) {
        try {
            String uuid = UUID.randomUUID().toString();
            String originalName = file.getOriginalFilename();
            String saveName = uuid + "-" + originalName;

            String uploadDir = System.getProperty("user.dir") + "/uploads";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path savePath = uploadPath.resolve(saveName);
            file.transferTo(savePath.toFile());

            Drive drive = new Drive();
            drive.setUser(user);
            drive.setName(originalName);
            drive.setOriginalFilename(originalName);
            drive.setFilePath(savePath.toString());
            drive.setFileType(getFileExtension(originalName));
            drive.setType(getFileExtension(originalName));
            drive.setLocation("내 드라이브");
            drive.setUploadedAt(LocalDateTime.now());
            drive.setFavorite(false);
            drive.setDeleted(false);

            driveRepository.save(drive);

            return ResponseEntity.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");
        }
    }

    @PatchMapping("/{id}/move-to-shared")
    public ResponseEntity<Void> moveToSharedDrive(@PathVariable Long id) {
        driveService.moveToSharedDrive(id);
        return ResponseEntity.ok().build();
    }

    public static class RenameRequest {
        private String name;
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    private String getFileExtension(String filename) {
        if (filename == null) return "unknown";
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex != -1 && dotIndex < filename.length() - 1)
                ? filename.substring(dotIndex + 1).toLowerCase()
                : "unknown";
    }
}
