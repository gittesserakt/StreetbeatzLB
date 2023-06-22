import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {VoteDialogComponent} from "../../shared/components/vote-dialog/vote-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ArtistService} from "../../core/services/artist.service";
import {VoteService} from "../../core/services/vote.service";
import {SmfCookieService} from "../../core/services/smfCookieService";
import {Artist} from "../../core/models/artist.model";
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
  voteStatus: boolean;
}

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  @ViewChildren('checkbox') checkbox!: QueryList<MatCheckbox>;
  selectedCount: number = 0;
  artists?: Artist[];

  //region displayVariables
  voteButton: string = 'Vote';
  remainingVotes: number = 2;
  voteTitle: string = "You can vote for up to 2 artists!";
  //endregion


  //region dialogDateInterface
  chosenArtist1?: Artist;
  chosenArtist2?: Artist;
  voteCount: number = 0;
  hasVoted: boolean = false;
  hasCookie: boolean = false;
  showThanks: boolean = true;
  voteStatus: boolean = true;
  //endregion

  constructor(public dialog: MatDialog, private artistService: ArtistService, private voteService: VoteService,
              private smfCookieService: SmfCookieService, private _snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.checkVoteStatus()
  }

  initCheckBoxList(): void {
    if (this.smfCookieService.getVoteCookies()[0] != "" && this.smfCookieService.getVoteCookies()[1] != "") {

      this.getArtistByNamePromise(this.smfCookieService.getVoteCookies()[0]).then((artist1) => {
        this.chosenArtist1 = artist1 as Artist;

        this.getArtistByNamePromise(this.smfCookieService.getVoteCookies()[1]).then((artist2) => {
          this.chosenArtist2 = artist2 as Artist;

          this.getAllArtists();

          setTimeout(() => {
            this.remainingVotes = 0;
            this.selectedCount = 2;
            this.hasVoted = true;
            this.hasCookie = true;

            this.openDialog();
          }, 100);

          setTimeout(() => {
            this.checkAndDisableCheckbox(this.chosenArtist1?.name);
            this.checkAndDisableCheckbox(this.chosenArtist2?.name);
          }, 100);
        }).catch((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });
    } else if (this.smfCookieService.getVoteCookies()[0] != "") {

      this.getArtistByNamePromise(this.smfCookieService.getVoteCookies()[0]).then((artist) => {
        this.chosenArtist1 = artist as Artist;

        this.remainingVotes = 1;
        this.selectedCount = 1;

        this.getAllArtists();

        setTimeout(() => {
          this.checkAndDisableCheckbox(this.chosenArtist1?.name);
        }, 100);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.getAllArtists();
      if(!this.voteStatus){
        this.openDialog();
      }
    }
  }

  onClick() {
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

      if (data) {
        this.artists = data as Artist[];
      }
      if (error) {
        console.log(error);
      }
    })
  }

  getArtistByNamePromise(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.artistService.getArtistByName(name).subscribe((response) => {
        const {data, error} = response;

        if (data) {
          resolve(data);
        }
        if (error) {
          reject(error);
        }
      });
    });
  }

  voteForArtist(): void {
    if (this.smfCookieService.getVoteCookies()[0] == '' && this.smfCookieService.getVoteCookies()[1] == "") {
      if (this.chosenArtist1 && this.chosenArtist2 != undefined) {
        this.voteService.voteForArtist(this.chosenArtist1.name);
        this.voteService.voteForArtist(this.chosenArtist2.name);
        this.smfCookieService.setVoteCookies(this.chosenArtist1, this.chosenArtist2, this.voteCount, true);
      } else if (this.chosenArtist1 != undefined && this.chosenArtist2 == undefined) {
        this.voteService.voteForArtist(this.chosenArtist1.name);
        this.smfCookieService.setVoteCookies(this.chosenArtist1, undefined, this.voteCount, false);
      }
    } else {
      this.voteService.voteForArtist(this.chosenArtist2!.name);
      this.smfCookieService.setVoteCookies(this.chosenArtist1, this.chosenArtist2, this.voteCount, true);
    }
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
        voteStatus: this.voteStatus,
      }
    });

    if (!this.hasCookie && this.showThanks) {
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          this.voteCount = result;

          this.remainingVotes = (2 - this.voteCount);

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
    this.showThanks = true;
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

            if (data) {
              this.chosenArtist1 = data as Artist;
            }
            if (error) {
              console.log(error);
            }
          });
        }
        if (this.selectedCount == 2) {
          this.artistService.getArtistByName(event.source.value).subscribe((response) => {
            const {data, error} = response

            if (data) {
              this.chosenArtist2 = data as Artist;
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
        if (event.source.value == this.chosenArtist1?.name) {
          this.chosenArtist1 = this.chosenArtist2;
          this.chosenArtist2 = undefined;
        }
        if (event.source.value == this.chosenArtist2?.name) {
          this.chosenArtist2 = undefined;
        }
      }
      if (this.selectedCount == 0) {
        this.chosenArtist1 = undefined;
        this.chosenArtist2 = undefined;
      }
    }
  }

  checkAndDisableCheckbox(name: string | undefined): void {
    this.checkbox.forEach(box => {
      if (box.value === name) {
        box.checked = true;
        box.disabled = true;
      }
    });
  }

  checkVoteStatus(): void{
    new Promise((resolve, reject) => {
      this.voteService.getVoteStatus().subscribe((response) => {
        const {data, error} = response;

        if (data != null) {
          resolve(data);
        }
        if (error) {
          console.log(error);
          reject(error);
        }
      });
    }).then((checkedStatus) => {
      this.voteStatus = checkedStatus as boolean;
      this.initCheckBoxList();
    }).catch((error) => {
      console.log(error);
    });
  }
}
