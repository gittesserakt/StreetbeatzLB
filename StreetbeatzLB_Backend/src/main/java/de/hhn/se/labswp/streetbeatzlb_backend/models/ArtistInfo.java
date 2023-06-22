package de.hhn.se.labswp.streetbeatzlb_backend.models;

import jakarta.persistence.*;

@Entity
public class ArtistInfo {

    @Id
    private Long artist_id;
    @Lob
    private byte[] image;
    private String smf;
    private String homepage;
    private String facebook;
    private String instagram;
    private String youTube;
    private String spotify;
    private String genre;

    public Long getArtist_id() {
        return artist_id;
    }

    public void setArtist_id(Long artist_id) {
        this.artist_id = artist_id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getSmfLink() {
        return smf;
    }

    public void setSmflink(String smf) {
        this.smf = smf;
    }

    public String getHomepage() {
        return homepage;
    }

    public void setHomepage(String homepage) {
        this.homepage = homepage;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getYouTube() {
        return youTube;
    }

    public void setYouTube(String youTube) {
        this.youTube = youTube;
    }

    public String getSpotify() {
        return spotify;
    }

    public void setSpotify(String spotify) {
        this.spotify = spotify;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}
