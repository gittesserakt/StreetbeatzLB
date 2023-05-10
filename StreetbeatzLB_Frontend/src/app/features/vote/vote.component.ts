import {Component, HostListener, OnInit} from '@angular/core';
import {VoteDialogComponent} from "../../shared/components/vote-dialog/vote-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ArtistService} from "../../core/services/artist.service";
import {VoteService} from "../../core/services/vote.service";
import {Artist} from "../../core/models/artist.model";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

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
  centerList?: string;
  chosenArtist?: Artist;
  hasChosen: boolean = false;
  artists?: Artist[];
  // artists: string[] = ['q','w','e','r','t','z','u','i','o','p','a','s','d','f','g','h','j','k','l','y','x','c','v','b','n','m'];

  device?: string;
  displayMap = new Map([
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web']
  ]);

  constructor(public dialog: MatDialog, private artistService: ArtistService, private  voteService: VoteService, private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.WebLandscape
    ]).subscribe(result => {
      for(const query of Object.keys(result.breakpoints)){
        if(result.breakpoints[query]){
          this.device = this.displayMap.get(query) as string;
        }
      }
    })

    if (this.device == 'Handset'){
      this.centerList = 'left';
    }else {
      this.centerList = 'center';
    }
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
        this.voteForArtist(this.chosenArtist?.name)
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

  voteForArtist(artist?: string):void{
    if (artist != null) {
      this.voteService.voteForArtist(artist)
    }
  }
}
