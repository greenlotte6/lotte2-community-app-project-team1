package kr.co.J2SM.service.drive;

import kr.co.J2SM.dto.drive.DriveDTO;
import kr.co.J2SM.entity.drive.Drive;
import kr.co.J2SM.mapper.drive.DriveMapper;
import kr.co.J2SM.repository.drive.DriveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriveService {

    private final DriveRepository driveRepository;

    public List<DriveDTO> getAllDriveFiles() {
        return driveRepository.findByDeletedFalse()
                .stream()
                .map(DriveMapper::toDTO)
                .collect(Collectors.toList());
    }

    public DriveDTO getDriveFile(Long id) {
        Drive entity = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        return DriveMapper.toDTO(entity);
    }

    public void toggleFavorite(Long id) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setFavorite(!file.isFavorite());
        driveRepository.save(file);
    }

    public void renameFile(Long id, String newName) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setName(newName);
        driveRepository.save(file);
    }

    public void deleteFile(Long id) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setDeleted(true);
        driveRepository.save(file);
    }

    public void restoreFile(Long id) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setDeleted(false);
        driveRepository.save(file);
    }

    public void hardDeleteFile(Long id) {
        driveRepository.deleteById(id);
    }

    public void moveToSharedDrive(Long id) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setLocation("공유 드라이브");
        driveRepository.save(file);
    }

    public List<DriveDTO> getTrashedFiles() {
        return driveRepository.findByDeletedTrueOrderByUploadedAtDesc()
                .stream()
                .map(DriveMapper::toDTO)
                .collect(Collectors.toList());
    }

    // ✅ 업로드 후 DB 저장 로직
    public void saveDrive(String user, String originalName, String saveName, String relativePath) {
        Drive drive = Drive.builder()
                .user(user)
                .name(originalName)
                .originalFilename(originalName)
                .fileType(getFileExtension(originalName))
                .type(getFileExtension(originalName))
                .filePath(relativePath)
                .location("내 드라이브")
                .uploadedAt(LocalDateTime.now())
                .favorite(false)
                .deleted(false)
                .build();

        driveRepository.save(drive);
    }

    private String getFileExtension(String filename) {
        if (filename == null) return "unknown";
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex != -1 && dotIndex < filename.length() - 1)
                ? filename.substring(dotIndex + 1).toLowerCase()
                : "unknown";
    }
}
