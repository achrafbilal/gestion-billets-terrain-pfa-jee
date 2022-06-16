package com.achrafbilal.main.ServicesImpl;

import com.achrafbilal.main.DAO.ZoneRepo;
import com.achrafbilal.main.DTORequests.ZoneRequest;
import com.achrafbilal.main.Entities.Zone;
import com.achrafbilal.main.IServices.ZoneService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@Service
public class ZoneServiceImpl implements ZoneService {
    @Autowired
    ZoneRepo zoneRepo;
    @Override
    public List<Zone> index() {
        return zoneRepo.findAll();
    }

    @Override
    public Zone show(Long id) {
        Optional<Zone> zoneO= zoneRepo.findZoneById(id);
        if(zoneO.isPresent())
            return zoneO.get();
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Zone with id "+id+" was not foubnd");
    }

    @Override
    public Zone store(ZoneRequest request) {
        Zone zone=new Zone();
        BeanUtils.copyProperties(request,zone);
        return zoneRepo.save(zone);
    }

    @Override
    public Zone edit(ZoneRequest request,Long id) {
        Zone zone=show(id);
        zone.setMaxSeat(request.getMaxSeat());
        zone.setName(request.getName());
        return zoneRepo.save(zone);
    }

    @Override
    public void delete(Long id){
        zoneRepo.delete(show(id));
    }
}