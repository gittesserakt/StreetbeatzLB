import {Component, OnInit, OnDestroy} from '@angular/core';
import * as Leaflet from 'leaflet';
import {interval, Subscription} from "rxjs";
import {latLng} from "leaflet";

Leaflet.Icon.Default.imagePath = 'assets/'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  constructor(private position: GeolocationPosition, private subscription: Subscription) {
    const source = interval(1000);
    this.subscription = source.subscribe(x => {
      this.getDeviceLocation();
      this.panToPosition();
    });
  }

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: {lat: 48.90163303471827, lng: 9.195045750240379}
  }

  ngOnInit(): void {
    this.getDeviceLocation();
    this.panToPosition();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  panToPosition() {
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

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
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

