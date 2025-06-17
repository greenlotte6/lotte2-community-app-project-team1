package kr.co.J2SM.service.calendar;

import kr.co.J2SM.dto.calendar.CalendarDTO;
import kr.co.J2SM.entity.calendar.Calendar;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.calendar.CalendarRepository;
import kr.co.J2SM.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public List<Calendar> getAllSchedules() {
        return calendarRepository.findAll();
    }

    // 유저에 따른 캘린더 전체 정보
    public List<CalendarDTO> getAllSchedulesByUser(String uid, String cate) {

        if(cate.equals("my")){

            User user = User.builder()
                    .uid(uid)
                    .build();

            int isPublic = 0;
            List<Calendar> list = calendarRepository.findByUserAndIsPublic(user, isPublic);
            List<CalendarDTO> calendarDTOList = new ArrayList<>();
            for (Calendar calendar : list) {
                CalendarDTO calendarDTO = modelMapper.map(calendar, CalendarDTO.class);
                calendarDTOList.add(calendarDTO);
            }

            return calendarDTOList;
        }

        User user = userRepository.findById(uid).get();
        int cno = user.getDepartment().getCompany().getCno();
        List<Calendar> list = calendarRepository.findByCompany(cno);
        List<CalendarDTO> calendarDTOList = new ArrayList<>();
        for (Calendar calendar : list) {
            CalendarDTO calendarDTO = modelMapper.map(calendar, CalendarDTO.class);
            calendarDTOList.add(calendarDTO);
        }

        return calendarDTOList;

    }

    public Calendar saveSchedule(Calendar schedule) {
        return calendarRepository.save(schedule);
    }

    public void deleteSchedule(Long id) {
        calendarRepository.deleteById(id);
    }

    public Calendar updateSchedule(Long id, CalendarDTO dto) {
        return calendarRepository.findById(id).map(schedule -> {
            schedule.setTitle(dto.getTitle());
            schedule.setStart(dto.getStart());
            schedule.setEnd(dto.getEnd());
            schedule.setPlace(dto.getPlace());
            schedule.setMember(dto.getMember());
            schedule.setNote(dto.getNote());
            schedule.setColor(dto.getColor());
            return calendarRepository.save(schedule);
        }).orElseThrow(() -> new RuntimeException("일정이 존재하지 않습니다."));
    }


    public Calendar saveScheduleByCate(CalendarDTO dto, User user) {

        Calendar schedule = modelMapper.map(dto, Calendar.class);
        schedule.setUser(user);

        String cate = dto.getCate();

        // 개인
        if(cate.equals("my")){
            schedule.setCompany(0);
        }else{
            schedule.setIsPublic(1);
        }

        return calendarRepository.save(schedule);
    }
}


