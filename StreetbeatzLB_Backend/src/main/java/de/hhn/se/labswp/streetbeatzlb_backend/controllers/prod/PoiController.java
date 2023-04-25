package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.Poi;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PoiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/api/pois")
@CrossOrigin(origins = "*")
public class PoiController {
    @Autowired
    private PoiRepository poiRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Poi> getAllPOIs() {
        return poiRepository.findAll();
    }

    @GetMapping(path="/poiByID")
    public @ResponseBody Optional<Poi> getPOIByID(@RequestParam int poiID) {
        return poiRepository.findById(poiID);
    }
}
