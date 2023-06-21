import {Component, OnInit} from '@angular/core';
import {Artist} from "../../../core/models/artist.model";
import {ArtistService} from "../../../core/services/artist.service";
import {VoteService} from "../../../core/services/vote.service";

@Component({
  selector: 'app-admin-vote',
  templateUrl: './admin-vote.component.html',
  styleUrls: ['./admin-vote.component.scss']
})
export class AdminVoteComponent implements OnInit{
  voteStatus: boolean = true;
  slideToggleText:string ="Vote is open!";
  artists?: Artist[];
  topArtists?: Artist[];

  limit:number = 3;
  listButtonText: string = "All artists";

  constructor( private artistService: ArtistService, private voteService: VoteService) {
    this.getAllArtist();
    this.getVoteStatus();
  }

  ngOnInit(): void {
    if(!this.voteStatus){
      this.showWinner();
      this.slideToggleText = "Vote is closed!";
    }
  }

  onToggleClick():void{
    if(!this.voteStatus){
      console.log("Open vote");
      this.voteService.openVoting().then(() =>{
        this.voteStatus = true;
        this.slideToggleText ="Vote is open!";
      });
    }else{
      console.log("close vote")
      this.voteService.closeVoting().then(() => {
        this.showWinner();
        this.voteStatus = false;
        this.slideToggleText = "Vote is closed!";
      });
    }
  }

  getAllArtist(){
    this.artistService.getAllArtists().subscribe((response) => {
      const {data, error} = response;
      console.log(response);

      if (data) {
        this.artists = data as Artist[];
        // console.log(this.artists);
      }
      if (error) {
        console.log(error);
      }
    });
  }

  getVoteStatus(){
    this.voteService.getVoteStatus().subscribe((response) => {
      const {data, error} = response;
      console.log(response);

      if (data) {
        this.voteStatus = data as boolean;
        console.log("Vote Status:" + this.voteStatus);
      }
      if (error) {
        console.log(error);
      }
    });
  }

  showWinner(){
    this.topArtists = this.artists;
    this.topArtists?.sort(({vote_count:a},{vote_count:b}) => b - a);
  }

  toggleList(){
    if(this.limit == 3){
      this.limit = 50;
      this.listButtonText = "Top 3 artist";
    }else {
      this.limit = 3;
      this.listButtonText = "All artists";
    }
  }
}
