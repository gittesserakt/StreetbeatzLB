import {Component, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {VoteDialogComponent} from "../../shared/components/vote-dialog/vote-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ArtistService} from "../../core/services/artist.service";
import {VoteService} from "../../core/services/vote.service";
import {SmfCookieService} from "../../core/services/smfCookieService";
import {Artist} from "../../core/models/artist.model";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VoteSnackbarComponent} from "../../shared/components/vote-snackbar/vote-snackbar.component";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";

export interface DialogData {
  chosenArtist1: Artist;
  chosenArtist2: Artist;
  voteCount: number;
  hasVoted: boolean;
  hasCookie: boolean;
  showThanks: boolean;
}

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  @ViewChildren('checkbox') checkbox!: QueryList<MatCheckbox>;

  voteButton: string = 'Vote';
  remainingVotes: number = 2;
  voteTitle: string = "Please select up to 2 artist you want to vote for:";

  screenHeightPX: number = 0;
  centerList?: number;

  selectedCount: number = 0;

  chosenArtist1?: Artist;
  chosenArtist2?: Artist;
  voteCount: number = 0;
  hasVoted: boolean = false;
  hasCookie: boolean = false;
  showThanks: boolean = true;

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

  constructor(public dialog: MatDialog, private artistService: ArtistService, private voteService: VoteService,
              private breakpointObserver: BreakpointObserver, private smfCookieService: SmfCookieService, private _snackbar: MatSnackBar) {
    // this.onResize();
  }

  ngOnInit(): void {
    // this.onResize();
    this.initCheckBoxList();
  }

  initCheckBoxList(): void {
    console.log("check cache");
    if(this.smfCookieService.getVoteCookies()[0] != "" && this.smfCookieService.getVoteCookies()[1] != ""){
      console.log("two votes found");

      this.getArtistByNamePromise(this.smfCookieService.getVoteCookies()[0]).then((artist1) => {
        this.chosenArtist1 = artist1 as Artist;
        console.log(this.chosenArtist1);

        this.getArtistByNamePromise(this.smfCookieService.getVoteCookies()[1]).then((artist2) => {
          this.chosenArtist2 = artist2 as Artist;
          console.log(this.chosenArtist2);

          this.getAllArtists();
          console.log('List two');

          setTimeout(() => {
            this.remainingVotes = 0;
            this.selectedCount = 2;
            this.hasVoted = true;
            this.hasCookie = true;
            console.log("open dialog");
            this.openDialog();
          }, 100);

          setTimeout(() => {
            this.checkAndDisableCheckbox(this.chosenArtist1?.name);
            this.checkAndDisableCheckbox(this.chosenArtist2?.name);
          }, 100);
        }).catch((error) =>{
          console.log(error);
        });
      }).catch((error) =>{
        console.log(error);
      });
    }
    else if(this.smfCookieService.getVoteCookies()[0] != ""){
      console.log("one vote found");

      this.getArtistByNamePromise(this.smfCookieService.getVoteCookies()[0]).then((artist) => {
        this.chosenArtist1 = artist as Artist;
        console.log('Cookie 1', this.chosenArtist1);

        this.remainingVotes = 1;
        this.selectedCount = 1;

        this.getAllArtists();
        console.log('List one');

        setTimeout(() => {
          console.log('no more timeout');
          this.checkAndDisableCheckbox(this.chosenArtist1?.name);
        }, 100);
      }).catch((error) =>{
        console.log(error);
      });
    }
    else{
      this.getAllArtists();
      console.log('List alone');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.getBreakpoint();
    this.screenHeightPX = window.innerHeight;
    if (this.device == 'HandsetPortrait') {
      this.centerList = 100;
    } else if (this.device == 'WebLandscape') {
      this.centerList = 44.5;
    } else {
      this.centerList = 50;
    }
  }

  onClick() {
    console.log(this.chosenArtist1);
    console.log(this.chosenArtist2);
    if (this.chosenArtist1 != undefined) {
      this.openDialog();
    } else {
      this._snackbar.openFromComponent(VoteSnackbarComponent, {
        duration: 4000, //1000 = 1 Second
      });
    }
  }

  getAllArtists(): void {
    this.artistService.getAllArtists().subscribe((response) => {
      const {data, error} = response;
      console.log('artist', response);

      if (data) {
        this.artists = data as Artist[];
        console.log(this.artists);
      }
      if (error) {
        console.log(error);
      }
    })
  }

  getArtistByNamePromise(name: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.artistService.getArtistByName(name).subscribe((response) => {
        const {data, error} = response;
        if (data) {
          console.log(data);
          resolve(data);
        }
        if (error) {
          reject(error);
        }
      });
    });
  }

  voteForArtist(): void {
    if(this.smfCookieService.getVoteCookies()[0] == '' && this.smfCookieService.getVoteCookies()[1] == ""){
      if (this.chosenArtist1 && this.chosenArtist2 != undefined) {
        console.log('vote for two');
        this.voteService.voteForArtist(this.chosenArtist1.name);
        this.voteService.voteForArtist(this.chosenArtist2.name);
        this.smfCookieService.setVoteCookies(this.chosenArtist1, this.chosenArtist2, this.voteCount, true);
      } else if (this.chosenArtist1 != undefined && this.chosenArtist2 == undefined) {
        console.log('vote for first');
        this.voteService.voteForArtist(this.chosenArtist1.name);
        this.smfCookieService.setVoteCookies(this.chosenArtist1, undefined, this.voteCount, false);
      }
    }else {
      console.log('vote for second');
      this.voteService.voteForArtist(this.chosenArtist2!.name);
      this.smfCookieService.setVoteCookies(this.chosenArtist1, this.chosenArtist2, this.voteCount, true);
    }
  }

  getBreakpoint() {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape
    ]).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.device = this.displayMap.get(query) as string;
        }
      }
    })

    console.log('Breakpoint: ' + this.device)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VoteDialogComponent, {
      data: {
        chosenArtist1: this.chosenArtist1,
        chosenArtist2: this.chosenArtist2,
        voteCount: this.voteCount,
        hasVoted: this.hasVoted,
        hasCookie: this.hasCookie,
        showThanks: this.showThanks,
      }
    });

    if (!this.hasCookie && this.showThanks) {
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          // this.hasChosen = result;
          this.voteCount = result;
          this.remainingVotes -= this.voteCount;
          this.voteForArtist();
          if (this.showThanks) {
            this.showThanks = false;
            this.openDialog();

            if (result == 2) {
              this.hasVoted = true;
            } else {
              this.hasVoted = false;
              this.checkAndDisableCheckbox(this.chosenArtist1?.name);
            }
          }
        } else {
          this.hasVoted = false;
        }
      });
    }
  }

  limitCheckbox(event: MatCheckboxChange): void {
    if (event.checked) {
      if (this.selectedCount >= 2) {
        event.source.checked = false;
      } else {
        this.selectedCount++;
        if (this.selectedCount == 1) {
          this.artistService.getArtistByName(event.source.value).subscribe((response) => {
            const {data, error} = response
            console.log('artist', response);
            if (data) {
              this.chosenArtist1 = data as Artist;
              console.log('1: ', data as Artist);
              console.log('1.1: ', this.chosenArtist1.name);
            }
            if (error) {
              console.log(error);
            }
          });
        }
        if (this.selectedCount == 2) {
          this.artistService.getArtistByName(event.source.value).subscribe((response) => {
            const {data, error} = response
            console.log('artist', response);
            if (data) {
              this.chosenArtist2 = data as Artist;
              console.log('2: ', data as Artist);
              console.log('2.1: ', this.chosenArtist2.name);
            }
            if (error) {
              console.log(error);
            }
          });
        }
      }
    } else {
      this.selectedCount--;
      if (this.selectedCount == 1) {
        if(event.source.value == this.chosenArtist1?.name){
          this.chosenArtist1 = this.chosenArtist2;
          this.chosenArtist2 = undefined;
        }
        if(event.source.value == this.chosenArtist2?.name){
          this.chosenArtist2 = undefined;
        }
      }
      if (this.selectedCount == 0) {
        this.chosenArtist1 = undefined;
        this.chosenArtist2 = undefined;
      }
    }
  }

  checkAndDisableCheckbox(name: string | undefined): void{
    console.log('Check Disable', name);
    this.checkbox.forEach(box => {
      if(box.value === name){
        box.checked = true;
        box.disabled = true;
      }
    });
  }
}
