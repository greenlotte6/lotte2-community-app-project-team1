package kr.co.J2SM.service;

import kr.co.J2SM.dto.TermsDTO;
import kr.co.J2SM.dto.UserDTO;

public interface UserService {


    public String register(UserDTO userDTO);

    public TermsDTO terms();
}
