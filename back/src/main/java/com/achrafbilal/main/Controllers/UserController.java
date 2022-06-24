package com.achrafbilal.main.Controllers;

import com.achrafbilal.main.DTORequests.UserRequest;
import com.achrafbilal.main.DTORequests.UserRoleEditRequest;
import com.achrafbilal.main.DTORequests.UserTokenRequest;
import com.achrafbilal.main.DTOResponse.UserApiResponse;
import com.achrafbilal.main.DTOResponse.UserResponse;
import com.achrafbilal.main.IServices.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/login")
    public UserResponse login(@RequestBody UserRequest user) {
        return userService.login(user);
    }

    @PostMapping("/token/refresh")
    public String refreshToken(@RequestBody UserTokenRequest user) {
        return userService.refreshToken(user.getId(), user.getToken());
    }

    @GetMapping
    public List<UserApiResponse> index() {
        return userService.index();
    }

    @GetMapping("/role/3")
    public List<UserApiResponse> indexClients() {
        List<UserApiResponse> users = userService.index();
        List<UserApiResponse> response = new ArrayList<>();
        for (UserApiResponse u : users) {
            if (u.getRoleId() == 3)
                response.add(u);
        }
        return response;
    }

    @GetMapping("/{id}")
    public UserResponse show(@PathVariable Long id) {
        return userService.show(id);
    }

    @PostMapping("/register")
    public UserResponse create(@RequestBody UserRequest request) {
        return userService.store(request);
    }

    @PutMapping("/{id}")
    public UserResponse edit(@RequestBody UserRequest request, @PathVariable Long id) {
        return userService.edit(request, id);
    }

    @PutMapping("/role/{id}")
    public Boolean editRole(@RequestBody UserRoleEditRequest roleId, @PathVariable Long id) {
        return userService.editRole(roleId.getRoleId(), id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
