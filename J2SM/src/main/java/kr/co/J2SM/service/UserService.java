package kr.co.J2SM.service;

import kr.co.J2SM.dto.TermsDTO;
import kr.co.J2SM.dto.UserDTO;
import kr.co.J2SM.entity.Terms;
import kr.co.J2SM.entity.User;
import kr.co.J2SM.repository.TermsRepository;
import kr.co.J2SM.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService{

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final TermsRepository termsRepository;

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
}
