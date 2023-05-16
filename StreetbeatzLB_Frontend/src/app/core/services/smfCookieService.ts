import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Filter} from "../models/filter.model";
import {Artist} from "../models/artist.model";
import {ArtistService} from "./artist.service";


@Injectable({
  providedIn: 'root'
})
export class SmfCookieService {

  constructor(private smfService: CookieService, private artistService: ArtistService) {
  }

  saveFilter(filter: Filter) {
    console.log("Write Filter as Cookies, param = " + filter.toString())

    if (filter.date) {
      this.smfService.set("filterCookieDate", <string>filter.date.toISOString())
    } else {
      this.smfService.delete("filterCookieDate")
    }
    if (filter.artist) {
      this.smfService.set("filterCookieArtist", <string>filter.artist.toString())
    } else {
      this.smfService.delete("filterCookieArtist")
    }
    if (filter.stage) {
      this.smfService.set("filterCookieStage", <string>filter.stage.toString())
    } else {
      this.smfService.delete("filterCookieStage")
    }
  }

  loadFilter(): Filter {
    console.log("Get Filter from Cookies")
    const filter = new Filter(
      this.smfService.check("filterCookieDate") ? new Date(<string>this.smfService.get("filterCookieDate")) : null,
      this.smfService.check("filterCookieArtist") ? this.smfService.get("filterCookieArtist") : null,
      this.smfService.check("filterCookieStage") ? this.smfService.get("filterCookieStage") : null,
    );
    console.log(filter.toString())
    return filter;
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
