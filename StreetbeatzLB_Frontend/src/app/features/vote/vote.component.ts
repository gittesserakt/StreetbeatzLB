import {Component, HostListener, OnInit} from '@angular/core';
import {VoteDialogComponent} from "../../shared/components/vote-dialog/vote-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ArtistService} from "../../core/services/artist.service";
import {Artist} from "../../core/models/artist.model";

export interface DialogData {
  chosenArtist: Artist;
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
  chosenArtist?: Artist;
  hasChosen: boolean = false;
  artists?: Artist[];

  constructor(public dialog: MatDialog, private artistService: ArtistService) {
  }

  ngOnInit(): void {
    this.calculateHeight();
    this.getAllArtists();
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
      console.log(this.chosenArtist?.name);
    });
  }

  getAllArtists():void{
    this.artistService.getAllArtists().subscribe((response)=>{
      const {data, error} = response;
      console.log('artist', response);

      if(data){
        this.artists = data as Artist[];
      }
      if(error){
        console.log(error);
      }
    })
  }
}
