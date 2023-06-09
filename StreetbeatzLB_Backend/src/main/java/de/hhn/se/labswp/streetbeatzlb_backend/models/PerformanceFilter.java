package de.hhn.se.labswp.streetbeatzlb_backend.models;

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
        if (performance.getStart_time().toLocalDate().equals(date.toLocalDate())){
          filteredPerformancesDate.add(performance);
        }
      }
      filteredPerformances.retainAll(filteredPerformancesDate);
    }
    if(!timeString.equals("0")) {
      time = LocalDateTime.parse(timeString,DateTimeFormatter.ofPattern("dd/MM/yyyy,_HH:mm"));
      List<Performance> filteredPerformancesTime = new ArrayList<>();
      for (Performance performance : performances){
        if (performance.getStart_time().toLocalTime().equals(time.toLocalTime()) || performance.getStart_time().toLocalTime().isAfter(time.toLocalTime())
                || performance.getEnd_time().toLocalTime().equals(time.toLocalTime()) || performance.getEnd_time().toLocalTime().isAfter(time.toLocalTime())){
          filteredPerformancesTime.add(performance);
        }
      }
      filteredPerformances.retainAll(filteredPerformancesTime);
    }

    return filteredPerformances;
  }
}
