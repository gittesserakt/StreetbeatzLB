package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/api/voting")
@CrossOrigin(origins = "*")
public class VoteController {
    @Autowired
    private ArtistRepository artistRepository;

    @PutMapping(path="/vote")
    public @ResponseBody void voteForArtist(@RequestParam String artist) {

        artist = artist.replace('_', ' ');

        Iterable<Artist> artists = artistRepository.findAll();

        for(Artist currentArtist : artists) {
            if(currentArtist.getName().equals(artist)){
                int artistID = Math.toIntExact(currentArtist.getArtist_id());
                artistRepository.findById(artistID).get()
                        .setVote_count(artistRepository.findById(artistID).get()
                                .getVote_count() + 1L);
                artistRepository.save(artistRepository.findById(artistID).get());
                break;
            }
        }
    }

    @GetMapping(path = "/getVotesByID")
    public @ResponseBody long getVotesByID(@RequestParam int artist_id){
        return artistRepository.findById(artist_id).get().getVote_count();
    }
}
