    package kr.co.J2SM.service.drive;

    import kr.co.J2SM.dto.drive.DriveDTO;
    import kr.co.J2SM.entity.drive.Drive;
    import kr.co.J2SM.entity.drive.RecentDrive;
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

        // ───────────── 기존 내 드라이브 기능 ─────────────

        public List<DriveDTO> getAllDriveFiles(String uid) {
            return driveRepository.findByDeletedFalseAndUser(uid)
                    .stream()
                    .map(DriveMapper::toDTO)
                    .collect(Collectors.toList());
        }

        public List<DriveDTO> getDriveFilesByParent(String uid, Long parentId) {
            List<Drive> drives;
            if (parentId == null) {
                drives = driveRepository.findByUserAndParentIsNullAndDeletedFalseOrderBySortOrderAsc(uid);
            } else {
                Drive parent = driveRepository.findById(parentId)
                        .orElseThrow(() -> new IllegalArgumentException("폴더가 존재하지 않습니다."));
                drives = driveRepository.findByUserAndParentAndDeletedFalseOrderBySortOrderAsc(uid, parent);
            }
            return drives.stream()
                    .map(DriveMapper::toDTO)
                    .collect(Collectors.toList());
        }

        public void updateSortOrder(List<Long> orderedIds) {
            for (int i = 0; i < orderedIds.size(); i++) {
                Long id = orderedIds.get(i);
                Drive drive = driveRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("파일 없음: " + id));
                drive.setSortOrder(i);
            }
            driveRepository.flush();
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
            markAsDeletedRecursive(file);
        }

        private void markAsDeletedRecursive(Drive file) {
            file.setDeleted(true);
            driveRepository.save(file);
            if ("folder".equalsIgnoreCase(file.getType())) {
                List<Drive> children = driveRepository.findByParent(file);
                for (Drive child : children) {
                    markAsDeletedRecursive(child);
                }
            }
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

        public List<DriveDTO> getTrashedFilesByUser(String uid) {
            return driveRepository.findByDeletedTrueAndUserOrderByUploadedAtDesc(uid)
                    .stream()
                    .map(DriveMapper::toDTO)
                    .collect(Collectors.toList());
        }

        public void saveDrive(String uid, String originalName, String saveName, String relativePath) {
            saveDrive(uid, originalName, saveName, relativePath, null);
        }

        public void saveDrive(String uid, String originalName, String saveName, String relativePath, Long parentId) {
            Drive parent = null;
            if (parentId != null) {
                parent = driveRepository.findById(parentId).orElse(null);
            }
            Drive drive = Drive.builder()
                    .user(uid)
                    .name(originalName)
                    .originalFilename(originalName)
                    .fileType(getFileExtension(originalName))
                    .type(getFileExtension(originalName))
                    .filePath(relativePath)
                    .location("내 드라이브")
                    .uploadedAt(LocalDateTime.now())
                    .favorite(false)
                    .deleted(false)
                    .parent(parent)
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

        public void recordRecentView(String userId, Long driveId) {
            recentDriveRepository.deleteByUserIdAndDriveFileId(userId, driveId);
            RecentDrive recent = RecentDrive.builder()
                    .userId(userId)
                    .driveFileId(driveId)
                    .viewedAt(LocalDateTime.now())
                    .build();
            recentDriveRepository.save(recent);
        }

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

        public DriveDTO createFolder(String name, String uid, Long parentId) {
            Drive parent = null;
            if (parentId != null) {
                parent = driveRepository.findById(parentId)
                        .orElseThrow(() -> new IllegalArgumentException("상위 폴더가 존재하지 않습니다."));
            }
            Drive folder = Drive.builder()
                    .name(name)
                    .user(uid)
                    .type("folder")
                    .fileType("folder")
                    .location("내 드라이브")
                    .uploadedAt(LocalDateTime.now())
                    .favorite(false)
                    .deleted(false)
                    .parent(parent)
                    .build();
            return DriveMapper.toDTO(driveRepository.save(folder));
        }

        // ───────────── 공유 드라이브 전용 ─────────────

        /**
         * 공유 드라이브 파일/폴더 목록 조회
         * @param parentId 상위 폴더 ID (null 이면 최상위 공유 드라이브)
         * @return 공유 드라이브 항목 리스트
         */
        public List<DriveDTO> getSharedFilesByParent(Long parentId) {
            List<Drive> drives;
            if (parentId == null) {
                drives = driveRepository
                        .findByLocationAndParentIsNullAndDeletedFalseOrderBySortOrderAsc("공유 드라이브");
            } else {
                Drive parent = driveRepository.findById(parentId)
                        .orElseThrow(() -> new IllegalArgumentException("폴더 없음: " + parentId));
                drives = driveRepository
                        .findByLocationAndParentAndDeletedFalseOrderBySortOrderAsc("공유 드라이브", parent);
            }
            return drives.stream()
                    .map(DriveMapper::toDTO)
                    .collect(Collectors.toList());
        }
        public void unshareDrive(Long id) {
            Drive file = driveRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("파일 없음: " + id));
            file.setLocation("내 드라이브");
            driveRepository.save(file);
        }
    }
