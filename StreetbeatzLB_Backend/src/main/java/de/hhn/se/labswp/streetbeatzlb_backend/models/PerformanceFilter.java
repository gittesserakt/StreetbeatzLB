package de.hhn.se.labswp.streetbeatzlb_backend.models;

import javax.xml.crypto.Data;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class PerformanceFilter {

  public static List<Performance> filterPerformancesByID(PerformanceRepository performanceRepository,
                                                         String dateString, String timeString,
                                                         int artist, int stage) {
    Iterable<Performance> performances = performanceRepository.findAll();

    return filter(performances, dateString, timeString, artist, stage);
  }

  public static List<Performance> filterPerformancesByName(PerformanceRepository performanceRepository,
                                                           ArtistRepository artistRepository,
                                                           StageRepository stageRepository,
                                                           String dateString, String timeString,
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

    return filter(performances, dateString, timeString, (int) artistID, (int) stageID);
  }

  /**
   * Die Zeit wird mit der StartZeit der Performance verglichen, die endzeit ist egal
   *
   * @param dateString enthält Uhrzeit und Datum die getrennt voneinander zu filtern sind.
   *                 Ist das Datum auf das Jahr 1970 gesetzt dann ist das Datum, also der Monat nicht relevant.
   *                 Selbes gilt, wenn die Uhrzeit auf 00:00 Uhr gesetzt ist, da das Festival nur bis 23 Uhr geht
   * @param timeString enthält nur die Zeit also Stunden und Minuten das Datum ist irrelevant.
   *
   *                 LocalDateTime dateDate = null;
   *     LocalDateTime timeDate = null;
   *     if (!dateString.equals("0")) {
   *       dateDate = LocalDateTime.parse(dateString, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
   *     }
   *     if(!timeString.equals("0")){
   *       timeDate = LocalDateTime.parse(timeString,DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
   *     }
   */
  private static List<Performance> filter(Iterable<Performance> performances, String dateString,
                                          String timeString, int artist, int stage) {
    List<Performance> filteredPerformances = (List<Performance>) performances;

    LocalDateTime date;
    LocalDateTime time;

    if (artist != 0) {
      List<Performance> filteredPerformancesArtist = new ArrayList<>();
      for (Performance performance : performances){
        if (performance.getArtist_id() == artist) {
          filteredPerformancesArtist.add(performance);
        }
      }
      filteredPerformances.retainAll(filteredPerformancesArtist);
    }
    if (stage != 0) {
      List<Performance> filteredPerformancesStage = new ArrayList<>();
      for (Performance performance : performances){
        if (performance.getStage_id() == stage) {
          filteredPerformancesStage.add(performance);
        }
      }
      filteredPerformances.retainAll(filteredPerformancesStage);
    }
    if(!dateString.equals("0")) {
      date = LocalDateTime.parse(dateString,DateTimeFormatter.ofPattern("dd/MM/yyyy,_HH:mm"));
      List<Performance> filteredPerformancesDate = new ArrayList<>();
      for (Performance performance : performances){
        if (performance.getStart_time().toLocalDate().equals(date.toLocalDate()) || performance.getStart_time().toLocalDate().isAfter(date.toLocalDate())){
          filteredPerformancesDate.add(performance);
        }
      }
      filteredPerformances.retainAll(filteredPerformancesDate);
    }
    if(!timeString.equals("0")) {
      time = LocalDateTime.parse(timeString,DateTimeFormatter.ofPattern("dd/MM/yyyy,_HH:mm"));
      List<Performance> filteredPerformancesTime = new ArrayList<>();
      for (Performance performance : performances){
        if (performance.getStart_time().toLocalTime().equals(time.toLocalTime()) || performance.getStart_time().toLocalTime().isAfter(time.toLocalTime())){
          filteredPerformancesTime.add(performance);
        }
      }
      filteredPerformances.retainAll(filteredPerformancesTime);
    }

    return filteredPerformances;
  }
}
