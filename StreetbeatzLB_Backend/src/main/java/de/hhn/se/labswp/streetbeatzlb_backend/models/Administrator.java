package de.hhn.se.labswp.streetbeatzlb_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Administrator {

  @Id
  private String identifier;
  private String email;
  private String admin_name;
  private String picture;

  public String getIdentifier() {
    return identifier;
  }

  public void setIdentifier(String identifier) {
    this.identifier = identifier;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getAdmin_name() {
    return admin_name;
  }

  public void setAdmin_name(String admin_name) {
    this.admin_name = admin_name;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Administrator that = (Administrator) o;
    return Objects.equals(identifier, that.identifier) && Objects.equals(email, that.email) && Objects.equals(admin_name, that.admin_name) && Objects.equals(picture, that.picture);
  }

  @Override
  public int hashCode() {
    return Objects.hash(identifier, email, admin_name, picture);
  }
}