package kr.co.J2SM.service;

import kr.co.J2SM.dto.MypageShareRequestDTO;
import kr.co.J2SM.entity.MypageShare;
import kr.co.J2SM.entity.MyPage;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.MypageShareRepository;
import kr.co.J2SM.repository.MyPageRepository;
import kr.co.J2SM.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageShareService {

    private final MypageShareRepository mypageShareRepository;
    private final MyPageRepository myPageRepository;
    private final UserRepository userRepository;

    // 공유 저장
    public void shareMypage(MypageShareRequestDTO dto) {
        MyPage myPage = myPageRepository.findById(dto.getMypageId())
                .orElseThrow(() -> new RuntimeException("MyPage not found"));
        User sharedByUser = userRepository.findById(dto.getSharedBy())
                .orElseThrow(() -> new RuntimeException("공유한 사용자 없음"));

        for (String uid : dto.getTargetUserIds()) {
            User targetUser = userRepository.findById(uid)
                    .orElseThrow(() -> new RuntimeException("공유 대상 유저 없음: " + uid));

            MypageShare share = MypageShare.builder()
                    .myPage(myPage)
                    .targetUser(targetUser)
                    .sharedBy(sharedByUser)
                    .build();
            mypageShareRepository.save(share);
        }
        // 플래그도 true로
        myPage.setShared(true);
        myPageRepository.save(myPage);
    }
}