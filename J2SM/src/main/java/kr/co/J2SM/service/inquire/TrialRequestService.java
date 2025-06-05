package kr.co.J2SM.service.inquire;

import kr.co.J2SM.dto.inquire.TrialRequestDTO;

import kr.co.J2SM.entity.inquire.TrialRequest;

import kr.co.J2SM.repository.inquire.TrialRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TrialRequestService {

    private final kr.co.J2SM.repository.inquire.TrialRequestRepository repository;

    public void saveInquiry(TrialRequestDTO dto) {
        kr.co.J2SM.entity.inquire.TrialRequest entity = kr.co.J2SM.entity.inquire.TrialRequest.builder()
                .company(dto.getCompany())
                .industry(dto.getIndustry())
                .name(dto.getName())
                .email(dto.getEmail())
                .memo(dto.getMemo())
                .pass(dto.getPass())
                .status("문의중")
                .wdate(LocalDateTime.now())
                .build();

        repository.save(entity);
    }
}
