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
    let newDate = filter.dateDate ? new Date(filter.dateDate.setDate(filter.dateDate.getDate() + 1)) : null;
    let newTime = filter.timeDate ? new Date(filter.timeDate.setTime(filter.timeDate.getHours() + 1)) : null;

    let filterInternal = new Filter(
      newDate,
      newTime,
      filter.artist,
      filter.stage
    );
    console.log("Write Filter as Cookies, param = " + filterInternal.toString())
    this.removeFilter()
    if (filterInternal.dateDate) {
      this.smfService.set("filterCookieDateDate", <string>filterInternal.dateDate.toISOString())
    } else {
      this.smfService.delete("filterCookieDateDate")
    }
    if (filterInternal.timeDate) {
      this.smfService.set("filterCookieTimeDate", <string>filterInternal.timeDate.toISOString())
    } else {
      this.smfService.delete("filterCookieTimeDate")
    }
    if (filterInternal.artist) {
      this.smfService.set("filterCookieArtist", <string>filterInternal.artist.toString())
    } else {
      this.smfService.delete("filterCookieArtist")
    }
    if (filterInternal.stage) {
      this.smfService.set("filterCookieStage", <string>filterInternal.stage.toString())
    } else {
      this.smfService.delete("filterCookieStage")
    }
  }

  removeFilter() {
    this.smfService.deleteAll()
  }

  loadFilter(): Filter {
    console.log("Get Filter from Cookies")
    const filter = new Filter(
      this.smfService.check("filterCookieDateDate") ? new Date(<string>this.smfService.get("filterCookieDate")) : null,
      this.smfService.check("filterCookieTimeDate") ? new Date(<string>this.smfService.get("filterCookieTimeDate")) : null,
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
