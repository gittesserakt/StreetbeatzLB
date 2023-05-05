import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Filter} from "../models/filter.model";


@Injectable({
  providedIn: 'root'
})
export class SmfCookieService {

  constructor(private filterCookieService:CookieService) {
  }

  setFilterCookies(filter: Filter) {
    alert(<string>filter.date?.toDateString())
    this.filterCookieService.set("filterCookieDate",<string>filter.date?.toISOString())
    this.filterCookieService.set("filterCookieHours",filter.time?.hours+"")
    this.filterCookieService.set("filterCookieMinutes",filter.time?.minutes+"")
    this.filterCookieService.set("filterCookieMinutes",filter.time?.minutes+"")
    alert(this.filterCookieService.get("filterCookieDate"))
  }
}
