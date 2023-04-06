package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.Performance;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceFilter;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/api/performances")
@CrossOrigin(origins = "*")
public class PerformanceController {
  @Autowired
  private PerformanceRepository performanceRepository;

  @GetMapping(path="/all")
  public @ResponseBody Iterable<Performance> getAllPerformances() {
    return performanceRepository.findAll();
  }

  @GetMapping(path="/filtered")
  public @ResponseBody Iterable<Performance> getFilteredPerformances(@RequestParam String time,
                                                                     @RequestParam int group, @RequestParam int stage) {
    if(time.equals("0")){
      time = null;
    }

    return PerformanceFilter.filterPerformances(performanceRepository, time, group, stage);
  }
}