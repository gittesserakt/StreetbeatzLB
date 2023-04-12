package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.Performance;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceFilter;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Controller
@RequestMapping(path="/api/performances")
@CrossOrigin(origins = "*")
public class PerformanceController {
  @Autowired
  private PerformanceRepository performanceRepository;

  @GetMapping(path="/all")
  public @ResponseBody Iterable<Performance> getAllPerformances() {
    return sortPerformances(performanceRepository.findAll());
  }

  @GetMapping(path="/filtered")
  public @ResponseBody Iterable<Performance> getFilteredPerformances(@RequestParam String time,
                                                                     @RequestParam int artist, @RequestParam int stage) {
    LocalDateTime newTime = null;
    if(!time.equals("0")){
      newTime = LocalDateTime.parse(time);
    }

    return sortPerformances(PerformanceFilter.filterPerformances(performanceRepository, newTime, artist, stage));
  }

  private Iterable<Performance> sortPerformances(Iterable<Performance> performances){

    List<Performance> sortedPerformances = (List<Performance>) performances;

    Comparator<Performance> startTimeComparator = Comparator.comparing(Performance::getStart_time);
    Comparator<Performance> stageComparator = Comparator.comparing(Performance::getStage_id);

    sortedPerformances.sort(startTimeComparator.thenComparing(stageComparator));

    return sortedPerformances;
  }
}