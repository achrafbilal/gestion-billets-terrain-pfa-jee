package com.achrafbilal.main.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long seatId;
    @Temporal(TemporalType.TIMESTAMP)
    private Date purchaseDate;
    @Temporal(TemporalType.TIMESTAMP)
    private Date reservationDate;
    private Double price;

    @Transient
    private String userEmail;
    @Transient
    private Seat seat;

    public Date parseDate(String value) throws ParseException {
        return (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(value);
    }
}
