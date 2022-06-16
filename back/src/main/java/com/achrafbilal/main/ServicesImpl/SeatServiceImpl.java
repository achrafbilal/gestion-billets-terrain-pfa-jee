package com.achrafbilal.main.ServicesImpl;

import com.achrafbilal.main.DAO.SeatRepo;
import com.achrafbilal.main.DTORequests.SeatRequest;
import com.achrafbilal.main.Entities.Seat;
import com.achrafbilal.main.IServices.SeatService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class SeatServiceImpl implements SeatService {
    @Autowired
    SeatRepo seatRepo;

    @Override
    public List<Seat> index() {
        return seatRepo.findAll();
    }

    @Override
    public Seat show(Long id) {
        Optional<Seat> seatO=seatRepo.findSeatById(id);
        if(seatO.isPresent())
            return seatO.get();
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Seat with id "+id+" was not foubnd");

    }

    @Override
    public Seat store(SeatRequest request) {
        Seat seat=new Seat();
        BeanUtils.copyProperties(request,seat);
        return seatRepo.save(seat);
    }

    @Override
    public Seat edit(SeatRequest request,Long id) {
        Seat seat=show(id);
        seat.setZoneId(request.getZoneId());
        seat.setSeatNumber(request.getSeatNumber());
        return seatRepo.save(seat);
    }

    @Override
    public void delete(Long id) {
        seatRepo.delete(show(id));
    }
}
