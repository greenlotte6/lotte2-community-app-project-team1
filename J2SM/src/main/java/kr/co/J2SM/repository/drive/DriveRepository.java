package kr.co.J2SM.repository.drive;

import kr.co.J2SM.entity.drive.Drive;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface DriveRepository extends JpaRepository<Drive, Long> {


    // 삭제 안 된 파일 목록
    List<Drive> findByDeletedFalse();

    // 삭제(휴지통)된 파일 목록
    List<Drive> findByDeletedTrueOrderByUploadedAtDesc();

    Collection<Object> findByDeletedTrueOrderByUploadedAtDesc(boolean deleted);
}
