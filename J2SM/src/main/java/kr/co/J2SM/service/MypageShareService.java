package kr.co.J2SM.service;

import kr.co.J2SM.dto.MypageShareRequestDTO;
import kr.co.J2SM.dto.MypageShareResponseDTO;
import kr.co.J2SM.entity.MypageShare;
import kr.co.J2SM.entity.MyPage;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.MypageShareRepository;
import kr.co.J2SM.repository.MyPageRepository;
import kr.co.J2SM.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

    @Transactional(readOnly = true)
    public List<MypageShareResponseDTO> findAllReceivedShares(String userId) {
        List<MypageShare> shares = mypageShareRepository.findByTargetUser_Uid(userId);
        return shares.stream()
                .map(MypageShareResponseDTO::fromEntity) // 아래 정적 메서드 참고
                .collect(Collectors.toList());
    }
}