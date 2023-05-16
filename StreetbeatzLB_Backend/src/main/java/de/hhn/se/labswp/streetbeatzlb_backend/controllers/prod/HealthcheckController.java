package de.hhn.se.labswp.streetbeatzlb_backend.controllers.prod;

import de.hhn.se.labswp.streetbeatzlb_backend.models.Message;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/api")
@CrossOrigin(origins = "*")
public class HealthcheckController {

  Message message = new Message();

  @GetMapping(path="/healthcheck")
  public @ResponseBody Message getPublicMessage() {
    message.setMessage("The API is working");
    return message;
  }
}
