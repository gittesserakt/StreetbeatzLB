import { Component } from '@angular/core';

@Component({
  selector: 'app-vote-snackbar',
  templateUrl: './vote-snackbar.component.html',
  styleUrls: ['./vote-snackbar.component.scss']
})
export class VoteSnackbarComponent {
  text: string = 'You have to choose an artist before you can vote!';
}
