package kr.co.J2SM.controller;

import jakarta.servlet.http.HttpServletResponse;
import kr.co.J2SM.dto.drive.DriveDTO;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.drive.DriveRepository;
import kr.co.J2SM.service.UserService;
import kr.co.J2SM.service.drive.DriveService;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.text.Normalizer;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/drive")
@RequiredArgsConstructor
public class DriveController {

    private final DriveService driveService;
    private final DriveRepository driveRepository;
    private final UserService userService;

    private static final long MAX_FREE_FILE_SIZE = 5 * 1024 * 1024;

    @GetMapping
    public List<DriveDTO> listFiles(@AuthenticationPrincipal User user,
                                    @RequestParam(value = "parentId", required = false) Long parentId) {
        log.info("📥 listFiles: uid={}, parentId={}", user.getUid(), parentId);
        return driveService.getDriveFilesByParent(user.getUid(), parentId);
    }

    @PatchMapping("/reorder")
    public ResponseEntity<?> updateSortOrder(@RequestBody List<Long> orderedIds) {
        driveService.updateSortOrder(orderedIds);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws IOException {
        DriveDTO dto = driveService.getDriveFile(id);
        Path rawPath = Paths.get(dto.getFilePath());
        Path filePath = rawPath.isAbsolute() ? rawPath : Paths.get(System.getProperty("user.dir")).resolve(rawPath).normalize();

        if (!Files.exists(filePath) || !Files.isReadable(filePath)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Resource resource = new UrlResource(filePath.toUri());
        String contentType = Files.probeContentType(filePath);
        if (contentType == null) contentType = "application/octet-stream";

        String originalFilename = dto.getOriginalFilename();
        String encodedFilename = encodeFilenameRFC5987(originalFilename);

        String fallback = Normalizer.normalize(originalFilename, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .replaceAll("[^a-zA-Z0-9._-]", "_");

        if (fallback.isBlank() || fallback.startsWith(".")) {
            String ext = getFileExtension(originalFilename);
            fallback = "download-" + UUID.randomUUID().toString().substring(0, 8) + ext;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fallback + "\"; filename*=UTF-8''" + encodedFilename);
        headers.add(HttpHeaders.CONTENT_TYPE, contentType);

        return ResponseEntity.ok().headers(headers).body(resource);
    }

    @GetMapping("/download/zip")
    public void downloadZip(@RequestParam List<Long> ids, HttpServletResponse response) {
        try {
            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment; filename=\"files.zip\"");

            try (ZipOutputStream zos = new ZipOutputStream(response.getOutputStream())) {
                for (Long id : ids) {
                    DriveDTO fileDTO = driveService.getDriveFile(id);
                    Path filePath = Paths.get(fileDTO.getFilePath());

                    if (Files.exists(filePath)) {
                        // ✅ 원본 파일 이름 사용
                        String originalName = fileDTO.getOriginalFilename();
                        ZipEntry zipEntry = new ZipEntry(originalName);
                        zos.putNextEntry(zipEntry);
                        Files.copy(filePath, zos);
                        zos.closeEntry();
                    }
                }
                zos.finish();
            }
        } catch (IOException e) {
            log.error("ZIP 다운로드 실패", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private String encodeFilenameRFC5987(String filename) {
        return URLEncoder.encode(filename, StandardCharsets.UTF_8)
                .replaceAll("\\+", "%20")
                .replaceAll("%21", "!")
                .replaceAll("%27", "'")
                .replaceAll("%28", "(")
                .replaceAll("%29", ")")
                .replaceAll("%7E", "~");
    }

    private String getFileExtension(String filename) {
        if (filename == null) return "";
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex != -1 && dotIndex < filename.length() - 1) ? filename.substring(dotIndex) : "";
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                        @RequestParam("user") String username,
                                        @RequestParam("originalName") String originalName,
                                        @RequestParam(value = "parentId", required = false) Long parentId) {
        try {
            User uploader = userService.findByUsername(username);
            long fileSize = file.getSize();

            if ("FREE".equalsIgnoreCase(uploader.getMembership()) && fileSize > MAX_FREE_FILE_SIZE) {
                return ResponseEntity.badRequest().body("무료 회원은 5MB 이하의 파일만 업로드할 수 있습니다.");
            }

            String uuid = UUID.randomUUID().toString();
            String saveName = uuid + "-" + originalName;

            String uploadDir = System.getProperty("user.dir") + "/uploads";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

            Path savePath = uploadPath.resolve(saveName);
            file.transferTo(savePath.toFile());

            String relativePath = "uploads/" + saveName;

            // 🔥 실제 UID로 저장
            driveService.saveDrive(uploader.getUid(), originalName, saveName, relativePath, parentId);

            return ResponseEntity.ok().build();

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원 정보 조회 실패");
        }
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

    @PatchMapping("/{id}/move-to-shared")
    public ResponseEntity<Void> moveToSharedDrive(@PathVariable Long id) {
        driveService.moveToSharedDrive(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/recent")
    public List<DriveDTO> getRecentViews(@RequestParam String uid) {
        return driveService.getRecentDriveFiles(uid);
    }

    @PostMapping("/view/{id}")
    public ResponseEntity<?> recordView(@PathVariable Long id, @RequestParam String uid) {
        driveService.recordRecentView(uid, id);
        return ResponseEntity.ok().build();
    }

    public static class RenameRequest {
        private String name;
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    @PostMapping("/folder")
    public ResponseEntity<DriveDTO> createFolder(@RequestBody Map<String, String> body,
                                                 @AuthenticationPrincipal User user) {
        String folderName = body.get("name");
        String parentIdStr = body.get("parentId");

        if (folderName == null || folderName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        Long parentId = null;
        if (parentIdStr != null && !parentIdStr.trim().isEmpty()) {
            try {
                parentId = Long.parseLong(parentIdStr);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body(null);
            }
        }

        DriveDTO folder = driveService.createFolder(folderName, user.getUid(), parentId);
        return ResponseEntity.ok(folder);
    }
}

