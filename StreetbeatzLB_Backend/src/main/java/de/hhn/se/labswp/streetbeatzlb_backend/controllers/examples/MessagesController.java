package de.hhn.se.labswp.streetbeatzlb_backend.controllers.examples;

import de.hhn.se.labswp.streetbeatzlb_backend.models.examples.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping(path = "/api/messages")
@CrossOrigin(origins = "*")
public class MessagesController {

  Message publicMessage = new Message();
  Message protectedMessage = new Message();

  @GetMapping(path="/public")
  public @ResponseBody Message getPublicMessage() {
    publicMessage.setMessage("The API is working");
    return publicMessage;
  }

  @GetMapping(path="/protected")
  public @ResponseBody Message getProtectedMessage() {
    protectedMessage.setMessage("The API is working and you are authenticated");
    return protectedMessage;
  }
}
