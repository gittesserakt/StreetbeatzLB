package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/api/artistInfo")
@CrossOrigin(origins = "*")
public class ArtistInfoController {
    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private ArtistInfoRepository artistInfoRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<ArtistInfo> getAllArtistsInfo() {
        return artistInfoRepository.findAll();
    }

    @GetMapping(path="/artistInfoByID")
    public @ResponseBody Optional<ArtistInfo> getArtistInfoByID(@RequestParam int artist_id) {
        return artistInfoRepository.findById(artist_id);
    }

    @GetMapping(path="/artistInfoByName")
    public @ResponseBody Optional<ArtistInfo> getArtistInfoByName(@RequestParam String artist) {

        artist = artist.replace('_', ' ');

        Iterable<Artist> artists = artistRepository.findAll();

        int artistID = 0;

        for(Artist currentArtist : artists) {
            if(currentArtist.getName().equals(artist)){
                artistID = Math.toIntExact(currentArtist.getArtist_id());
                break;
            }
        }
        return artistInfoRepository.findById(artistID);
    }
}
