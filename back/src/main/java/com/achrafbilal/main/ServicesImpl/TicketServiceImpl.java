package com.achrafbilal.main.ServicesImpl;

import com.achrafbilal.main.DAO.TicketRepo;
import com.achrafbilal.main.DTORequests.TicketRequest;
import com.achrafbilal.main.Entities.Ticket;
import com.achrafbilal.main.Entities.Zone;
import com.achrafbilal.main.IServices.TicketService;
import com.achrafbilal.main.IServices.UserService;
import com.achrafbilal.main.IServices.ZoneService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.server.ResponseStatusException;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    TicketRepo ticketRepo;
    @Autowired
    UserService userService;
    @Autowired
    ZoneService zoneService;

    private boolean sameDay(Date t1,Date t2) throws ParseException {
        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date date1 = formatter.parse(formatter.format(t1));
        Date date2 = formatter.parse(formatter.format(t2));
        return date1.compareTo(date2)==0;
    }
    private Ticket join(Ticket t) {
        Zone z=zoneService.show(t.getZoneId());
        t.setUserEmail(userService.show(t.getUserId()).getEmail());
        t.setZoneName(z.getName());
        return t;
    }
    @Override
    public List<Ticket> index() {
        List<Ticket> tickets=new ArrayList<>();
        for(Ticket ticket:ticketRepo.findAll())
        {
            try {
                tickets.add(join(ticket));
            }
            catch (Exception ex)
            {
                System.out.println(ex.getLocalizedMessage());
            }
        }
        return tickets;
    }
    @Override
    public List<Ticket> indexClient(Long id) {
        List<Ticket> tickets=ticketRepo.findAllByUserId(id);
        for (Ticket t:         tickets) {
            t.setZoneName(zoneService.show(t.getZoneId()).getName());
        }
        return tickets;
    }

    @Override
    public Integer seatsLeft(Long id)
    {
        Integer seatsLeft= zoneService.show(id).getMaxSeat();
        List<Ticket> tickets=ticketRepo.findAllByZoneId(id);
        System.out.println(tickets.size());
        return seatsLeft-tickets.size();

    }

    @Override
    public Ticket show(Long id) {
        Optional<Ticket> ticketO=ticketRepo.findTicketById(id);
        if(ticketO.isPresent()) {
            Ticket ticket = ticketO.get();
            ticket.setUserEmail(userService.show(ticket.getUserId()).getEmail());
            return ticket;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Ticket with id "+id+" was not foubnd");
    }

    @Override
    public Ticket store(TicketRequest request) {
        Ticket ticket=new Ticket();
        BeanUtils.copyProperties(request,ticket);
        ticket.setPurchaseDate(new Date());
        ticket=ticketRepo.save(ticket);
        return show(ticket.getId());
    }

    @Override
    public Ticket edit(TicketRequest request,Long id) {
        Ticket ticket=show(id);
        ticket.setUserId(request.getUserId());
        ticket.setPurchaseDate(new Date());
        ticketRepo.save(ticket);
        return show(id);
    }

    @Override
    public void delete(Long id) {
        ticketRepo.delete(show(id));
    }
}
