package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.Administrator;
import de.hhn.se.labswp.streetbeatzlb_backend.models.AdministratorRepository;
import de.hhn.se.labswp.streetbeatzlb_backend.models.Artist;
import de.hhn.se.labswp.streetbeatzlb_backend.models.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/api/administrators")
@CrossOrigin(origins = "*")
public class AdministratorController {
    @Autowired
    private AdministratorRepository administratorRepository;

    @GetMapping(path="/")
    public @ResponseBody Iterable<Administrator> getAllAdministrators() {
        return administratorRepository.findAll();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Optional<Administrator> getAdministrator(@PathVariable("id") int id) {
        return administratorRepository.findById(id);
    }

    @PutMapping(path="/add")
    public @ResponseBody void addNewAdministrator(@RequestBody Administrator administrator) {
        administratorRepository.save(administrator);
    }

    @DeleteMapping(path="/delete/{id}")
    public @ResponseBody void deleteAdministrator(@PathVariable("id") int id) {
        administratorRepository.deleteById(id);
    }

    /**
     * Checks if the given administrator exists in the database and if not adds them.
     * This is used to add administrators to the database when they log in for the first time.
     * The reason for this is that Auth0 is used for authentication and administrator management.
     *
     * @param administrator the administrator to check
     */
    @PutMapping(path="/check")
    public @ResponseBody void checkAdministrator(@RequestBody Administrator administrator) {

        Iterable<Administrator> administrators = administratorRepository.findAll();

        for (Administrator admin : administrators) {
            if (admin.getIdentifier().equals(administrator.getIdentifier())) {
                return;
            }
        }

        administratorRepository.save(administrator);
    }
}
