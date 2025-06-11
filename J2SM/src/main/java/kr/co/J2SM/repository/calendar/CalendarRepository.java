package kr.co.J2SM.repository.calendar;

import kr.co.J2SM.entity.calendar.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Long> {
}

