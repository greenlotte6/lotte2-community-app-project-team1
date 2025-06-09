package kr.co.J2SM.service;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import kr.co.J2SM.dto.user.TermsDTO;
import kr.co.J2SM.dto.user.UserDTO;
import kr.co.J2SM.entity.user.Terms;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.entity.company.Company;
import kr.co.J2SM.entity.company.Department;
import kr.co.J2SM.repository.DepartmentRepository;
import kr.co.J2SM.repository.user.TermsRepository;
import kr.co.J2SM.repository.user.UserRepository;
import kr.co.J2SM.repository.company.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService{

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final DepartmentRepository departmentRepository;
    private final TermsRepository termsRepository;
    private final ModelMapper modelMapper;
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

    public void companyAll() {

        Company company = Company.builder()
                .cno(1)
                .build();
        List<Department> list = departmentRepository.findByCompany(company);

        System.out.println(list);

    }

    // 관리자 회원가입
    public void register(UserDTO userDTO, UserDTO user) {
        String encoded = passwordEncoder.encode(user.getPass());
        user.setPass(encoded);
        user.setName(userDTO.getName());
        user.setHp(userDTO.getHp());
        user.setCompany(userDTO.getCompany());
        user.setPosition("CEO");
        user.setRole("ADMIN");
        user.setProfileImage(userDTO.getProfileImage());

        Company company = registerCompany(userDTO.getCompany());
        Department department = registerDepartment(company, "총무팀" );

        User userEntity = modelMapper.map(user, User.class);
        userEntity.setDepartment(department);

        userRepository.save(userEntity);
        
    }

    // 회사 등록(회사 관리자 생성 시 )
    public Company registerCompany(String companyName){
        Company company = Company.builder()
                .companyName(companyName)
                .build();

        Company savedCompany= companyRepository.save(company);
        return savedCompany;
    }

    // 부서 등록(관리자)
    public Department registerDepartment(Company company, String departmentName){
        Department department = Department.builder()
                .departmentName(departmentName)
                .company(company)
                .build();

        Department savedDepartment = departmentRepository.save(department);
        return savedDepartment;
    }

    public boolean existHp(String hp) {
        return userRepository.existsByHp(hp);
    }

    public String findUidByHp(String hp) {
        Optional<User> optUser = userRepository.findByHp(hp);
        if(optUser.isPresent()) {
            User user = optUser.get();
            return user.getUid();
        }
        return "유저 정보가 없습니다";
    }

    public Boolean modifyPass(UserDTO userDTO) {
        Optional<User> optUser = userRepository.findByEmail(userDTO.getEmail());
        if(optUser.isPresent()) {
            User user = optUser.get();
            String encoded = passwordEncoder.encode(userDTO.getPass());
            user.setPass(encoded);
            userRepository.save(user);
            return true;
        }
        return false;
    }


}
