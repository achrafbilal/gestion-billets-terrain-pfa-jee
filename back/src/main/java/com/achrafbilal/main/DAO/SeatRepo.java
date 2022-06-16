package com.achrafbilal.main.DAO;

import com.achrafbilal.main.Entities.Seat;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SeatRepo extends JpaRepository<Seat,Long> {
    List<Seat> findAllByZoneId(Long zoneId);
    Optional<Seat> findSeatById(Long id);
}
