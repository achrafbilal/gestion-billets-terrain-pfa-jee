package com.achrafbilal.main.Controllers;

import com.achrafbilal.main.DTORequests.ZoneRequest;
import com.achrafbilal.main.Entities.Zone;
import com.achrafbilal.main.IServices.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/zones")
@CrossOrigin(origins = "*")
public class ZoneController {
    @Autowired
    ZoneService zoneService;
    @GetMapping
    public List<Zone> index(){
        return zoneService.index();
    }
    @GetMapping("/{id}")
    public Zone show(@PathVariable Long id){
        return zoneService.show(id);
    }
    @PostMapping("")
    public Zone create(@RequestBody ZoneRequest request) {
        return zoneService.store(request);
    }
    @PutMapping("/{id}")
    public Zone edit(@RequestBody ZoneRequest request,@PathVariable Long id) {
        return zoneService.edit(request, id);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        zoneService.delete(id);
    }
}
