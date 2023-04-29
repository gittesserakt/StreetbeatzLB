package de.hhn.se.labswp.streetbeatzlb_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class StreetbeatzLbBackendApplication extends SpringBootServletInitializer {

  public static void main(String[] args) {
    SpringApplication.run(StreetbeatzLbBackendApplication.class, args);
  }

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
    return builder.sources(StreetbeatzLbBackendApplication.class);
  }

}
