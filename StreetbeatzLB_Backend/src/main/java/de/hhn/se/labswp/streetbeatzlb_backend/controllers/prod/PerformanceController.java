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
import java.util.Map;
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
  public @ResponseBody Iterable<Performance> getFilteredPerformancesByID(@RequestParam String time,
                                                                     @RequestParam int artist_id,
                                                                         @RequestParam int stage_id) {
    LocalDateTime newDateTime = null;
    if(!time.equals("0")){
      newDateTime = LocalDateTime.parse(time);
    }

    return sortPerformances(PerformanceFilter.filterPerformancesByID(performanceRepository,
            newDateTime, artist_id, stage_id));
  }

  @GetMapping(path="/filteredByName")
  public @ResponseBody Iterable<Performance> getFilteredPerformancesByName(@RequestParam String time,
                                                                           @RequestParam String artist_id,
                                                                           @RequestParam String stage_id) {
    LocalDateTime newDateTime = null;
    if (!time.equals("0")) {
      newDateTime = LocalDateTime.parse(time, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
    }

    return sortPerformances(PerformanceFilter.filterPerformancesByName(performanceRepository,
            artistRepository, stageRepository, newDateTime, artist_id, stage_id));
  }

  @GetMapping(path="/delete")
  public @ResponseBody void deletePerformance(@RequestParam int performanceID) {
    performanceRepository.deleteById(performanceID);
  }

  @GetMapping(path="/add")
  public @ResponseBody Performance addPerformance(@RequestParam String start_time, @RequestParam String end_dateTime,
                                                  @RequestParam String created_by, @RequestParam Long artist_id,
                                                  @RequestParam Long stage_id) {

    Performance performance = new Performance();
    performance.setStart_time(LocalDateTime.parse(start_time));
    performance.setEnd_time(LocalDateTime.parse(end_dateTime));
    performance.setCreated_by(created_by);
    performance.setArtist_id(artist_id);
    performance.setStage_id(stage_id);

    return performanceRepository.save(performance);
  }

  @GetMapping(path="/edit")
  public @ResponseBody Performance editPerformance(@RequestParam Integer performance_id,
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
        if(currentArtist.getName().equals(artist_id)){
          performance.setArtist_id(currentArtist.getArtist_id());
          break;
        }
      }
    }
    if(!stage_id.equals("0")){
      for(Stage currentStage : stages) {
        if(currentStage.getName().equals(stage_id)){
          performance.setStage_id(currentStage.getStage_id());
          break;
        }
      }
    }

    return performanceRepository.save(performance);
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