package kr.co.J2SM.service;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import kr.co.J2SM.dto.user.InviteDTO;
import kr.co.J2SM.entity.user.Invite;
import kr.co.J2SM.repository.InviteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class InviteService {

    private final InviteRepository inviteRepository;
    private final ModelMapper modelMapper;
    private final JavaMailSenderImpl mailSender;

    public String save(InviteDTO inviteDTO) {

        String inviteCode = generateInviteCode();
        log.info("초대 코드 생성: " + inviteCode);

        Invite invite = modelMapper.map(inviteDTO, Invite.class);
        invite.setInviteCode(inviteCode);
        inviteRepository.save(invite);

        return inviteCode;
    }

    private String generateInviteCode() {
        // 랜덤으로 뽑을 문자들의 집합
        String charPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder code = new StringBuilder();
        
        // 6자리까지 랜덤의 위치의 인덱스를 뽑아서 문자열로 제공
        for (int i = 0; i < 6; i++) {
            int randIndex = (int) (Math.random() * charPool.length());
            code.append(charPool.charAt(randIndex));
        }
        return code.toString(); // 예: "B4X9Q2"
    }


    @Value("${spring.mail.username}")
    private String sender;

    @Async
    public void sendEmail(String inviteCode, InviteDTO inviteDTO, String host) {
        MimeMessage message = mailSender.createMimeMessage();

        String subject = "J2SM 그룹웨어 초대 메시지 (" + inviteDTO.getCompany() + ")";
        String receiver = inviteDTO.getEmail();

        // 호스트 판단

        String inviteUrl;
        if ("localhost".equals(host) || "127.0.0.1".equals(host)) {
            inviteUrl = "http://localhost:5173";
        } else {
            inviteUrl = "https://lotte2-community-app-project-team1-sandy.vercel.app";
        }

        inviteUrl += "/user/temp";

        // HTML 본문
        String content = "<div>" +
                "<h1>J2SM 초대 안내</h1>" +
                "<p>회사: <strong>" + inviteDTO.getCompany() + "</strong></p>" +
                "<p>초대 코드: <strong>" + inviteCode + "</strong></p>" +
                "<p>아래 링크를 클릭해 회원가입을 진행해 주세요.</p>" +
                "<a href='" + inviteUrl + "'>" + inviteUrl + "</a>" +
                "</div>";

        try {
            message.setFrom(new InternetAddress(sender, "J2SM 관리자", "UTF-8"));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(receiver));
            message.setSubject(subject);
            message.setContent(content, "text/html;charset=UTF-8");

            mailSender.send(message);
        } catch (Exception e) {
            log.error("메일 전송 실패: " + e.getMessage());
        }
    }


}
