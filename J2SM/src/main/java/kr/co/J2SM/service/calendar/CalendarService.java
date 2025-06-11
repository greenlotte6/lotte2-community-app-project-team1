package kr.co.J2SM.service.calendar;

import kr.co.J2SM.dto.calendar.CalendarDTO;
import kr.co.J2SM.entity.calendar.Calendar;
import kr.co.J2SM.repository.calendar.CalendarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;

    public List<Calendar> getAllSchedules() {
        return calendarRepository.findAll();
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
}


