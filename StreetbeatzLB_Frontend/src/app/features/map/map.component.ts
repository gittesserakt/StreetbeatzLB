import {Component, ElementRef, OnDestroy, OnInit, AfterViewInit, Renderer2, Inject} from '@angular/core';
import * as Leaflet from 'leaflet';
import {interval, Subscription} from "rxjs";
import {PoiService} from "../../core/services/poi.service";
import {Poi} from "../../core/models/poi.model";
import {LatLng} from "leaflet";
import {Router, ActivatedRoute} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {

  festivalPosition: Leaflet.LatLngExpression = [48.89869508277576, 9.198711550016014];

  pois: Poi[] = [];

  // Leaflet Markers
  iconSize: Leaflet.PointExpression = [35, 51];
  iconAnchor: Leaflet.PointExpression = [12, 41];
  popupAnchor: Leaflet.PointExpression = [1, -34];
  tooltipAnchor: Leaflet.PointExpression = [16, -28];
  shadowSize: Leaflet.PointExpression = [41, 41];

  trackPosition: boolean = false;
  position?: GeolocationPosition;
  followPosition: boolean = false;
  locationUpdateTimer = interval(1000);
  locationTrackingSubscription!: Subscription;

  map!: Leaflet.Map;
  stageLayer: Leaflet.Layer = new Leaflet.Layer();
  markers: Leaflet.Marker[] = [];
  deviceMarker?: Leaflet.Marker;
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 15,
    center: this.festivalPosition,
    doubleClickZoom: false,
    zoomControl: false,
  }

  constructor(private renderer: Renderer2, private el: ElementRef, private poiService: PoiService,
              private router: Router, private activatedRouter: ActivatedRoute, @Inject(APP_BASE_HREF) private baseHref: string) {

    this.getPoiByName("User Icon").then((poi: Poi) => {
      const personIcon = this.createIcon(poi);
      this.deviceMarker = new Leaflet.Marker([0, 0], {icon: personIcon});
      this.activateLocationTracking();
    })
  }

  ngOnInit(): void {
    this.getDeviceLocation();
  }

  ngAfterViewInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['stageId']) {
        this.centerOnStage(params['stageId']);
      }
    });
  }

  ngOnDestroy(): void {
    this.locationTrackingSubscription.unsubscribe();
  }

  //***************************
  // API Calls
  //***************************

  private getAllPois(): Promise<void>{
    return new Promise<void>((resolve, reject) =>{
      this.poiService.getAllPois().subscribe((response) => {
        const {data, error} = response;

        if (data) {
          this.pois = data as Poi[];
          resolve();
        }

        if (error) {
          console.log(error);
          reject();
        }
      });
    })
  }

  private getPoiByName(name: string): Promise<Poi>{
    return new Promise<Poi>((resolve, reject) =>{
      this.poiService.getPoiByName(name).subscribe((response) => {
        const {data, error} = response;

        if (data) {
          resolve(data as Poi);
        }

        if (error) {
          console.log(error);
          reject();
        }
      });
    });
  }

  //***************************
  // Icon & Marker Creation
  //***************************

  private createIcon(poi: Poi): Leaflet.Icon {
    return Leaflet.icon({
      iconRetinaUrl: this.baseHref + '/assets/map/' + poi.icon,
      iconUrl: this.baseHref + '/assets/map/' + poi.icon,
      iconSize: this.iconSize,
      iconAnchor: this.iconAnchor,
      popupAnchor: this.popupAnchor,
      tooltipAnchor: this.tooltipAnchor,
      shadowSize: this.shadowSize
    })
  }

  initMarkers() {
    for (let index = 0; index < this.pois.length; index++) {
      const data = this.pois[index];

      if (data.icon) {
        const position: Leaflet.LatLng = new LatLng(data.latitude, data.longitude);
        const icon: Leaflet.Icon = this.createIcon(data);
        const marker: Leaflet.Marker = Leaflet.marker(position, {icon});

        marker.addTo(this.map).bindPopup(`<b>${position.lat},  ${position.lng}</b>`);
        marker.setPopupContent(data.name);
        marker.on('click', () => {
          if (data.poi_type == 'stage') {
            this.router.navigate([`/performances`], { queryParams: { stageId: data.name.substring(data.name.length - 1) } });
          }
          marker.openPopup();
        });

        this.map.panTo(position);
        this.markers.push(marker);
      }
    }
  }

  //***************************
  // Location Tracking
  //***************************
  private activateLocationTracking() {
    this.locationTrackingSubscription = this.locationUpdateTimer.subscribe(() => {
      if (this.trackPosition) {
        this.getDeviceLocation();
        if (this.position) {
          this.deviceMarker?.setLatLng([this.position.coords.latitude, this.position.coords.longitude]);
        }
        this.setDeviceMarker();
        this.deviceMarker?.addTo(this.map)
        if (this.followPosition) {
          this.panToDevicePosition();
        }
      }
    });
  }

  private setDeviceMarker() {
    if (this.position) {
      this.deviceMarker?.setLatLng([this.position.coords.latitude, this.position.coords.longitude]);
    }
  }

  panToDevicePosition() {
    if (this.position) {
      this.map.panTo([this.position.coords.latitude, this.position.coords.longitude]);
    }
  }

  getDeviceLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (x) => {this.position = x; this.trackPosition = true;},
        () => this.trackPosition = false);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  //***************************
  // Map Events
  //***************************
  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.map.on('drag', (event) => this.mapDragged(event));
    this.getAllPois().then(()=>{
      this.initMarkers();
      this.map.setView(this.festivalPosition);
    });
  }

  mapDragged($event: any) {
    this.followPosition = false;
  }

  mapClicked($event: any) {
    this.getDeviceLocation();
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked(iconId: string) {
    if(iconId == "A" || iconId == "B" || iconId == "C" || iconId == "D" || iconId == "E" || iconId == "F" ||
      iconId == "G" || iconId == "H" || iconId == "I" || iconId == "K" || iconId == "L" || iconId == "M" || iconId == "S") {
      this.router.navigate([`/performances`], { queryParams: { stageId: iconId } });
    }
  }

  private centerOnStage(stageID: string): void {
    this.poiService.getPoiByName('Stage ' + stageID.toUpperCase()).subscribe((response) => {
      const {data, error} = response;

      if (data){
        var poi = data as Poi
        console.log('lat: ' + poi.latitude + ', long: ' + poi.longitude)
        this.map.flyTo([poi.latitude, poi.longitude], 18);
      }

      if (error) {
        console.log(error);
      }
    });
  }

  //***************************
  // Buttons for the map
  //***************************
  centerOnFestival(): void {
    this.map.flyTo(this.festivalPosition, 15);
    this.followPosition = false;
  }

  togglePositionButtonChanged(): void {
    this.followPosition = !this.followPosition;
  }
}

