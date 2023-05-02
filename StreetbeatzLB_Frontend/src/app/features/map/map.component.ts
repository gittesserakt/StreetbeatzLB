import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as Leaflet from 'leaflet';
import {interval, Subscription} from "rxjs";
import {MatToolbar} from "@angular/material/toolbar";
import {PoiService} from "../../core/services/poi.service";
import {Poi} from "../../core/models/poi.model";
import {LatLng} from "leaflet";
import {waitForAsync} from "@angular/core/testing";

Leaflet.Icon.Default.imagePath = 'assets/'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  @ViewChild('toolbar', {static: true}) toolbar!: MatToolbar;
  contentHeight!: number;

  position?: GeolocationPosition;
  subscription: Subscription;
  followPosition: boolean = false;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  deviceMarker?: Leaflet.Marker;
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: {lat: 48.90163303471827, lng: 9.195045750240379}
  }
  iconPerson = Leaflet.icon({
    iconRetinaUrl: 'assets/map/adjust_black_24dp.svg',
    iconUrl: 'assets/map/adjust_black_24dp.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  iconFoodTruck = Leaflet.icon({
    iconRetinaUrl: 'assets/map/foodtruck_black_24dp.svg',
    iconUrl: 'assets/map/foodtruck_black_24dp.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  iconStage = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_A.svg',
    iconUrl: 'assets/map/stage_A.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  iconToilet = Leaflet.icon({
    iconRetinaUrl: 'assets/map/wc_black_24dp.svg',
    iconUrl: 'assets/map/wc_black_24dp.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  iconEntrance = Leaflet.icon({
    iconRetinaUrl: 'assets/map/entrance_black_24dp.svg',
    iconUrl: 'assets/map/entrance_black_24dp.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });


  navHeight!: number;

  pois!: Poi[];

  constructor(private renderer: Renderer2, private el: ElementRef, private poiService: PoiService) {
    this.deviceMarker = new Leaflet.Marker([0, 0], {icon: this.iconPerson});
    const source = interval(1000);
    this.subscription = source.subscribe(() => {
      this.getDeviceLocation();
      if (this.position) {
        this.deviceMarker?.setLatLng([this.position.coords.latitude, this.position.coords.longitude]);
      }
      this.setDeviceMarker();
      this.deviceMarker?.addTo(this.map)
      if (this.followPosition) {
        this.panToDevicePosition();
      }
    });
  }

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

  initMarkers() {
    for (let index = 0; index < this.pois.length; index++) {
      const data = this.pois[index];
      const position = new LatLng(data.latitude, data.longitude);
      const marker = data.icon ?
        Leaflet.marker(position, {icon: this.getIcon(data.icon)})
        : Leaflet.marker(position);

      marker.addTo(this.map).bindPopup(`<b>${position.lat},  ${position.lng}</b>`);
      this.map.panTo(position);
      this.markers.push(marker);
    }
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.map.on('drag', (event) => this.mapDragged(event));
    this.getAllPois().then(()=>{
      this.initMarkers();
    });
  }

  ngAfterContentViewInit() {
    this.navHeight = this.toolbar._elementRef.nativeElement.offsetHeight;
    this.contentHeight = window.innerHeight - this.navHeight;
    /*
     [style.height.px]="contentHeight"
     [style.margin-top.px]="navHeight"
     */
  }

  getButtonColor(): "accent" | "primary" {
    return this.followPosition ? 'accent' : 'primary';
  }

  toggleButtonChanged(): void {
    this.followPosition = !this.followPosition;
  }

  private setDeviceMarker() {
    if (this.position) {
      this.deviceMarker?.setLatLng([this.position.coords.latitude, this.position.coords.longitude]);
    }
  }

  ngOnInit(): void {
    this.getDeviceLocation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  panToDevicePosition() {
    if (this.position) {
      this.map.panTo([this.position.coords.latitude, this.position.coords.longitude]);
    }
  }

  getDeviceLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((x) => this.position = x,
        () => alert("Denied access to your location"));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // generateMarker(data: any, index: number) {
  //   return Leaflet.marker(data.position, {draggable: data.draggable})
  //     .on('click', (event) => this.markerClicked(event, index))
  //     .on('dragend', (event) => this.markerDragEnd(event, index));
  // }

  mapDragged($event: any) {
    this.followPosition = false;
  }

  mapClicked($event: any) {
    this.getDeviceLocation();
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

  private getIcon(icondId: string) {
    switch (icondId) {
      case "0":
        return this.iconEntrance;
      case "1":
        return this.iconStage;
      case "2":
        return this.iconFoodTruck;
      case "3":
        return this.iconToilet;
    }
    return this.iconStage;
  }
}

