package com.example.datastructure_system.mapper;

import com.example.datastructure_system.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("select * from user where username=#{username} and password=${password} and type=#{type}")
    User login(String username, String password, String type);
    @Select("select * from user where username=#{username}")
    User getuser(String username);
    @Insert("insert into user (username,password) values (#{username},#{password})")
    void adduser(User user);
}
