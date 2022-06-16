package com.achrafbilal.main.ServicesImpl;

import com.achrafbilal.main.DAO.UserRepo;
import com.achrafbilal.main.DTORequests.UserRequest;
import com.achrafbilal.main.Entities.User;
import com.achrafbilal.main.IServices.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepo userRepo;

    @Override
    public List<User> index() {
        return userRepo.findAll();
    }

    @Override
    public User show(Long id) {
        Optional<User> userO=userRepo.findUserById(id);
        if(userO.isPresent())
            return userO.get();
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User with id "+id+" was not found");
    }

    @Override
    public User store(UserRequest request) {
        User user=new User();
        BeanUtils.copyProperties(request,user);
        return userRepo.save(user);
    }

    @Override
    public User edit(UserRequest request,Long id) {
        User user=show(id);
        user.setRoleId(request.getRoleId());
        user.setFullName(request.getFullName());
        return userRepo.save(user);
    }

    @Override
    public void delete(Long id) {
        userRepo.delete(show(id));
    }
}
