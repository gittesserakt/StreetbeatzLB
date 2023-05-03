import {Component, HostListener, OnInit} from '@angular/core';
import {VoteDialogComponent} from "../../shared/components/vote-dialog/vote-dialog.component";
import {MatDialog} from "@angular/material/dialog";

export interface DialogData {
  chosenArtist: string;
  hasChosen: boolean;
}

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  screenHeightPX: number = 0;
  rowHeight: number = 0;
  chosenArtist: string | undefined;
  hasChosen: boolean = false;
  artists: string[] | undefined;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.calculateHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.calculateHeight();
  }

  calculateHeight() {
    this.screenHeightPX = window.innerHeight;
    this.rowHeight = (this.screenHeightPX - 64) / 10;
  }

  openDialog() {
    const dialogRef = this.dialog.open(VoteDialogComponent, {
      data: {
        chosenArtist: this.chosenArtist,
        hasChosen: this.hasChosen
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.hasChosen = result;
      } else {
        this.hasChosen = false;
      }
    });
  }
}
