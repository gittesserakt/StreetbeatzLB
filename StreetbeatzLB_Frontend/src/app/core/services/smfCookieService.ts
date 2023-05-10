import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Filter} from "../models/filter.model";


@Injectable({
  providedIn: 'root'
})
export class SmfCookieService {

  constructor(private smfService: CookieService) {
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
}
