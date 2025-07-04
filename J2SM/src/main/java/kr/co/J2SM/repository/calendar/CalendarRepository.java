package kr.co.J2SM.repository.calendar;

import kr.co.J2SM.entity.calendar.Calendar;
import kr.co.J2SM.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    List<Calendar> findByUser(User user);

    List<Calendar> findByCompany(int cno);


    List<Calendar> findByUserAndIsPublic(User user, int isPublic);

    List<Calendar> findByUserAndStartLessThanEqualAndEndGreaterThanEqual(User user, String today, String today1);

    List<Calendar> findByCompanyAndStartLessThanEqualAndEndGreaterThanEqual(int company, String today, String today1);
}

