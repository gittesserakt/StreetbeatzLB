package de.hhn.se.labswp.streetbeatzlb_backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
public class VerbosePerformance {

    @Id
    private Long performance_id;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private String start_time;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private String end_time;
    private String created_by;
    private String artist_id;
    private String stage_id;

    public Long getPerformance_id() {
        return performance_id;
    }

    public void setPerformance_id(Long performance_id) {
        this.performance_id = performance_id;
    }

    public LocalDateTime getStart_time() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(start_time,formatter);
    }

    public void setStart_time(LocalDateTime date_time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.start_time = date_time.format(formatter);
    }

    public LocalDateTime getEnd_time() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(end_time,formatter);
    }

    public void setEnd_time(LocalDateTime date_time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.end_time = date_time.format(formatter);
    }

    public String getCreated_by() {
        return created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public String getArtist_id() {
        return artist_id;
    }

    public void setArtist_id(String artist_id) {
        this.artist_id = artist_id;
    }

    public String getStage_id() {
        return stage_id;
    }

    public void setStage_id(String stage_id) {
        this.stage_id = stage_id;
    }
}
