package kr.co.J2SM.service.drive;

import kr.co.J2SM.dto.drive.DriveDTO;
import kr.co.J2SM.entity.drive.Drive;
import kr.co.J2SM.entity.drive.RecentDrive;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.mapper.drive.DriveMapper;
import kr.co.J2SM.repository.drive.DriveRepository;
import kr.co.J2SM.repository.drive.RecentDriveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriveService {

    private final DriveRepository driveRepository;
    private final RecentDriveRepository recentDriveRepository;

    // 전체 드라이브 목록 (휴지통 제외)
    public List<DriveDTO> getAllDriveFiles(User user) {

        return driveRepository.findByDeletedFalseAndUser(user.getUid())
                .stream()
                .map(DriveMapper::toDTO)
                .collect(Collectors.toList());
    }

    // 개별 파일 조회
    public DriveDTO getDriveFile(Long id) {
        Drive entity = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        return DriveMapper.toDTO(entity);
    }

    // 즐겨찾기 토글
    public void toggleFavorite(Long id) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setFavorite(!file.isFavorite());
        driveRepository.save(file);
    }

    // 파일명 변경
    public void renameFile(Long id, String newName) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setName(newName);
        driveRepository.save(file);
    }

    // 파일 삭제 (휴지통으로 이동)
    public void deleteFile(Long id) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setDeleted(true);
        driveRepository.save(file);
    }

    // 휴지통에서 복원
    public void restoreFile(Long id) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setDeleted(false);
        driveRepository.save(file);
    }

    // 파일 완전 삭제
    public void hardDeleteFile(Long id) {
        driveRepository.deleteById(id);
    }

    // 공유 드라이브로 이동
    public void moveToSharedDrive(Long id) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setLocation("공유 드라이브");
        driveRepository.save(file);
    }

    // 휴지통 목록 조회
    public List<DriveDTO> getTrashedFiles() {
        return driveRepository.findByDeletedTrueOrderByUploadedAtDesc()
                .stream()
                .map(DriveMapper::toDTO)
                .collect(Collectors.toList());
    }

    // 드라이브 업로드 저장
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
    public List<DriveDTO> getTrashedFilesByUser(String uid) {
        return driveRepository.findByDeletedTrueAndUserOrderByUploadedAtDesc(uid)
                .stream()
                .map(DriveMapper::toDTO)
                .collect(Collectors.toList());
    }


    private String getFileExtension(String filename) {
        if (filename == null) return "unknown";
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex != -1 && dotIndex < filename.length() - 1)
                ? filename.substring(dotIndex + 1).toLowerCase()
                : "unknown";
    }


    // ✅ 최근 본 드라이브 기록 저장
    public void recordRecentView(String userId, Long driveId) {
        // 중복 기록 제거
        recentDriveRepository.deleteByUserIdAndDriveFileId(userId, driveId);

        RecentDrive recent = RecentDrive.builder()
                .userId(userId)
                .driveFileId(driveId)
                .viewedAt(LocalDateTime.now())
                .build();

        recentDriveRepository.save(recent);
    }

    // ✅ 최근 본 드라이브 목록 조회
    public List<DriveDTO> getRecentDriveFiles(String userId) {
        return recentDriveRepository.findTop20ByUserIdOrderByViewedAtDesc(userId)
                .stream()
                .map(r -> {
                    Drive drive = driveRepository.findById(r.getDriveFileId()).orElse(null);
                    return drive != null ? DriveMapper.toDTO(drive) : null;
                })
                .filter(dto -> dto != null)
                .collect(Collectors.toList());
    }
    public DriveDTO createFolder(String name, String uid) {
        Drive folder = Drive.builder()
                .name(name)
                .user(uid)
                .type("folder") // 구분용
                .fileType("folder")
                .location("내 드라이브") // 하드코딩된 문자열 그대로 사용
                .uploadedAt(LocalDateTime.now())
                .favorite(false)
                .deleted(false)
                .build();

        return DriveMapper.toDTO(driveRepository.save(folder));
    }

}
