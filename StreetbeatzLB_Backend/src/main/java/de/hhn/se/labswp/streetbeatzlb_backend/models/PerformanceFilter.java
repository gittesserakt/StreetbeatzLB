package de.hhn.se.labswp.streetbeatzlb_backend.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PerformanceFilter {

    public static List<Performance> filterPerformancesByID(PerformanceRepository performanceRepository,
                                                       LocalDateTime time, int artist, int stage) {
        Iterable<Performance> performances = performanceRepository.findAll();

        return filter(performances, time, artist, stage);
    }

    public static List<Performance> filterPerformancesByName(PerformanceRepository performanceRepository,
                                                       ArtistRepository artistRepository,
                                                       StageRepository stageRepository,
                                                       LocalDateTime time, String artist, String stage) {
        Iterable<Performance> performances = performanceRepository.findAll();

        Iterable<Artist> artists = artistRepository.findAll();

        Iterable<Stage> stages = stageRepository.findAll();

        artist = artist.replace('_', ' ');

        long artistID = 0;
        long stageID = 0;

        for(Artist currentArtist : artists) {
            if(currentArtist.getName().equals(artist)){
                artistID = currentArtist.getArtist_id();
                break;
            }
        }

        for(Stage currentStage : stages) {
            if(currentStage.getName().equals(stage)){
                stageID = currentStage.getStage_id();
                break;
            }
        }

        return filter(performances, time, (int) artistID, (int) stageID);
    }

    private static List<Performance> filter(Iterable<Performance> performances, LocalDateTime time, int artist, int stage){
        List<Performance> filteredPerformances = new ArrayList<>();
        for (Performance performance : performances) {
            if ((performance.getStart_time().equals(time) || time == null)
                    && (performance.getArtist_id() == artist || artist == 0)
                    && (performance.getStage_id() == stage || stage == 0)) {
                filteredPerformances.add(performance);
            }
        }
        return filteredPerformances;
    }
}
