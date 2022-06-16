package com.achrafbilal.main.IServices;

import com.achrafbilal.main.DTORequests.SeatRequest;
import com.achrafbilal.main.Entities.Seat;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SeatService {
    List<Seat> index();
    Seat show(Long id);
    Seat store(SeatRequest request);
    Seat edit(SeatRequest request,Long id);
    void delete(Long id);
}
