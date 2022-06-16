package com.achrafbilal.main.DTORequests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatRequest {
    private Long zoneId;
    private Integer seatNumber;
}
