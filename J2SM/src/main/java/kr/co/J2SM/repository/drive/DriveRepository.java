package kr.co.J2SM.repository.drive;

import kr.co.J2SM.entity.drive.Drive;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DriveRepository extends JpaRepository<Drive, Long> {

    // ✅ 삭제되지 않은 전체 파일
    List<Drive> findByDeletedFalse();

    // ✅ 특정 유저의 삭제되지 않은 파일
    List<Drive> findByDeletedFalseAndUser(String user);

    // ✅ 특정 유저의 삭제된 파일
    List<Drive> findByDeletedTrueAndUserOrderByUploadedAtDesc(String user);

    // ✅ 전체 삭제 파일 (휴지통)
    List<Drive> findByDeletedTrueOrderByUploadedAtDesc();

    // ✅ 특정 폴더의 자식 목록 (삭제여부 무관)
    List<Drive> findByParent(Drive parent);

    // ✅ 특정 폴더의 자식 목록 (삭제되지 않은 것만 + 순서 정렬)
    List<Drive> findByParentAndDeletedFalseOrderBySortOrderAsc(Drive parent);

    // ✅ 루트 폴더(부모 없는) 파일 목록 정렬
    List<Drive> findByParentIsNullAndDeletedFalseOrderBySortOrderAsc();

    // ✅ 특정 유저 + 특정 폴더 하위 정렬 조회 (선택)
    List<Drive> findByUserAndParentAndDeletedFalseOrderBySortOrderAsc(String user, Drive parent);

    // ✅ 특정 유저의 루트 폴더 목록 정렬 조회 (선택)
    List<Drive> findByUserAndParentIsNullAndDeletedFalseOrderBySortOrderAsc(String user);

    // ───────────── 공유 드라이브 전용 ─────────────

    /**
     * 루트(부모 없는) 공유 드라이브 파일/폴더 목록 조회
     * @param location "공유 드라이브"
     */
    List<Drive> findByLocationAndParentIsNullAndDeletedFalseOrderBySortOrderAsc(String location);

    /**
     * 특정 폴더의 하위 공유 드라이브 파일/폴더 목록 조회
     * @param location "공유 드라이브"
     * @param parent 상위 폴더 엔티티
     */
    List<Drive> findByLocationAndParentAndDeletedFalseOrderBySortOrderAsc(String location, Drive parent);
}
