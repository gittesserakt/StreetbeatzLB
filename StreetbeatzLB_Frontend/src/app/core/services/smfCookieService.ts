import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Filter} from "../models/filter.model";
import {Artist} from "../models/artist.model";


@Injectable({
  providedIn: 'root'
})
export class SmfCookieService {

  constructor(private smfService: CookieService) {
  }

  saveFilter(filter: Filter) {
    this.smfService.set("filterCookie", filter.toJSON());
  }

  loadFilter(): Filter {
    const filter = Filter.fromJSON(this.smfService.get("filterCookie"));
    return filter;
  }

  filterSet(): boolean {
    return (this.smfService.check("filterCookies"));
  }

  /* Voting Cookies */

  getVoteArtist1Cookie(): string {
    let artistName = "";
    if(this.smfService.check("chosenArtist1")){
      artistName = this.smfService.get("chosenArtist1");
    }
    return artistName;
  }

  setVoteArtist1Cookie(artist1: Artist){
    this.smfService.set("chosenArtist1", artist1.name);
  }

  getVoteArtist2Cookie(): string {
    let artistName = "";
    if(this.smfService.check("chosenArtist2")){
      artistName = this.smfService.get("chosenArtist2");
    }
    return artistName;
  }

  setVoteArtist2Cookie(artist2: Artist){
    this.smfService.set("chosenArtist2", artist2.name);
  }

  getVoteCountCookie(): number {
    let voteCount = 0;
    if(this.smfService.check("voteCount")){
      voteCount = parseInt(this.smfService.get("voteCount"));
    }
    return voteCount;
  }

  setVoteCountCookie(voteCount: number){
    this.smfService.set("voteCount", voteCount.toString());
  }

  getHasVotedCookie(): boolean {
    let hasVoted = false;
    if(this.smfService.check("hasVoted")){
      hasVoted = this.smfService.get("hasVoted") == "true";
    }
    return hasVoted;
  }

  setHasVotedCookie(hasVoted: boolean){
    this.smfService.set("hasVoted", hasVoted.toString());
  }
}
