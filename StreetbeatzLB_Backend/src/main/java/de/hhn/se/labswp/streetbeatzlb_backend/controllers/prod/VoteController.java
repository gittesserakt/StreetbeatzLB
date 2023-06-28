package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/api/voting")
@CrossOrigin(origins = "*")
public class VoteController {
    @Autowired
    private ArtistRepository artistRepository;

    private static boolean voteOpen = true;

    @PutMapping(path="/vote")
    public @ResponseBody void voteForArtist(@RequestBody Artist artist) {

        if(voteOpen){
            artist.setName(artist.getName().replace('_', ' '));

            Iterable<Artist> artists = artistRepository.findAll();

            for(Artist currentArtist : artists) {
                if(currentArtist.getName().equals(artist.getName())){
                    int artistID = Math.toIntExact(currentArtist.getArtist_id());
                    artistRepository.findById(artistID).get()
                            .setVote_count(artistRepository.findById(artistID).get()
                                    .getVote_count() + 1L);
                    artistRepository.save(artistRepository.findById(artistID).get());
                    break;
                }
            }
        }

    }

    @GetMapping(path = "/getVotesByID")
    public @ResponseBody long getVotesByID(@RequestParam int artist_id){
        return artistRepository.findById(artist_id).get().getVote_count();
    }

    @PutMapping(path = "/closeVoting")
    public  @ResponseBody void closeVoting(){
        voteOpen = false;
    }

    @PutMapping(path = "/openVoting")
    public  @ResponseBody void openVoting(){
        voteOpen = true;
    }

    @GetMapping(path = "/voteStatus")
    public @ResponseBody boolean voteStatus(){
        return voteOpen;
    }
}
