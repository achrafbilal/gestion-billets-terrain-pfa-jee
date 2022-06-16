package com.achrafbilal.main.DTORequests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketRequest {
    private Long userId;
    private Long seatId;
    private Date purchaseDate;
    private Date reservationDate;
    private Double price;
}
