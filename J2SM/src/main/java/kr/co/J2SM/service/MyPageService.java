package kr.co.J2SM.service;

import kr.co.J2SM.dto.MyPageDTO;
import kr.co.J2SM.entity.MyPage;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.MyPageRepository;
import kr.co.J2SM.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MyPageService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final MyPageRepository myPageRepository;

    @Transactional
    public void save(MyPageDTO myPageDTO) {
        User user = userRepository.findById(String.valueOf(myPageDTO.getUserId()))
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        MyPage entity;
        if (myPageDTO.getId() != null) {
            // 기존 데이터 수정
            entity = myPageRepository.findById(myPageDTO.getId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 페이지입니다."));
            entity.setUser(user);
            entity.setContent(myPageDTO.getContent());
            entity.setTitle(myPageDTO.getTitle());
            entity.setFavorite(myPageDTO.isFavorite());
            entity.setShared(myPageDTO.isShared());
            // entity.setCreatedAt(LocalDateTime.now()); // createdAt은 최초 1회만 세팅
            entity.setDeleted(false); // 저장시에는 무조건 복원상태
            // 변경감지(dirty checking)로 자동 update


        } else {
            // 새로 생성
            entity = MyPage.builder()
                    .user(user)
                    .content(myPageDTO.getContent())
                    .isFavorite(myPageDTO.isFavorite())
                    .shared(myPageDTO.isShared())
                    .createdAt(LocalDateTime.now())
                    .title(myPageDTO.getTitle())
                    .isDeleted(false)
                    .build();
            myPageRepository.save(entity);
        }
    }
    // ✅ 휴지통 이동 (soft delete)
    @Transactional
    public void softDelete(Long  id) {
        myPageRepository.softDelete(id);
    }

    // 🔁 휴지통에서 복원
    @Transactional
    public void restore(Long  id) {
        myPageRepository.restore(id);
    }

    // ❌ 완전 삭제
    @Transactional
    public void deletePermanently(Long  id) {
        myPageRepository.deleteById(id);
    }

    public List<MyPageDTO> getAllActivePages() {
        return myPageRepository.findAllActive().stream()
                .map(MyPageDTO::fromEntity) // ✅ 직접 매핑
                .collect(Collectors.toList());
    }

    public List<MyPageDTO> getTrashedPages() {
        return myPageRepository.findAllTrashed().stream()
                .map(MyPageDTO::fromEntity) // ✅ 동일하게 수정
                .collect(Collectors.toList());
    }

    // 🔍 ID로 가져오기
    public Optional<MyPageDTO> findById(Long  id) {
        return myPageRepository.findById(id)
                .map(p -> modelMapper.map(p, MyPageDTO.class));
    }

    public List<MyPageDTO> getAllActivePagesByUser(String userId) {
        return myPageRepository.findAllActiveByUser(userId)
                .stream()
                .map(MyPageDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<MyPageDTO> getTrashedPagesByUser(String userId) {
        return myPageRepository.findAllTrashedByUser(userId)
                .stream()
                .map(MyPageDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<MyPageDTO> getFavoritePagesByUser(String userId) {
        return myPageRepository.findAllFavoriteByUser(userId)
                .stream()
                .map(MyPageDTO::fromEntity)
                .collect(Collectors.toList());
    }

}
