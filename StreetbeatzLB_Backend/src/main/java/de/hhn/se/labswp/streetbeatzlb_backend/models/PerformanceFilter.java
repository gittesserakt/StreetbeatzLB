package de.hhn.se.labswp.streetbeatzlb_backend.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PerformanceFilter {

    public static List<Performance> filterPerformances(PerformanceRepository performanceRepository,
                                                       LocalDateTime time, int artist, int stage) {
        List<Performance> filteredPerformances = new ArrayList<>();
        Iterable<Performance> performances = performanceRepository.findAll();

        for (Performance performance : performances) {
            if ((performance.getStart_time().equals(time) || time == null) && (performance.getArtist_id() == artist || artist == 0) && (performance.getStage_id() == stage || stage == 0)) {
                filteredPerformances.add(performance);
            }
        }

        return filteredPerformances;
    }
}
