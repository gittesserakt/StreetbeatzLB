package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.Performance;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/listview")
public class PerformanceController {
  @Autowired
  private PerformanceRepository performanceRepository;

  @GetMapping(path="/allPerformances")
  public @ResponseBody Iterable<Performance> getAllPerformances() {
    return performanceRepository.findAll();
  }
}
