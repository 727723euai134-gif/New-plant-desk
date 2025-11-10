package com.biophilic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BiophilicApplication {
    public static void main(String[] args) {
        SpringApplication.run(BiophilicApplication.class, args);
    }
}