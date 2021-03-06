package com.example.data_structure.Controller;


import com.example.data_structure.mapper.UserMapper;
import com.example.data_structure.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
            map.put("msg3","welecom!"+username);
            return "index";
        }else {
            map.put("msg1","用户名或密码输入错误，请重新输入！");
            return "login";
        }
    }
    @RequestMapping("/register")
    public String register(HttpServletRequest request,Map<String,Object> map){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setType("2");
        User user1 = userMapper.getuser(username);
        if(user1!=null){
            map.put("msg2","该用户名已被注册，请重新输入");
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
    @RequestMapping("/goindex_cont")
    public String goindex_cont(HttpServletRequest request,Map<String,Object> map){
        return "index_cont";
    }
    @RequestMapping("/usermanage")
    public String userManage(HttpServletRequest request,Map<String,Object> map){
        return "index";
    }
    @RequestMapping("/knowlege")
    public String knowledge(HttpServletRequest request,Map<String,Object> map){
        return "index";
    }
    @RequestMapping("/gotouser")
    public String gotouser(HttpServletRequest request,Map<String,Object> map){
        return "usermanage";
    }
    @RequestMapping("/gotoknowledge")
    public String gotoknowledge(HttpServletRequest request,Map<String,Object> map){
        return "knowledge";
    }
    @RequestMapping("/gotoindex")
    public String gotoindex(HttpServletRequest request,Map<String,Object> map){
        return "index_cont";
    }
    @RequestMapping("/adduser")
    public String adduser(HttpServletRequest request,Map<String,Object> map){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String type = request.getParameter("type");
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setType(type);
        User user3 = userMapper.getuser(username);
        if(user3!=null){
            map.put("msg4","该用户名已存在，请重新输入.");
            return "usermanage";
        }else {
            userMapper.adduser(user);
            return "usermanage";
        }
    }
    @RequestMapping("/updateuser")
    public String update(HttpServletRequest request,Map<String,Object> map){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String type = request.getParameter("type");
        User user = userMapper.getuser(username);
        if(user!=null){
            userMapper.updateuser(username,password,type);
            //map.put("msg4","the user has been updated.");
            return "usermanage";
        }else {
            map.put("msg5","用户不存在！");
            return "usermanage";
        }
    }
    @RequestMapping("/deleteuser")
    public  String deleteuser(HttpServletRequest request,Map<String ,Object> map){
        String username = request.getParameter("username");
        User user2 = userMapper.getuser(username);
        if(user2!=null){
            userMapper.deleteuser(username);
            return "usermanage";
        }else {
            map.put("msg6","该用户不存在！");
            return "usermanage";
        }
    }

}
