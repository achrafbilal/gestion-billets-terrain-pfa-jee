package com.achrafbilal.main.Controllers;

import com.achrafbilal.main.DTORequests.UserRequest;
import com.achrafbilal.main.Entities.User;
import com.achrafbilal.main.IServices.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public List<User> index(){
        return userService.index();
    }
    @GetMapping("/{id}")
    public User show(@PathVariable Long id){
        return userService.show(id);
    }
    @PostMapping("")
    public User create(@RequestBody UserRequest request) {
        return userService.store(request);
    }
    @PutMapping("/{id}")
    public User edit(@RequestBody UserRequest request,@PathVariable Long id) {
        return userService.edit(request,id);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
