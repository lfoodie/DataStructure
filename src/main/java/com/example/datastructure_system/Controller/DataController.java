package com.example.datastructure_system.Controller;

import com.example.datastructure_system.mapper.UserMapper;
import com.example.datastructure_system.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
public class DataController {
    @Autowired
    private UserMapper userMapper;
    @GetMapping("/login")
    public String reg(){
        return "login";
    }
    @RequestMapping("/login")
    public String login(HttpServletRequest request, Map<String,Object> map){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String type = request.getParameter("type");
        User loginuser = userMapper.login(username,password,type);
        if(loginuser!=null){
            return "index";
        }else {
            map.put("msg1","username or password error,please input again!");
            return "login";
        }
    }
    @RequestMapping("/register")
    public String register(HttpServletRequest request,Map<String,Object> map){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        User user=new User();
        user.setUsername(username);
        user.setPassword(password);
        User user1 = userMapper.getuser(username);
        if(user1!=null){
            map.put("msg2","the user has been used,please register again");
            return "register";
        }else {
            userMapper.adduser(user);
            return "login";
        }
    }
    @RequestMapping("/goreg")
    public String goreg(HttpServletRequest request,Map<String,Object> map){
        return "register";
    }
}
