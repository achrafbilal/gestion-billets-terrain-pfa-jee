package com.achrafbilal.main.DTORequests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserTokenRequest {
    private Long id;
    private String token;

}
