package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.Performance;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceRepository;
import de.hhn.se.labswp.streetbeatzlb_backend.models.Stage;
import de.hhn.se.labswp.streetbeatzlb_backend.models.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/api/stage")
@CrossOrigin(origins = "*")
public class StageController {
    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private PerformanceRepository performanceRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Stage> getAllStages() {
        return stageRepository.findAll();
    }

    @GetMapping(path="/stageByID")
    public @ResponseBody Stage getStageByID(@RequestParam int performanceID) {
        Iterable<Performance> performances = performanceRepository.findAll();
        Iterable<Stage> stages = stageRepository.findAll();

        Stage returnStage = null;

        for(Performance performance : performances){
            if(performance.getPerformance_id() == performanceID){
                for(Stage stage : stages){
                    if(stage.getStage_id() == performance.getStage_id()){
                        returnStage = stage;
                    }
                }
            }
        }

        return returnStage;
    }
}