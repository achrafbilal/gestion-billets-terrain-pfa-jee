package com.achrafbilal.main.ServicesImpl;

import com.achrafbilal.main.DAO.TicketRepo;
import com.achrafbilal.main.DTORequests.TicketRequest;
import com.achrafbilal.main.Entities.Ticket;
import com.achrafbilal.main.IServices.SeatService;
import com.achrafbilal.main.IServices.TicketService;
import com.achrafbilal.main.IServices.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    TicketRepo ticketRepo;
    @Autowired
    SeatService seatService;
    @Autowired
    UserService userService;

    @Override
    public List<Ticket> index() {
        return ticketRepo.findAll();
    }

    @Override
    public Ticket show(Long id) {
        Optional<Ticket> ticketO=ticketRepo.findTicketById(id);
        if(ticketO.isPresent()) {
            Ticket ticket = ticketO.get();
            ticket.setSeat(seatService.show(ticket.getSeatId()));
            ticket.setUserEmail(userService.show(ticket.getUserId()).getEmail());
            return ticket;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Ticket with id "+id+" was not foubnd");
    }

    @Override
    public Ticket store(TicketRequest request) {
        Ticket ticket=new Ticket();
        BeanUtils.copyProperties(request,ticket);
        ticket=ticketRepo.save(ticket);
        return show(ticket.getId());
    }

    @Override
    public Ticket edit(TicketRequest request,Long id) {
        Ticket ticket=show(id);
        ticket.setUserId(request.getUserId());
        ticket.setSeatId(request.getSeatId());
        ticket.setPurchaseDate(request.getPurchaseDate());
        ticket.setReservationDate(request.getReservationDate());
        ticket.setPrice(request.getPrice());
        ticketRepo.save(ticket);
        return show(id);
    }

    @Override
    public void delete(Long id) {
        ticketRepo.delete(show(id));
    }
}
