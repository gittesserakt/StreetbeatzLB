package de.hhn.se.labswp.streetbeatzlb_backend.models;

import jakarta.persistence.*;

@Entity
public class Stage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long stage_id;
    private String name;
    private double stage_size;

    public Long getStage_id() {
        return stage_id;
    }

    public void setStage_id(Long stage_id) {
        this.stage_id = stage_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getStage_size() {
        return stage_size;
    }

    public void setStage_size(float stage_size) {
        this.stage_size = stage_size;
    }
}
