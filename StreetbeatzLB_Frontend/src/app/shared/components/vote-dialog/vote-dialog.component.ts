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
  text: string = "";
  text2: string = "";
  remainingVotes: string = "";


  constructor(public dialogRef: MatDialogRef<VoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,){
    if (this.data.hasCookie){
      this.text = "You have already voted for those artists:";
    }else if(!this.data.showThanks){
      this.voteTitle = "Thank you";
      this.text = "You successfully voted for:";
      this.text2 = "Remaining votes:";
      this.remainingVotes = (2 - this.data.voteCount).toString();
    }else {
      if(this.data.chosenArtist1 && this.data.chosenArtist2 != undefined){
        this.text = "Are you sure that you want to vote for these two artists?";
        this.data.voteCount = 2;
        this.data.hasVoted = true;
      } else if(this.data.chosenArtist2 == undefined){
        this.text = "Are you sure that you want to vote for this artist?";
        this.data.voteCount = 1;
      }
    }
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
