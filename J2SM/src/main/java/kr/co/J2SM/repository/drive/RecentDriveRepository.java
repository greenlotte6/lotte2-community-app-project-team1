package kr.co.J2SM.repository.drive;

import kr.co.J2SM.entity.drive.RecentDrive;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecentDriveRepository extends JpaRepository<RecentDrive, Long> {

    List<RecentDrive> findTop20ByUserIdOrderByViewedAtDesc(String userId);

    void deleteByUserIdAndDriveFileId(String userId, Long driveFileId);
}
