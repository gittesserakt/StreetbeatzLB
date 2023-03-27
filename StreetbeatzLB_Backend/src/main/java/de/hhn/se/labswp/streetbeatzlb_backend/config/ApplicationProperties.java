package de.hhn.se.labswp.streetbeatzlb_backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {

  private String clientOriginUrl;
  private String audience;

  public String getClientOriginUrl() {
    return clientOriginUrl;
  }

  public void setClientOriginUrl(String clientOriginUrl) {
    this.clientOriginUrl = clientOriginUrl;
  }

  public String getAudience() {
    return audience;
  }

  public void setAudience(String audience) {
    this.audience = audience;
  }
}
