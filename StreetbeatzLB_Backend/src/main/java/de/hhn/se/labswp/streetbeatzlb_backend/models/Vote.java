package de.hhn.se.labswp.streetbeatzlb_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Vote {

    @Id
    private Long id;
    private String email;
    private Long artist_id;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getArtist_id() {
        return artist_id;
    }

    public void setArtist_id(Long artist_id) {
        this.artist_id = artist_id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
