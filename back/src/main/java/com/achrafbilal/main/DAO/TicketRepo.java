package com.achrafbilal.main.DAO;

import com.achrafbilal.main.Entities.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepo extends JpaRepository<Ticket,Long> {
    List<Ticket> findAllByUserId(Long userId);

    List<Ticket> findAllBySeatId(Long seatId);

    Optional<Ticket> findTicketById(Long id);
}
