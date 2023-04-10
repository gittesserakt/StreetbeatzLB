package de.hhn.se.labswp.streetbeatzlb_backend.models;

import jakarta.persistence.*;

import java.sql.Time;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
public class Performance {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long performance_id;
  private String date_time;
  private String created_by;
  private Long group_id;
  private Long stage_id;

  public Long getPerformance_id() {
    return performance_id;
  }

  public void setPerformance_id(Long performance_id) {
    this.performance_id = performance_id;
  }

  public LocalDateTime getDate_time() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    return LocalDateTime.parse(date_time,formatter);
  }

  public void setDate_time(LocalDateTime date_time) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    this.date_time = date_time.format(formatter);
  }

  public String getCreated_by() {
    return created_by;
  }

  public void setCreated_by(String created_by) {
    this.created_by = created_by;
  }

  public Long getGroup_id() {
    return group_id;
  }

  public void setGroup_id(Long group_id) {
    this.group_id = group_id;
  }

  public Long getStage_id() {
    return stage_id;
  }

  public void setStage_id(Long stage_id) {
    this.stage_id = stage_id;
  }
}
