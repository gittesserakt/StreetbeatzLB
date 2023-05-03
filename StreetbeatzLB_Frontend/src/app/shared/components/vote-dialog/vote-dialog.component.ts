import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../features/vote/vote.component";

@Component({
  selector: 'app-vote-dialog',
  templateUrl: './vote-dialog.component.html',
  styleUrls: ['./vote-dialog.component.scss']
})
export class VoteDialogComponent {
  yesButton: string = "Yes";
  noButton: string = "No";
  voteTitle: string = "Vote";

  text: string = "Are you sure that you want to vote for this artist?";

  constructor(public dialogRef: MatDialogRef<VoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,){
      this.data.hasChosen = true;
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
