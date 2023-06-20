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



  setVoteCookies(artist: Artist | null | undefined, hasChosen: boolean){
    console.log("Write Vote as Cookies")

    if (hasChosen && artist != undefined) {
      this.smfService.set("hasChosen", "chosen")
      this.smfService.set("chosenArtist", artist.name)
    } else {
      this.smfService.delete("hasChosen")
      this.smfService.delete("chosenArtist")
    }
    console.log(artist)
  }

  getVoteCookies(): string {
    console.log("Get Vote from Cookies")

    let artistName: string = ""
    if(this.smfService.check("hasChosen")){
      const chosenArtist = this.smfService.get("chosenArtist");
      if (chosenArtist && chosenArtist.trim() !== '') {
        artistName = chosenArtist.replace("%20", " ");
      }
    }
    console.log("HALLO=" + artistName)
    return artistName;
  }
}
