import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Filter} from "../models/filter.model";
import {Time} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class SmfCookieService {

  service!: SmfCookieService;
  constructor(private filterCookieService:CookieService) {
  }

  setFilterCookies(filter: Filter) {
    this.filterCookieService.set("filterCookieDate",<string>filter.date?.toDateString())
    this.filterCookieService.set("filterCookieHours",filter.time?.hours+"")
    this.filterCookieService.set("filterCookieMinutes",filter.time?.minutes+"")
    this.filterCookieService.set("filterCookieMinutes",filter.time?.minutes+"")

  }
}
