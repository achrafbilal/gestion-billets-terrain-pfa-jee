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
    private Long zoneId;
    @Temporal(TemporalType.TIMESTAMP)
    private Date purchaseDate;

    @Transient
    private String userEmail;
    @Transient
    private String zoneName;
    @Transient
    private Integer seatsLeft;

    public Date parseDate(String value) throws ParseException {
        return (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(value);
    }
}
