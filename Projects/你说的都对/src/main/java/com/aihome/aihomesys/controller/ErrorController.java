package com.aihome.aihomesys.controller;
import com.aihome.aihomesys.service.UserEnrollService;
import com.aihome.aihomesys.vo.UserEnroll;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@Controller
@RequestMapping("/hello")
public class ErrorController {

    @Autowired
    private UserEnrollService userEnrollService;

    private List<UserEnroll> userEnrolls;

    Logger logger = LoggerFactory.getLogger(getClass());

    @GetMapping
    public String welcome() {
        return "error/error";
    }

    @RequestMapping("get")
    public List<UserEnroll> hello(){
        userEnrolls = this.userEnrollService.selectAll();
        return userEnrolls;
    }

}
