package de.hhn.se.labswp.streetbeatzlb_backend.models;

import jakarta.persistence.*;

@Entity
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long artist_id;
    private String name;
    private Long vote_count;

    public Long getArtist_id() {
        return artist_id;
    }

    public void setArtist_id(Long artist_id) {
        this.artist_id = artist_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getVote_count() {
        return vote_count;
    }

    public void setVote_count(Long vote_count) {
        this.vote_count = vote_count;
    }
}
