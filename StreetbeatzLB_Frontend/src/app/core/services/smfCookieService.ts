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
    this.removeFilter()
    if (filter.dateDate) {
      this.smfService.set("filterCookieDateDate", <string>filter.dateDate.toISOString())
    } else {
      this.smfService.delete("filterCookieDateDate")
    }
    if (filter.timeDate) {
      this.smfService.set("filterCookieTimeDate", <string>filter.timeDate.toISOString())
    } else {
      this.smfService.delete("filterCookieTimeDate")
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
}
