package com.achrafbilal.main.IServices;

import com.achrafbilal.main.DTORequests.TicketRequest;
import com.achrafbilal.main.Entities.Ticket;
import com.achrafbilal.main.Entities.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TicketService {
    List<Ticket> index();
    Ticket show(Long id);
    Ticket store(TicketRequest request);
    Ticket edit(TicketRequest request,Long id);
    void delete(Long id);
}
