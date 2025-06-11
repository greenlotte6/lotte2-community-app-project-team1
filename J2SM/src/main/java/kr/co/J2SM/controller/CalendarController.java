package kr.co.J2SM.controller;

import kr.co.J2SM.dto.calendar.CalendarDTO;
import kr.co.J2SM.entity.calendar.Calendar;
import kr.co.J2SM.service.calendar.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping
    public List<Calendar> getSchedules() {
        log.info("캘린더 호출");
        return calendarService.getAllSchedules();
    }

    @PostMapping
    public Calendar createSchedule(@RequestBody CalendarDTO dto) {

        log.info("일정 생성: {}", dto);

        Calendar schedule = Calendar.builder()
                .title(dto.getTitle())
                .start(dto.getStart())
                .end(dto.getEnd())
                .place(dto.getPlace())
                .member(dto.getMember())
                .note(dto.getNote())
                .color(dto.getColor())
                .build();



        System.out.println(schedule);


        return calendarService.saveSchedule(schedule);
    }

    @PutMapping("/{id}")
    public Calendar updateSchedule(@PathVariable Long id, @RequestBody CalendarDTO dto) {
        return calendarService.updateSchedule(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id) {
        calendarService.deleteSchedule(id);
    }
}


