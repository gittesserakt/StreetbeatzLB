package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.Stage;
import de.hhn.se.labswp.streetbeatzlb_backend.models.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/api/stages")
@CrossOrigin(origins = "*")
public class StageController {
    @Autowired
    private StageRepository stageRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Stage> getAllStages() {
        return stageRepository.findAll();
    }

    @GetMapping(path="/stageByID")
    public @ResponseBody Optional<Stage> getStageByID(@RequestParam int stage_id) {
        return stageRepository.findById(stage_id);
    }

    @GetMapping(path="/stageByName")
    public @ResponseBody Optional<Stage> getStageByName(@RequestParam String stage) {

        Iterable<Stage> stages = stageRepository.findAll();

        int stageID = 0;

        for(Stage currentStage : stages) {
            if(currentStage.getName().equals(stage)){
                stageID = Math.toIntExact(currentStage.getStage_id());
                break;
            }
        }

        return stageRepository.findById(stageID);
    }
}