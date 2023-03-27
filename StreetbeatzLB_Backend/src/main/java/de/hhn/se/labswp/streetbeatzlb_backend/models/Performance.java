package de.hhn.se.labswp.streetbeatzlb_backend.models;

import jakarta.persistence.*;

import java.sql.Time;

@Entity
public class Performance {

  @Id
  @Column(name="PerormanceNo")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name="CreatorIdentifier")
  private String creatorName;

  @Column(name="StageStageNo")
  private char stageNr;

  public String getCreatorName() {
    return creatorName;
  }

  public void setCreatorName(String creatorName) {
    this.creatorName = creatorName;
  }

  public char getStageNr() {
    return stageNr;
  }

  public void setStageNr(char stageNr) {
    this.stageNr = stageNr;
  }

  public Time getTime() {
    return time;
  }

  public void setTime(Time time) {
    this.time = time;
  }

  @Column(name="Time")
  private Time time;

  public void setId(Long id) {
    this.id = id;
  }

  @Id
  public Long getId() {
    return id;
  }
}
