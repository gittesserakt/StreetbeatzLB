import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Filter} from "../models/filter.model";


@Injectable({
  providedIn: 'root'
})
export class SmfCookieService {

  constructor(private smfService: CookieService) {
  }

  setFilterCookies(filter: Filter) {
    console.log("Write Filter as Cookies")

    if (filter.date) {
      this.smfService.set("filterCookieDate", <string>filter.date.toISOString())
    } else {
      this.smfService.delete("filterCookieDate")
    }
    if (filter.time) {
      this.smfService.set("filterCookieHours", filter.time.hours + "")
      this.smfService.set("filterCookieMinutes", filter.time.minutes + "")
    }else {
      this.smfService.delete("filterCookieHours")
      this.smfService.delete("filterCookieMinutes")
    }
    if (filter.artist) {
      this.smfService.set("filterCookieArtist", <string>filter.artist.toString())
    }else {
      this.smfService.delete("filterCookieArtist")
    }
    if (filter.stage) {
      this.smfService.set("filterCookieStage", <string>filter.stage.toString())
    }else {
      this.smfService.delete("filterCookieStage")
    }
  }

  getFilterCookies(): Filter {
    console.log("Get Filter from Cookies")

    return new Filter(
      this.smfService.check("filterCookieDate") ? new Date(<string>this.smfService.get("filterCookieDate")) : null,
      (this.smfService.check("filterCookieHours") &&
        this.smfService.check("filterCookieMinutes")) ? {
        hours: Number(this.smfService.get("filterCookieHours")),
        minutes: Number(this.smfService.get("filterCookieMinutes"))
      } : null,
      this.smfService.check("filterCookieArtist") ? this.smfService.get("filterCookieArtist") : null,
      this.smfService.check("filterCookieStage") ? this.smfService.get("filterCookieStage") : null,
    );
  }
}
