import { Component } from '@angular/core';
import {Message, MessageService} from "../../core";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  publicMessage?: Message;
  protectedMessage?: Message;

  constructor(private messageService: MessageService) { }

  loadPublicMessage(): void {
    this.messageService.getPublicResource()
      .subscribe((response) => {
        const { data, error } = response;

        if (data) {
          this.publicMessage = data as Message;
        }

        if (error) {
          console.log(error);
        }
      });
  }

  loadProtectedMessage(): void {
    this.messageService.getProtectedResource()
      .subscribe((response) => {
        const { data, error } = response;

        if (data) {
          this.protectedMessage = data as Message;
        }

        if (error) {
          console.log(error);
        }
      });
  }
}
