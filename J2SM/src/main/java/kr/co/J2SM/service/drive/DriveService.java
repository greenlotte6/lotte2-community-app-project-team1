package kr.co.J2SM.service.drive;

import kr.co.J2SM.dto.drive.DriveDTO;
import kr.co.J2SM.entity.drive.Drive;
import kr.co.J2SM.mapper.drive.DriveMapper;
import kr.co.J2SM.repository.drive.DriveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriveService {

    private final DriveRepository driveRepository;

    // 전체 파일 목록 조회 (휴지통 제외)
    public List<DriveDTO> getAllDriveFiles() {
        return driveRepository.findByDeletedFalse()
                .stream()
                .map(DriveMapper::toDTO)
                .collect(Collectors.toList());
    }

    // 개별 파일 정보 조회 (다운로드 포함)
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

    // 파일 이름 변경
    public void renameFile(Long id, String newName) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setName(newName);
        driveRepository.save(file);
    }

    // 파일 휴지통으로 이동 (soft delete)
    public void deleteFile(Long id) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setDeleted(true);
        driveRepository.save(file);
    }

    // (선택) 휴지통 파일 목록 조회
    public List<DriveDTO> getTrashedFiles() {
        return driveRepository.findByDeletedTrue()
                .stream()
                .map(DriveMapper::toDTO)
                .collect(Collectors.toList());
    }

    // (선택) 휴지통 복원
    public void restoreFile(Long id) {
        Drive file = driveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("파일 없음"));
        file.setDeleted(false);
        driveRepository.save(file);
    }

    // (선택) 휴지통에서 완전 삭제
    public void hardDeleteFile(Long id) {
        driveRepository.deleteById(id);
    }
}
