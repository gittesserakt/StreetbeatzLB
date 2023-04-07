import {Component, OnInit, OnDestroy} from '@angular/core';
import * as Leaflet from 'leaflet';
import {interval, Subscription} from "rxjs";

Leaflet.Icon.Default.imagePath = 'assets/'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  @ViewChild ('toolbar', {static: true}) toolbar!: MatToolbar;
  contentHeight!: number;
  navHeight!: number;

  ngAfterContentViewInit() {
    this.navHeight = this.toolbar._elementRef.nativeElement.offsetHeight;
    this.contentHeight = window.innerHeight - this.navHeight;
    /*
     [style.height.px]="contentHeight"
     [style.margin-top.px]="navHeight"
     */
  }


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
    iconRetinaUrl:'assets/map/adjust_black_24dp.svg',
    iconUrl:'assets/map/adjust_black_24dp.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.deviceMarker = new Leaflet.Marker([0, 0],{icon: this.iconPerson});
    const source = interval(1000);
    this.subscription = source.subscribe(x => {
      this.getDeviceLocation();
      if (this.position) {
        this.deviceMarker?.setLatLng([this.position.coords.latitude, this.position.coords.longitude]);
      }
      this.setDeviceMarker();
      this.deviceMarker?.addTo(this.map)
      if(this.followPosition){
        this.panToDevicePosition();
      }
    });
  }

  getButtonColor(): "accent" | "primary" {
    return this.followPosition ? 'accent' : 'primary';
  }

  toggleButtonChanged(): void {
    this.followPosition = this.followPosition ? false : true;
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

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
    this.map.on('drag', (event) => this.mapDragged(event));
  }

  panToDevicePosition() {
    if (this.position) {
      this.map.panTo([this.position.coords.latitude, this.position.coords.longitude]);
    }
  }

  getDeviceLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((x) => this.position = x,
        (y) => alert("Denied access to your location"));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  initMarkers() {
    const initialMarkers = [
      {
        position: {lat: 48.902251005875385, lng: 9.199487247719524},
        draggable: true
      },
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, {draggable: data.draggable})
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

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
}

