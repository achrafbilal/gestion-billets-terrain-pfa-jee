package com.achrafbilal.main.IServices;

import com.achrafbilal.main.DTORequests.UserRequest;
import com.achrafbilal.main.DTOResponse.UserApiResponse;
import com.achrafbilal.main.DTOResponse.UserResponse;
import java.util.List;

public interface UserService {
    List<UserApiResponse> index();

    UserResponse show(Long id);

    UserResponse login(UserRequest user);

    UserResponse store(UserRequest request);

    UserResponse edit(UserRequest request, Long id);

    Boolean editRole(Integer roleId, Long id);

    String refreshToken(Long id, String token);

    void delete(Long id);
}
