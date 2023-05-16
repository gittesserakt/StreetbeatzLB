package de.hhn.se.labswp.streetbeatzlb_backend.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PerformanceFilter {

  public static List<Performance> filterPerformancesByID(PerformanceRepository performanceRepository,
                                                         LocalDateTime dateTime, int artist, int stage) {
    Iterable<Performance> performances = performanceRepository.findAll();

    return filter(performances, dateTime, artist, stage);
  }

  public static List<Performance> filterPerformancesByName(PerformanceRepository performanceRepository,
                                                           ArtistRepository artistRepository,
                                                           StageRepository stageRepository,
                                                           LocalDateTime dateTime, String artist, String stage) {
    Iterable<Performance> performances = performanceRepository.findAll();

    Iterable<Artist> artists = artistRepository.findAll();

    Iterable<Stage> stages = stageRepository.findAll();

    artist = artist.replace('_', ' ');

    long artistID = 0;
    long stageID = 0;

    for (Artist currentArtist : artists) {
      if (currentArtist.getName().equals(artist)) {
        artistID = currentArtist.getArtist_id();
        break;
      }
    }

    for (Stage currentStage : stages) {
      if (currentStage.getName().equals(stage)) {
        stageID = currentStage.getStage_id();
        break;
      }
    }

    return filter(performances, dateTime, (int) artistID, (int) stageID);
  }

  /**
   * @param dateTime enthält Uhrzeit und Datum die getrennt voneinander zu filtern sind.
   *                 Ist das Datum auf das Jahr 1970 gesetzt dann ist das Datum, also der Monat nicht relevant.
   *                 Selbes gilt, wenn die Uhrzeit auf 00:00 Uhr gesetzt ist, da das Festival nur bis 23 Uhr geht
   */
  private static List<Performance> filter(Iterable<Performance> performances, LocalDateTime dateTime, int artist, int stage) {
    List<Performance> filteredPerformances = new ArrayList<>();
    for (Performance performance : performances) {
      if ((dateTime.getYear() < 1972
           || performance.getStart_time().getDayOfMonth() == dateTime.getDayOfMonth())
          && (dateTime.getHour() == 0
              || (performance.getStart_time().getHour() == dateTime.getHour()
                  && performance.getStart_time().getMinute() == dateTime.getMinute())
          )
          && (performance.getArtist_id() == artist || artist == 0)
          && (performance.getStage_id() == stage || stage == 0)) {
        filteredPerformances.add(performance);
      }
    }
    return filteredPerformances;
  }
}
