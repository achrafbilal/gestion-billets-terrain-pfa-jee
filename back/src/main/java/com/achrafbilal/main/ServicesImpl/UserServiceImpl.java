package com.achrafbilal.main.ServicesImpl;

import com.achrafbilal.main.DAO.TicketRepo;
import com.achrafbilal.main.DAO.UserRepo;
import com.achrafbilal.main.DTORequests.UserRequest;
import com.achrafbilal.main.DTOResponse.UserApiResponse;
import com.achrafbilal.main.DTOResponse.UserResponse;
import com.achrafbilal.main.Entities.User;
import com.achrafbilal.main.IServices.TicketService;
import com.achrafbilal.main.IServices.UserService;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    TicketRepo ticketService;

    private String generateToken(Integer length) {
        SecureRandom random = new SecureRandom();
        String base = "&éè!çà-_1234567890azertyuiop$*qsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN";
        StringBuilder token = new StringBuilder();
        for (int i = 0; i < length; i++) {
            token.append(base.charAt(random.nextInt(base.length() - 1)));
        }
        return token.toString();

    }

    private UserResponse transform(User user) {
        UserResponse response = new UserResponse();
        BeanUtils.copyProperties(user, response);
        return response;
    }

    // private List<UserResponse> transform(List<User> users) {
    // List<UserResponse> responses = new ArrayList<>();
    // for (User user : users) {
    // responses.add(transform(user));
    // }
    // return responses;
    // }

    private UserApiResponse transformApi(User user) {
        UserApiResponse response = new UserApiResponse();
        BeanUtils.copyProperties(user, response);
        return response;
    }

    private List<UserApiResponse> transformApi(List<User> users) {
        List<UserApiResponse> responses = new ArrayList<>();
        for (User user : users) {
            responses.add(transformApi(user));
        }
        return responses;
    }

    @Override
    public List<UserApiResponse> index() {
        return transformApi(userRepo.findAll());
    }

    @Override
    public UserResponse show(Long id) {
        Optional<User> userO = userRepo.findUserById(id);
        if (userO.isPresent())
            return transform(userO.get());
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id " + id + " was not found");
    }

    @Override
    public UserResponse store(UserRequest request) {
        User user = new User();
        BeanUtils.copyProperties(request, user);
        String token = generateToken(30);
        user.setToken(token);
        user.setRoleId(3);
        return transform(userRepo.save(user));
    }

    @Override
    public UserResponse edit(UserRequest request, Long id) {
        Optional<User> userO = userRepo.findUserById(id);
        if (userO.isPresent()) {
            User user = userO.get();
            user.setFullName(request.getFullName());
            return transform(userRepo.save(user));
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id " + id + " was not found");

    }

    @Override
    public Boolean editRole(Integer roleId, Long id) {
        Optional<User> userO = userRepo.findUserById(id);
        if (userO.isPresent()) {
            User user = userO.get();
            user.setRoleId(roleId);
            user = userRepo.save(user);
            return user.getRoleId() == roleId;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id " + id + " was not found");

    }

    @Override
    public void delete(Long id) {
        Optional<User> userO = userRepo.findUserById(id);

        if (userO.isPresent()) {
            User user = userO.get();
            if (ticketService.findAllByUserId(user.getId()).isEmpty())
                userRepo.delete(user);
            else
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This user is already reserved");
        } else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id " + id + " was not found");

    }

    @Override
    public UserResponse login(UserRequest user) {
        Optional<User> u = userRepo.findByEmail(user.getEmail());
        if (u.isPresent() && u.get().getPassword().compareTo(user.getPassword()) == 0)
            return transform(u.get());
        else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Incorrect email or password ");
    }

    @Override
    public String refreshToken(Long id, String oldToken) {

        Optional<User> userO = userRepo.findUserById(id);
        if (userO.isPresent() && userO.get().getToken().compareTo(oldToken) == 0) {
            String token = generateToken(30);
            User user = userO.get();
            user.setToken(token);
            return token;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id " + id + " was not found");

    }
}
