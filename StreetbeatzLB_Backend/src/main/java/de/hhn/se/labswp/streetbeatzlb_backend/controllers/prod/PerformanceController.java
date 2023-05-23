package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.Artist;
import de.hhn.se.labswp.streetbeatzlb_backend.models.ArtistRepository;
import de.hhn.se.labswp.streetbeatzlb_backend.models.Performance;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceFilter;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceRepository;
import de.hhn.se.labswp.streetbeatzlb_backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.time.format.DateTimeFormatter;
import java.util.*;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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
    return sortPerformances(performanceRepository.findAll());
  }

  @GetMapping(path="/performanceByID")
  public @ResponseBody Optional<Performance> getPerformanceByID(@RequestParam Integer performance_id) {
    return performanceRepository.findById(performance_id);
  }

  @GetMapping(path="/filteredByID")
  public @ResponseBody Iterable<Performance> getFilteredPerformancesByID(@RequestParam String dateString,
                                                                         @RequestParam String timeString,
                                                                         @RequestParam String artist_id,
                                                                         @RequestParam String stage_id) {
    LocalDateTime dateDate = null;
    LocalDateTime timeDate = null;
    if (!dateString.equals("0")) {
      dateDate = LocalDateTime.parse(dateString, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
    }
    if(!timeString.equals("0")){
      timeDate = LocalDateTime.parse(timeString,DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
    }

    return sortPerformances(PerformanceFilter.filterPerformancesByID(performanceRepository,
            dateDate, timeDate, Integer.parseInt(artist_id), Integer.parseInt(stage_id)));
  }

  @GetMapping(path="/filteredByName")
  public @ResponseBody Iterable<Performance> getFilteredPerformancesByName(@RequestParam String dateString,
                                                                           @RequestParam String timeString,
                                                                           @RequestParam String artistName,
                                                                           @RequestParam String stageName) {
    LocalDateTime dateDate = null;
    LocalDateTime timeDate = null;
    if (!dateString.equals("0")) {
      dateDate = LocalDateTime.parse(dateString, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
    }
    if(!timeString.equals("0")){
      timeDate = LocalDateTime.parse(timeString,DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
    }

    return sortPerformances(PerformanceFilter.filterPerformancesByName(performanceRepository,
            artistRepository, stageRepository, dateDate, timeDate, artistName, stageName));
  }

  @DeleteMapping(path="/delete")
  public @ResponseBody void deletePerformance(@RequestParam int performanceID) {
    performanceRepository.deleteById(performanceID);
  }

  @DeleteMapping(path="/bulkDelete")
  public @ResponseBody void bulkDeletePerformances(@RequestParam String performanceIDs) {
    String[] numbersArray = performanceIDs.split("_");

    for (String s : numbersArray) {
      performanceRepository.deleteById(Integer.parseInt(s));
    }
  }

  @PostMapping(path="/add")
  public @ResponseBody void addPerformance(@RequestParam String start_time, @RequestParam String end_time,
                                                  @RequestParam String created_by, @RequestParam Long artist_id,
                                                  @RequestParam Long stage_id) {

    Performance performance = new Performance();
    performance.setStart_time(LocalDateTime.parse(start_time));
    performance.setEnd_time(LocalDateTime.parse(end_time));
    performance.setCreated_by(created_by);
    performance.setArtist_id(artist_id);
    performance.setStage_id(stage_id);

    performanceRepository.save(performance);
  }

  @PutMapping(path="/edit")
  public @ResponseBody void editPerformance(@RequestParam Integer performance_id,
                                                   @RequestParam String start_time, @RequestParam String end_time,
                                                   @RequestParam String artist_id, @RequestParam String stage_id) {

    Optional<Performance> optionalPerformance = performanceRepository.findById(performance_id);
    if (optionalPerformance.isEmpty()) {
      // Return an error response if the performance ID is invalid
      throw new IllegalArgumentException("Performance not found for ID: " + performance_id);
    }

    // Update the performance fields with the new values
    Performance performance = optionalPerformance.get();

    if(!start_time.equals("0")) {
      performance.setStart_time(LocalDateTime.parse(start_time));
    }
    if(!end_time.equals("0")) {
      performance.setEnd_time(LocalDateTime.parse(end_time));
    }

    Iterable<Artist> artists = artistRepository.findAll();

    Iterable<Stage> stages = stageRepository.findAll();

    artist_id = artist_id.replace('_', ' ');

    if(!artist_id.equals("0")){
      for(Artist currentArtist : artists) {
        if(currentArtist.getArtist_id().toString().equals(artist_id)){
          performance.setArtist_id(currentArtist.getArtist_id());
          break;
        }
      }
    }
    if(!stage_id.equals("0")){
      for(Stage currentStage : stages) {
        if(currentStage.getStage_id().toString().equals(stage_id)){
          performance.setStage_id(currentStage.getStage_id());
          break;
        }
      }
    }

    performanceRepository.save(performance);
  }

  private Iterable<Performance> sortPerformances(Iterable<Performance> performances){
    List<Artist> artists = (List<Artist>) artistRepository.findAll();

    Map<Long, String> artistNameMap = artists.stream()
            .collect(Collectors.toMap(Artist::getArtist_id, Artist::getName));

    return StreamSupport.stream(performances.spliterator(), false)
            .sorted(Comparator.comparing(Performance::getStart_time)
                    .thenComparing(p -> artistNameMap.getOrDefault(p.getArtist_id(), "")))
            .collect(Collectors.toList());
  }
}
