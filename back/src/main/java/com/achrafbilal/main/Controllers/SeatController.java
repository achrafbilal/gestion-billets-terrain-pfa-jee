package com.achrafbilal.main.Controllers;

import com.achrafbilal.main.DTORequests.SeatRequest;
import com.achrafbilal.main.Entities.Seat;
import com.achrafbilal.main.IServices.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seats")
public class SeatController {
    @Autowired
    SeatService seatService;

    @GetMapping
    public List<Seat> index(){
        return seatService.index();
    }
    @GetMapping("/{id}")
    public Seat show(@PathVariable Long id){
        return seatService.show(id);
    }
    @PostMapping("")
    public Seat create(@RequestBody SeatRequest request) {
        return seatService.store(request);
    }
    @PutMapping("/{id}")
    public Seat edit(@RequestBody SeatRequest request,@PathVariable Long id) {
        return seatService.edit(request,id);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        seatService.delete(id);
    }
}
