package kr.co.J2SM.service;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import kr.co.J2SM.dto.user.TermsDTO;
import kr.co.J2SM.dto.user.UserDTO;
import kr.co.J2SM.entity.company.Membership;
import kr.co.J2SM.entity.user.Invite;
import kr.co.J2SM.entity.user.Terms;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.entity.company.Company;
import kr.co.J2SM.entity.company.Department;
import kr.co.J2SM.repository.DepartmentRepository;
import kr.co.J2SM.repository.InviteRepository;
import kr.co.J2SM.repository.MembershipRepository;
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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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
    private final MembershipRepository membershipRepository;
    private final InviteRepository inviteRepository;

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

    }

    // 관리자 회원가입
    @Transactional
    public void register(UserDTO userDTO, UserDTO user) {

        // 관리자 회원가입
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

        // 결제 내역
        String type = user.getMembership();
        int price = membershipPrice(type);

        Membership membership = Membership.builder()
                .price(price) // 가격
                .type(type) // 타입
                .company(company) // 회사
                .paymentMethod("카카오페이") //현재는 1개이기에 고정값
                .status("SUCCESS")
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusMonths(1))
                .build();

        membershipRepository.save(membership);

    }

    // 멤버십에 따른 가격 분류
    public int membershipPrice(String membership){
        switch(membership){
            case "Basic": return 9900;
            case "Standard": return 19900;
            case "Premium": return 34900;
            default: return 0;
        }
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


    public UserDTO findByUser(User user) {
        Optional<User> optUser = userRepository.findById(user.getUid());
        if(optUser.isPresent()) {
            User userEntity = optUser.get();
            return modelMapper.map(userEntity, UserDTO.class);
        }
        return null;
    }
    public User findByUsername(String username) {
        return userRepository.findById(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: " + username));
    }

    // 일반 사원 회원가입 로직
    public void registerEmployee(UserDTO userDTO) {

        // 일반 회원가입
        String encoded = passwordEncoder.encode(userDTO.getPass());
        userDTO.setPass(encoded);

        Optional<Invite> inviteOpt = inviteRepository.findByInviteCode(userDTO.getTempcode());

        // 초대 받을 때 작성했던 정보를 가져와서 입력
        // 회사명, 백엔드, 이메일, 이름, 직책
        if(inviteOpt.isPresent()) {
            Invite invite = inviteOpt.get();
            User user = modelMapper.map(userDTO, User.class);

            String companyName = invite.getCompany().getCompanyName();
            user.setCompany(companyName);

            Company company = invite.getCompany();
            String departmentName = invite.getDepartment();
            Department department = departmentRepository.findByCompanyAndDepartmentName(company,departmentName).get();
            user.setDepartment(department);
            user.setRole("EMPLOYEE");
            user.setName(invite.getName());
            user.setEmail(invite.getEmail());
            user.setPosition(invite.getPosition());

            Optional<Membership> membershipOpt = membershipRepository.findTopByCompanyOrderByPaymentIdDesc(company);

            if(membershipOpt.isPresent()) {
                Membership membership = membershipOpt.get();
                user.setMembership(membership.getType());
            }else{
                user.setMembership("free");
            }

            userRepository.save(user);

            inviteRepository.delete(invite); // 초대 코드 사용 후 삭제

        }


    }

    // 소셜 로그인에서 uid에 따른 User 정보 추출
    public UserDTO findUser(String uid) {
        Optional<User> user = userRepository.findById(uid);
        if(user.isPresent()) {
            User userEntity = user.get();
            return modelMapper.map(userEntity, UserDTO.class);
        }
        return null;
    }

    // 프로필 수정
    public void modifyProfile(String profileImageName, User user) {

        Optional<User> optUser = userRepository.findById(user.getUid());
        if(optUser.isPresent()) {
            User userEntity = optUser.get();
            userEntity.setProfileImage(profileImageName);
            userRepository.save(userEntity);
        }

    }

    @Transactional
    public void modifyUserInfo(UserDTO userDTO, User user) {

        Optional<User> optUser = userRepository.findById(user.getUid());
        if(optUser.isPresent()) {
            User userEntity = optUser.get();
            userEntity.setName(userDTO.getName());
            userEntity.setHp(userDTO.getHp());
            userEntity.setEmail(userDTO.getEmail());
            userRepository.save(userEntity);
        }
    }

    public String validPass(UserDTO userDTO, User user) {
        String inputPass = userDTO.getPass(); // 현재 입력된 기존 비밀번호

        Optional<User> userOpt = userRepository.findById(user.getUid());
        if (userOpt.isPresent()) {
            User userEntity = userOpt.get();
            String dbPass = userEntity.getPass();

            // 기존 비밀번호가 일치하는 경우
            if (passwordEncoder.matches(inputPass, dbPass)) {
                String encoded = passwordEncoder.encode(userDTO.getNewPass());
                userEntity.setPass(encoded);
                userRepository.save(userEntity);
                return "성공";
            }else{
                return "비밀번호오류";
            }
        }

        return "실패";
    }

    public User findUserByUid(String uid) {
        return userRepository.findById(uid).get();
    }
}
