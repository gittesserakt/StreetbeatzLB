package de.hhn.se.labswp.streetbeatzlb_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Poi {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long poi_id;
    private String name;
    private String icon;
    private Long poi_type;
    private double latitude;
    private double longitude;

    public Long getPoi_id() {
        return poi_id;
    }

    public void setPoi_id(Long poi_id) {
        this.poi_id = poi_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Long getPoi_type() {
        return poi_type;
    }

    public void setPoi_type(Long poi_type) {
        this.poi_type = poi_type;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
