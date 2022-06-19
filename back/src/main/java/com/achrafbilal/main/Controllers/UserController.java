package com.achrafbilal.main.Controllers;

import com.achrafbilal.main.DTORequests.UserRequest;
import com.achrafbilal.main.Entities.User;
import com.achrafbilal.main.IServices.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public List<User> index(){
        return userService.index();
    }
    @GetMapping("/role/3")
    public List<User> indexClients(){
        List<User> users=userService.index();
        List<User> response=new ArrayList<>();
        for (User u:users) {
            if(u.getRoleId()==3)
                response.add(u);
        }
        return response;
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
