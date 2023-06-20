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
    console.log("Write Filter as Cookies, param = " + filter.toString());
    this.smfService.set("filterCookie", filter.toJSON());
  }

  loadFilter(): Filter {
    console.log("Get Filter from Cookies");
    const filter = Filter.fromJSON(this.smfService.get("filterCookie"));
    console.log("after load: " + filter.toString());
    return filter;
  }

  filterSet(): boolean {
    const filter = Filter.fromJSON((this.smfService.get("filterCookies")));
    return !(filter.dateDate != null && filter.timeDate != null && filter.artist != null && filter.stage != null);
  }

  setVoteCookies(artist1: Artist | null | undefined, artist2: Artist | null | undefined, voteCount: number,
                 hasVoted: boolean){
    console.log("Write Vote as Cookies")

    if (hasVoted && artist1 && artist2 != undefined) {
      this.smfService.set("voteCount", voteCount.toString());
      this.smfService.set("hasVoted", "voted");
      this.smfService.set("chosenArtist1", artist1.name);
      this.smfService.set("chosenArtist2", artist2.name);
    } else if(artist1 != undefined){
      this.smfService.set("voteCount", voteCount.toString());
        this.smfService.set("chosenArtist1", artist1.name);
        this.smfService.delete("chosenArtist2");
    } else {
      this.smfService.delete("voteCount");
      this.smfService.delete("hasVoted");
      this.smfService.delete("chosenArtist1");
      this.smfService.delete("chosenArtist2");
    }
    console.log(artist1);
    console.log(artist2);
  }

  getVoteCookies(): string[] {
    console.log("Get Vote from Cookies");

    let artistName:string[] = ["",""];
    if(this.smfService.check("voteCount")){
      const chosenArtist1 = this.smfService.get("chosenArtist1");
      const chosenArtist2 = this.smfService.get("chosenArtist2");
      console.log(chosenArtist1, chosenArtist2);
      if (chosenArtist1 && chosenArtist1.trim() !== '') {
        artistName[0] = chosenArtist1.replace("%20", " ");
      }
      if (chosenArtist2 && chosenArtist2.trim() !== '') {
        artistName[1] = chosenArtist2.replace("%20", " ");
      }
    }
    console.log("HALLO=" + artistName[0] + ", " + artistName[1]);
    return artistName;
  }
}
