package kr.co.J2SM.controller;

import kr.co.J2SM.dto.calendar.CalendarDTO;
import kr.co.J2SM.entity.calendar.Calendar;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.security.MyUserDetails;
import kr.co.J2SM.service.calendar.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/{cate}")
    public List<CalendarDTO> getSchedules(@AuthenticationPrincipal User user, @PathVariable String cate) {
        log.info("기본 스케줄 가져오기");

        String uid = user.getUid();
        List<CalendarDTO> list = calendarService.getAllSchedulesByUser(uid, cate);

        System.out.println(list);
        return list;
    }

    @PostMapping
    public Calendar createSchedule(@RequestBody CalendarDTO dto, @AuthenticationPrincipal User user
                                   ) {

        // JWT 추출

        System.out.println(dto);
        Calendar schedule = Calendar.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .start(dto.getStart())
                .end(dto.getEnd())
                .place(dto.getPlace())
                .member(dto.getMember())
                .note(dto.getNote())
                .color(dto.getColor())
                .user(user)
                .build();

        return calendarService.saveSchedule(schedule);
    }

    private final ModelMapper modelMapper;

    @PutMapping("/{id}")
    public CalendarDTO updateSchedule(@PathVariable Long id,
                                      @RequestBody CalendarDTO dto,
                                      @AuthenticationPrincipal User user) {
        log.info("캘린더 수정");
        Calendar entity = calendarService.updateSchedule(id, dto);

        // 안전한 타입 추론
        return modelMapper.map((Object) entity, CalendarDTO.class);
    }

    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id) {
        calendarService.deleteSchedule(id);
    }


}


