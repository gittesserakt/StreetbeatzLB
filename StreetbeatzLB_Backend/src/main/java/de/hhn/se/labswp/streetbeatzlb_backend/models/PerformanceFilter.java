package de.hhn.se.labswp.streetbeatzlb_backend.models;

import javax.xml.crypto.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PerformanceFilter {

  public static List<Performance> filterPerformancesByID(PerformanceRepository performanceRepository,
                                                         LocalDateTime dateDate, LocalDateTime timeDate,
                                                         int artist, int stage) {
    Iterable<Performance> performances = performanceRepository.findAll();

    return filter(performances, dateDate, dateDate, artist, stage);
  }

  public static List<Performance> filterPerformancesByName(PerformanceRepository performanceRepository,
                                                           ArtistRepository artistRepository,
                                                           StageRepository stageRepository,
                                                           LocalDateTime dateDate, LocalDateTime timeDate,
                                                           String artist, String stage) {
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

    return filter(performances, dateDate, timeDate, (int) artistID, (int) stageID);
  }

  /**
   * Die Zeit wird mit der StartZeit der Performance verglichen, die endzeit ist egal
   *
   * @param dateDate enthält Uhrzeit und Datum die getrennt voneinander zu filtern sind.
   *                 Ist das Datum auf das Jahr 1970 gesetzt dann ist das Datum, also der Monat nicht relevant.
   *                 Selbes gilt, wenn die Uhrzeit auf 00:00 Uhr gesetzt ist, da das Festival nur bis 23 Uhr geht
   * @param timeDate enthält nur die Zeit also Stunden und Minuten das Datum ist irrelevant.
   */
  private static List<Performance> filter(Iterable<Performance> performances, LocalDateTime dateDate,
                                          LocalDateTime timeDate, int artist, int stage) {
    List<Performance> filteredPerformances = new ArrayList<>();
    LocalDateTime both;
    boolean isDateNull;
    if (timeDate == null && dateDate == null) { //both dates not set
      for (Performance performance : performances) {
        if (artist == 0 || performance.getArtist_id() == artist) {
          if (stage == 0 || performance.getStage_id() == stage) {
            filteredPerformances.add(performance);
          }
        }
      }
      return filteredPerformances;

    } else if (timeDate == null) { // only dateDate is set
      both = dateDate;
      return getPerformances(performances, artist, stage, filteredPerformances, both);
    } else if (dateDate == null) { // only timeDate is set
      both = LocalDateTime.now().withHour(timeDate.getHour()).withMinute(timeDate.getMinute());
      return getPerformances(performances, artist, stage, filteredPerformances, both);
    } else { // both parameters are set
      both = dateDate.withHour(timeDate.getHour()).withMinute(timeDate.getMinute());
      return getPerformances(performances, artist, stage, filteredPerformances, both);
    }
    // TODO: 20.05.2023 for schleife neu bauen, auch performanter,
    //  dass innerhalb der Forschleife weniger abgeprüft werden muss
  }

  private static List<Performance> getPerformances(Iterable<Performance> performances, int artist, int stage, List<Performance> filteredPerformances, LocalDateTime both) {
    for (Performance performance : performances) {
      if (artist == 0 || performance.getArtist_id() == artist) {
        if (stage == 0 || performance.getStage_id() == stage) {
          if (performance.getStart_time().isAfter(both)) {                                                  //Caution potential Error here
            filteredPerformances.add(performance);
          }
        }
      }
    }
    return filteredPerformances;
  }
}
