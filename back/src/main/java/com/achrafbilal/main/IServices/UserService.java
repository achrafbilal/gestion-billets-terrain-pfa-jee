package com.achrafbilal.main.IServices;

import com.achrafbilal.main.DTORequests.UserRequest;
import com.achrafbilal.main.Entities.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    List<User> index();
    User show(Long id);
    User store(UserRequest request);
    User edit(UserRequest request,Long id);
    void delete(Long id);
}
