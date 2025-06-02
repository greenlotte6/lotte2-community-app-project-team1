package kr.co.J2SM.service;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import kr.co.J2SM.dto.TermsDTO;
import kr.co.J2SM.dto.UserDTO;
import kr.co.J2SM.entity.Terms;
import kr.co.J2SM.entity.User;
import kr.co.J2SM.repository.TermsRepository;
import kr.co.J2SM.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService{

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final TermsRepository termsRepository;
    private final JavaMailSenderImpl mailSender;

    public String register(UserDTO userDTO) {
        String encoded = passwordEncoder.encode(userDTO.getPass());
        userDTO.setPass(encoded);

        User user = modelMapper.map(userDTO, User.class);
        User savedUser = userRepository.save(user);

        return savedUser.getUid();
    }

    public TermsDTO terms() {

        Optional<Terms> optTerms = termsRepository.findById(1);

        if(optTerms.isPresent()) {

            Terms terms = optTerms.get();
            TermsDTO termsDTO = modelMapper.map(terms, TermsDTO.class);
            return termsDTO;
        }
        return null;
    }

    public boolean existId(String uid) {
        return userRepository.existsById(uid);
    }

    public Boolean findUserEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Value("${spring.mail.username}")
    private String sender;

    public String sendEmailCode(String receiver){

        // MimeMessage 생성
        MimeMessage message = mailSender.createMimeMessage();

        // 인증코드 생성
        int code = ThreadLocalRandom.current().nextInt(100000, 1000000);
        log.info("code : " + code);

        String subject = "J2SM 인증코드 안내";
        String content = "<h1>J2SM 인증코드는 " + code + "입니다.</h1>";

        try {
            // 메일 정보 설정
            message.setFrom(new InternetAddress(sender, "보내는 사람", "UTF-8"));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(receiver));
            message.setSubject(subject);
            message.setContent(content, "text/html;charset=UTF-8");

            // 메일 발송
            mailSender.send(message);
        }catch (Exception e){
            log.error(e.getMessage());
        }
        return String.valueOf(code);
    }
}
