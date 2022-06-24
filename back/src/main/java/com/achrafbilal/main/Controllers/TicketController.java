package com.achrafbilal.main.Controllers;

import com.achrafbilal.main.DTORequests.TicketRequest;
import com.achrafbilal.main.Entities.Ticket;
import com.achrafbilal.main.IServices.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {
    @Autowired
    TicketService ticketService;

    @GetMapping
    public List<Ticket> index() {
        return ticketService.index();
    }

    @GetMapping("/client/{id}")
    public List<Ticket> indexClient(@PathVariable Long id) {
        return ticketService.indexClient(id);
    }

    @GetMapping("/seats/left/{id}")
    public Integer seatsLeft(@PathVariable Long id) {
        return ticketService.seatsLeft(id);
    }

    @GetMapping("/{id}")
    public Ticket show(@PathVariable Long id) {
        return ticketService.show(id);
    }

    @PostMapping("")
    public Ticket create(@RequestBody TicketRequest request) {
        return ticketService.store(request);
    }

    @PutMapping("/{id}")
    public Ticket edit(@RequestBody TicketRequest request, @PathVariable Long id) {
        return ticketService.edit(request, id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        ticketService.delete(id);
    }
}
