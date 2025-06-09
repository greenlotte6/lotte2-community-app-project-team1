package kr.co.J2SM.service;

import kr.co.J2SM.dto.MyPageDTO;
import kr.co.J2SM.entity.MyPage;
import kr.co.J2SM.repository.MyPageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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
                .build();

        myPageRepository.save(entity);
    }

}
