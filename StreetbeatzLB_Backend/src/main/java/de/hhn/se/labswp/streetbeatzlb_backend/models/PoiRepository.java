package de.hhn.se.labswp.streetbeatzlb_backend.models;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoiRepository extends CrudRepository<Poi, Integer> {
}