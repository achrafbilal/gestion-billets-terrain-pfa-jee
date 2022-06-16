package com.achrafbilal.main.Controllers;

import com.achrafbilal.main.DTORequests.TicketRequest;
import com.achrafbilal.main.Entities.Ticket;
import com.achrafbilal.main.IServices.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
public class TicketController {
    @Autowired
    TicketService ticketService;

    @GetMapping
    public List<Ticket> index(){
        return ticketService.index();
    }
    @GetMapping("/{id}")
    public Ticket show(@PathVariable Long id){
        return ticketService.show(id);
    }
    @PostMapping("")
    public Ticket create(@RequestBody TicketRequest request)
    {
        return ticketService.store(request);
    }
    @PutMapping("/{id}")
    public Ticket edit(@RequestBody TicketRequest request,@PathVariable Long id) {
        return ticketService.edit(request, id);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        ticketService.delete(id);
    }
}
