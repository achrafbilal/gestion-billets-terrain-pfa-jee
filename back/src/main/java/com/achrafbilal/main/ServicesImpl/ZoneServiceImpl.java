package com.achrafbilal.main.ServicesImpl;

import com.achrafbilal.main.DAO.TicketRepo;
import com.achrafbilal.main.DAO.ZoneRepo;
import com.achrafbilal.main.DTORequests.ZoneRequest;
import com.achrafbilal.main.Entities.Ticket;
import com.achrafbilal.main.Entities.Zone;
import com.achrafbilal.main.IServices.ZoneService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ZoneServiceImpl implements ZoneService {
    @Autowired
    ZoneRepo zoneRepo;
    @Autowired
    TicketRepo ticketRepo;

    public Zone transform(Zone zone) {

        try {
            Integer seatsLeft = zone.getMaxSeat();
            List<Ticket> tickets = ticketRepo.findAllByZoneId(zone.getId());
            zone.setSeatsLeft(seatsLeft - tickets.size());

        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());

        }
        return zone;
    }

    public List<Zone> transform(List<Zone> zones) {
        List<Zone> response = new ArrayList<>();
        for (Zone zone : zones) {
            response.add(transform(zone));
        }
        return response;
    }

    @Override
    public List<Zone> index() {
        return transform(zoneRepo.findAll());
    }

    @Override
    public Zone show(Long id) {
        Optional<Zone> zoneO = zoneRepo.findZoneById(id);
        if (zoneO.isPresent())
            return transform(zoneO.get());
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Zone with id " + id + " was not foubnd");
    }

    @Override
    public Zone store(ZoneRequest request) {
        Zone zone = new Zone();
        BeanUtils.copyProperties(request, zone);
        return transform(zoneRepo.save(zone));
    }

    @Override
    public Zone edit(ZoneRequest request, Long id) {
        Zone zone = show(id);
        zone.setMaxSeat(request.getMaxSeat());
        zone.setName(request.getName());
        return transform(zoneRepo.save(zone));
    }

    @Override
    public void delete(Long id) {
        if (ticketRepo.findAllByZoneId(id).isEmpty())
            zoneRepo.delete(show(id));
        else
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This zone is already reserved");
    }
}