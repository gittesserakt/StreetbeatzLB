import { Component } from '@angular/core';
import {Artist} from "../../../core/models/artist.model";
import {ArtistService} from "../../../core/services/artist.service";
import {VoteService} from "../../../core/services/vote.service";

@Component({
  selector: 'app-admin-vote',
  templateUrl: './admin-vote.component.html',
  styleUrls: ['./admin-vote.component.scss']
})
export class AdminVoteComponent {
  isClosed: boolean = false;
  slideToggleText:string ="Close vote!";
  artists?: Artist[];
  topArtists?: Artist[];

  constructor( private artistService: ArtistService, private voteService: VoteService) {
    this.getAllArtist();
  }

  onToggleClick():void{
    this.isClosed = !this.isClosed;
    if(this.isClosed){
      this.voteService.closeVoting();
      this.topArtists = this.artists;
      this.topArtists?.sort(({vote_count:a},{vote_count:b}) => b - a);
    }else{
      this.voteService.openVoting();
      this.topArtists = undefined;
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
}
