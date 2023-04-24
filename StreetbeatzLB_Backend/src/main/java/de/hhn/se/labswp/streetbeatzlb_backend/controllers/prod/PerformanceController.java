package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Controller
@RequestMapping(path="/api/performances")
@CrossOrigin(origins = "*")
public class PerformanceController {
  @Autowired
  private PerformanceRepository performanceRepository;

  @Autowired
  private ArtistRepository artistRepository;

  @Autowired
  private StageRepository stageRepository;

  @GetMapping(path="/all")
  public @ResponseBody Iterable<Performance> getAllPerformances() {
    return performanceRepository.findAll();
  }

  @GetMapping(path="/filteredByID")
  public @ResponseBody Iterable<Performance> getFilteredPerformancesByID(@RequestParam String time,
                                                                     @RequestParam int artist, @RequestParam int stage) {
    LocalDateTime newTime = null;
    if(!time.equals("0")){
      newTime = LocalDateTime.parse(time);
    }

    return PerformanceFilter.filterPerformancesByID(performanceRepository, newTime, artist, stage);
  }

  @GetMapping(path="/filteredByName")
  public @ResponseBody Iterable<Performance> getFilteredPerformancesByName(@RequestParam String time,
                                                                     @RequestParam String artist, @RequestParam String stage) {
    LocalDateTime newTime = null;
    if(!time.equals("0")){
      newTime = LocalDateTime.parse(time);
    }

    return PerformanceFilter.filterPerformancesByName(performanceRepository, artistRepository, stageRepository, newTime, artist, stage);
  }
}