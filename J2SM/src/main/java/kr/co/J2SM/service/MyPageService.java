package kr.co.J2SM.service;

import kr.co.J2SM.dto.MyPageDTO;
import kr.co.J2SM.entity.MyPage;
import kr.co.J2SM.repository.MyPageRepository;
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
    private final MyPageRepository myPageRepository;

    public void save(MyPageDTO myPageDTO) {

        log.info("==> 저장 요청 들어옴: {}", myPageDTO);  // 추가

        MyPage entity = MyPage.builder()
                .userId(myPageDTO.getUserId())
                .content(myPageDTO.getContent())
                .isFavorite(myPageDTO.isFavorite())
                .shared(myPageDTO.isShared())
                .createdAt(LocalDateTime.now())
                .title(myPageDTO.getTitle())
                .isDeleted(false)
                .build();

        myPageRepository.save(entity);
    }
    // ✅ 휴지통 이동 (soft delete)
    @Transactional
    public void softDelete(Long  id) {
        myPageRepository.findById(id).ifPresent(page -> {
            page.setDeleted(true);
            myPageRepository.save(page);
        });
    }

    // 🔁 휴지통에서 복원
    @Transactional
    public void restore(Long  id) {
        myPageRepository.findById(id).ifPresent(page -> {
            page.setDeleted(false);
            myPageRepository.save(page);
        });
    }

    // ❌ 완전 삭제
    @Transactional
    public void deletePermanently(Long  id) {
        myPageRepository.deleteById(id);
    }

    // 📋 전체 목록 (삭제 안 된 것만)
    public List<MyPageDTO> getAllActivePages() {
        return myPageRepository.findAll().stream()
                .filter(p -> !p.isDeleted())
                .map(p -> modelMapper.map(p, MyPageDTO.class))
                .collect(Collectors.toList());
    }

    // 🗑 휴지통 목록
    public List<MyPageDTO> getTrashedPages() {
        return myPageRepository.findAll().stream()
                .filter(MyPage::isDeleted)
                .map(p -> modelMapper.map(p, MyPageDTO.class))
                .collect(Collectors.toList());
    }

    // 🔍 ID로 가져오기
    public Optional<MyPageDTO> findById(Long  id) {
        return myPageRepository.findById(id)
                .map(p -> modelMapper.map(p, MyPageDTO.class));
    }

}
