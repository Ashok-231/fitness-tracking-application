package org.svcet.fittr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "org.svcet.fittr")
public class FittrApplication {

    public static void main(String[] args) {
        SpringApplication.run(FittrApplication.class, args);
    }
}


