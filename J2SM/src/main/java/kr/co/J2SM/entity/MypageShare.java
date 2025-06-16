package kr.co.J2SM.entity;

import jakarta.persistence.*;
import kr.co.J2SM.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "MypageShare")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MypageShare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 어떤 페이지를 공유하는가
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mypageId")
    private MyPage myPage;

    // 누구에게 공유하는가
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "targetUserId", referencedColumnName = "uid")
    private User targetUser;

    // 공유한 시점
    private LocalDateTime sharedAt;

    // 누가 공유했는가 (옵션)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sharedBy", referencedColumnName = "uid")
    private User sharedBy;

    @PrePersist
    public void prePersist() {
        if(this.sharedAt == null) {
            this.sharedAt = LocalDateTime.now();
        }
    }

    // getter, setter
    public Long getId() { return id; }
    public MyPage getMyPage() { return myPage; }
    public void setMyPage(MyPage myPage) { this.myPage = myPage; }
    public User getTargetUser() { return targetUser; }
    public void setTargetUser(User targetUser) { this.targetUser = targetUser; }
    public LocalDateTime getSharedAt() { return sharedAt; }
    public void setSharedAt(LocalDateTime sharedAt) { this.sharedAt = sharedAt; }
    public User getSharedBy() { return sharedBy; }
    public void setSharedBy(User sharedBy) { this.sharedBy = sharedBy; }
}
