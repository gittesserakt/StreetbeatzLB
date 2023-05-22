import {Component, HostListener, OnInit} from '@angular/core';
import {VoteDialogComponent} from "../../shared/components/vote-dialog/vote-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ArtistService} from "../../core/services/artist.service";
import {VoteService} from "../../core/services/vote.service";
import {SmfCookieService} from "../../core/services/smfCookieService";
import {Artist} from "../../core/models/artist.model";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VoteSnackbarComponent} from "../../shared/components/vote-snackbar/vote-snackbar.component";

export interface DialogData {
  chosenArtist: Artist;
  hasChosen: boolean;
  hasCookie: boolean;
}

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  voteButton: string = 'Vote';

  screenHeightPX: number = 0;
  centerList?: number;

  chosenArtist?: Artist;
  hasChosen: boolean = false;
  hasCookie: boolean = false;

  artists?: Artist[];

  device?: string;
  displayMap = new Map([
    [Breakpoints.HandsetPortrait, 'HandsetPortrait'], //max-width: 599.98
    [Breakpoints.HandsetLandscape, 'HandsetLandscape'], //max-width: 959.98px
    [Breakpoints.TabletPortrait, 'TabletPortrait'], //min-width: 600px & max-width: 839.98px
    [Breakpoints.TabletLandscape, 'TabletLandscape'], //min-width: 960px & max-width: 1279.98px
    [Breakpoints.WebPortrait, 'WebPortrait'], //min-width: 840px
    [Breakpoints.WebLandscape, 'WebLandscape'] //min-width: 1280px
  ]);

  constructor(public dialog: MatDialog, private artistService: ArtistService, private  voteService: VoteService,
              private breakpointObserver: BreakpointObserver, private smfCookieService: SmfCookieService, private _snackbar: MatSnackBar) {
    this.onResize();
  }

  ngOnInit(): void {
    this.onResize();

    console.log("check cache")
    if(this.smfCookieService.getVoteCookies() != ""){
      console.log("vote found")
      this.hasChosen = true;
      this.artistService.getArtistByName(this.smfCookieService.getVoteCookies())
        .subscribe((response) => {
          console.log("start")
          this.chosenArtist = response.data as Artist;
          console.log(this.chosenArtist)
        });
    }

    setTimeout(()=>{
      if(this.chosenArtist != undefined){
        this.hasCookie = true;
        this.openDialog();
      }
    }, 100);

    setTimeout(() => {
      this.getAllArtists();
    }, 100);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.getBreakpoint();
    this.screenHeightPX = window.innerHeight;
    if (this.device == 'HandsetPortrait'){
      this.centerList = 100;
    }else if (this.device == 'WebLandscape') {
      this.centerList = 44.5;
    }else {
      this.centerList = 50;
    }
  }

  onClick() {
    if(this.chosenArtist != undefined){
      this.openDialog();
    }else {
      this._snackbar.openFromComponent(VoteSnackbarComponent, {
        duration: 4000, //1000 = 1 Second
      });
    }
  }

  getAllArtists():void{
    this.artistService.getAllArtists().subscribe((response)=>{
      const {data, error} = response;
      console.log('artist', response);

      if(data){
        this.artists = data as Artist[];
        console.log(this.artists)
      }
      if(error){
        console.log(error);
      }
    })
  }

  voteForArtist(artist?: string):void{
    if (artist != null) {
      this.voteService.voteForArtist(artist);
      this.smfCookieService.setVoteCookies(this.chosenArtist, true);
    }
  }

  getBreakpoint(){
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape
    ]).subscribe(result => {
      for(const query of Object.keys(result.breakpoints)){
        if(result.breakpoints[query]){
          this.device = this.displayMap.get(query) as string;
        }
      }
    })

    console.log('Breakpoint: ' + this.device)
  }

  openDialog(){
    const dialogRef = this.dialog.open(VoteDialogComponent, {
      data: {
        chosenArtist: this.chosenArtist,
        hasChosen: this.hasChosen,
        hasCookie: this.hasCookie,
      }
    });

    if(!this.hasCookie){
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
  }
}
