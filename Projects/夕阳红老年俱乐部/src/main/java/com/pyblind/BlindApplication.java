package com.pyblind;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan("com.pyblind.dao")
@SpringBootApplication
@ComponentScan(basePackages = {"com.pyblind.*"})
public class BlindApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlindApplication.class, args);
    }

}

