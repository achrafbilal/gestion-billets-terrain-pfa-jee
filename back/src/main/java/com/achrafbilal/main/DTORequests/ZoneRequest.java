package com.achrafbilal.main.DTORequests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ZoneRequest {
    private String name;
    private Integer maxSeat;
}
