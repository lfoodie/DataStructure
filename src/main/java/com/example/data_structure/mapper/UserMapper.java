package com.example.data_structure.mapper;

import com.example.data_structure.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.web.bind.annotation.GetMapping;

@Mapper
public interface UserMapper {
    @Select("select * from user where username=#{username} and password=#{password} and type=#{type}")
    User login(String username, String password,String type);
    @Select("select * from user where username=#{username}")
    User getuser(String username);
    @Insert("insert into user (username,password,type) values (#{username},#{password},#{type})")
    void adduser(User user);
    @Update("update user set password=#{password} and type=#{type} where username=#{username}")
    void updateuser(String username,String password,String type);
    @Delete("delete from user where username=#{username}")
    void deleteuser(String username);
}
