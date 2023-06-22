package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.Artist;
import de.hhn.se.labswp.streetbeatzlb_backend.models.ArtistRepository;
import de.hhn.se.labswp.streetbeatzlb_backend.models.Performance;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceFilter;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceRepository;
import de.hhn.se.labswp.streetbeatzlb_backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.*;

import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Controller
@RequestMapping(path="/api/verbose_performances")
@CrossOrigin(origins = "*")
public class VerbosePerformanceController {
    @Autowired
    private PerformanceRepository performanceRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private StageRepository stageRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<VerbosePerformance> getAllPerformances(@RequestParam Integer id) {
        return sortPerformances(performanceRepository.findAll(), id);
    }

    @GetMapping(path="/performanceByID")
    public @ResponseBody Optional<VerbosePerformance> getPerformanceByID(@RequestParam Integer performance_id) {
        Optional<Performance> performance = performanceRepository.findById(performance_id);
        if (performance.isPresent()){
            return Optional.of(performanceToVerbosePerformance(performanceRepository.findById(performance_id).get()));
        } else {
            return Optional.empty();
        }
    }

    @GetMapping(path="/filteredByID")
    public @ResponseBody Iterable<VerbosePerformance> getFilteredPerformancesByID(@RequestParam String dateString,
                                                                                  @RequestParam String timeString,
                                                                                  @RequestParam String artist_id,
                                                                                  @RequestParam String stage_id,
                                                                                  @RequestParam Integer id) {
        Iterable<Performance> performances = performanceRepository.findAll();
        return sortPerformances(PerformanceFilter.filterPerformancesByID(performances,
                dateString, timeString, Integer.parseInt(artist_id), Integer.parseInt(stage_id)), id);
    }

    @GetMapping(path="/filteredByName")
    public @ResponseBody Iterable<VerbosePerformance> getFilteredPerformancesByName(@RequestParam String dateString,
                                                                                    @RequestParam String timeString,
                                                                                    @RequestParam String artistName,
                                                                                    @RequestParam String stageName,
                                                                                    @RequestParam Integer id) {
        Iterable<Performance> performances = performanceRepository.findAll();
        return sortPerformances(PerformanceFilter.filterPerformancesByName(performances,
                artistRepository, stageRepository, dateString, timeString, artistName, stageName), id);
    }

    private Iterable<VerbosePerformance> sortPerformances(Iterable<Performance> performances, Integer amountPreviouslyLoaded){
        List<Artist> artists = (List<Artist>) artistRepository.findAll();

        Map<Long, String> artistNameMap = artists.stream()
                .collect(Collectors.toMap(Artist::getArtist_id, Artist::getName));

        Iterable<Performance> sortedPerformances = StreamSupport.stream(performances.spliterator(), false)
                .sorted(Comparator.comparing(Performance::getStart_time)
                        .thenComparing(p -> artistNameMap.getOrDefault(p.getArtist_id(), "")))
                .collect(Collectors.toList());

        List<VerbosePerformance> sortedVerbosePerformances = new ArrayList<>();

        int addedPerformances = 0;
        int skippedPerformances = 0;

        for (Performance performance : sortedPerformances) {
            if (skippedPerformances >= amountPreviouslyLoaded) {
                if (addedPerformances < 20){
                    sortedVerbosePerformances.add(performanceToVerbosePerformance(performance));
                    addedPerformances++;
                } else {
                    break;
                }
            } else {
                skippedPerformances++;
            }
        }

        return sortedVerbosePerformances;
    }

    private VerbosePerformance performanceToVerbosePerformance(Performance performance) {
        List<Artist> artists = (List<Artist>) artistRepository.findAll();
        List<Stage> stages = (List<Stage>) stageRepository.findAll();
        VerbosePerformance verbosePerformance = new VerbosePerformance();
        verbosePerformance.setPerformance_id(performance.getPerformance_id());
        verbosePerformance.setCreated_by(performance.getCreated_by());
        verbosePerformance.setStart_time(performance.getStart_time());
        verbosePerformance.setEnd_time(performance.getEnd_time());
        for (Artist artist : artists) {
            if (artist.getArtist_id().equals(performance.getArtist_id())){
                verbosePerformance.setArtist_id(artist.getName());
                break;
            }
        }
        for (Stage stage : stages) {
            if (stage.getStage_id().equals(performance.getStage_id())) {
                verbosePerformance.setStage_id(stage.getName());
                break;
            }
        }
        return verbosePerformance;
    }
}
