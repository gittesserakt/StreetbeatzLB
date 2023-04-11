package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.Performance;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceRepository;
import de.hhn.se.labswp.streetbeatzlb_backend.models.Group;
import de.hhn.se.labswp.streetbeatzlb_backend.models.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/api/group")
@CrossOrigin(origins = "*")
public class GroupController {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private PerformanceRepository performanceRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    @GetMapping(path="/groupByID")
    public @ResponseBody Group getGroupByID(@RequestParam int performanceID) {
        Iterable<Performance> performances = performanceRepository.findAll();
        Iterable<Group> groups = groupRepository.findAll();

        Group returnGroup = null;

        for(Performance performance : performances){
            if(performance.getPerformance_id() == performanceID){
                for(Group group : groups){
                    if(group.getGroup_id() == performance.getGroup_id()){
                        returnGroup = group;
                    }
                }
            }
        }

        return returnGroup;
    }
}
