package com.achrafbilal.main.DTOResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserApiResponse {
    private Long id;
    private String fullName;
    private Integer roleId;
    private String email;
}
