package de.hhn.se.labswp.streetbeatzlb_backend.config.security;

import de.hhn.se.labswp.streetbeatzlb_backend.config.ApplicationProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

  private final AuthenticationErrorHandler authenticationErrorHandler;

  private final OAuth2ResourceServerProperties resourceServerProps;

  private final ApplicationProperties applicationProps;

  @Bean
  public SecurityFilterChain httpSecurity(final HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable()
      .authorizeHttpRequests()
      .requestMatchers(
        new AntPathRequestMatcher("/api/voting/vote", HttpMethod.PUT.toString())
      ).permitAll()
      .requestMatchers(
        new AntPathRequestMatcher("/api/**", HttpMethod.POST.toString()),
        new AntPathRequestMatcher("/api/**", HttpMethod.PUT.toString()),
        new AntPathRequestMatcher("/api/**", HttpMethod.DELETE.toString()),
        new AntPathRequestMatcher("/api/administrators/**")
      ).authenticated()
      .anyRequest().permitAll()
      .and()
      .oauth2ResourceServer()
        .authenticationEntryPoint(authenticationErrorHandler)
          .jwt()
            .decoder(makeJwtDecoder());
    return http.build();
  }

  private JwtDecoder makeJwtDecoder() {
    final var issuer = resourceServerProps.getJwt().getIssuerUri() + "/";
    final var decoder = JwtDecoders.<NimbusJwtDecoder>fromIssuerLocation(issuer);
    final var withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
    final var tokenValidator = new DelegatingOAuth2TokenValidator<>(withIssuer, this::withAudience);

    decoder.setJwtValidator(tokenValidator);
    return decoder;
  }

  private OAuth2TokenValidatorResult withAudience(final Jwt token) {
    final var audienceError = new OAuth2Error(
      OAuth2ErrorCodes.INVALID_TOKEN,
      "The token was not issued for the given audience",
      "https://datatracker.ietf.org/doc/html/rfc6750#section-3.1"
    );

    return token.getAudience().contains(applicationProps.getAudience())
      ? OAuth2TokenValidatorResult.success()
      : OAuth2TokenValidatorResult.failure(audienceError);
  }
}
