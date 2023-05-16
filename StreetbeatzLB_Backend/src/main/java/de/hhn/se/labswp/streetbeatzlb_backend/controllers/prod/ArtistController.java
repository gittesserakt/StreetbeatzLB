package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/api/artists")
@CrossOrigin(origins = "*")
public class ArtistController {
    @Autowired
    private ArtistRepository artistRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    @GetMapping(path="/artistByID")
    public @ResponseBody Optional<Artist> getArtistByID(@RequestParam int artist_id) {
        return artistRepository.findById(artist_id);
    }

    @GetMapping(path="/artistByName")
    public @ResponseBody Optional<Artist> getArtistByName(@RequestParam String artist) {

        artist = artist.replace('_', ' ');

        Iterable<Artist> artists = artistRepository.findAll();

        int artistID = 0;

        for(Artist currentArtist : artists) {
            if(currentArtist.getName().equals(artist)){
                artistID = Math.toIntExact(currentArtist.getArtist_id());
                break;
            }
        }
        return artistRepository.findById(artistID);
    }
}
