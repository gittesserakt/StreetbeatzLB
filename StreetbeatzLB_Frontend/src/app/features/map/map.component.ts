import {Component, ElementRef, OnDestroy, OnInit, AfterViewInit, Renderer2, ViewChild} from '@angular/core';
import * as Leaflet from 'leaflet';
import {interval, Subscription} from "rxjs";
import {MatToolbar} from "@angular/material/toolbar";
import {PoiService} from "../../core/services/poi.service";
import {Poi} from "../../core/models/poi.model";
import {control, LatLng} from "leaflet";
import {Router, ActivatedRoute} from "@angular/router";
import zoom = control.zoom;

Leaflet.Icon.Default.imagePath = 'assets/'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {

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

  IconStageA = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_A.svg',
    iconUrl: 'assets/map/stage_A.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  IconStageB = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_B.svg',
    iconUrl: 'assets/map/stage_B.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  IconStageC = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_C.svg',
    iconUrl: 'assets/map/stage_C.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  IconStageD = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_D.svg',
    iconUrl: 'assets/map/stage_D.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  IconStageE = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_E.svg',
    iconUrl: 'assets/map/stage_E.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  IconStageF = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_F.svg',
    iconUrl: 'assets/map/stage_F.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  IconStageG = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_G.svg',
    iconUrl: 'assets/map/stage_G.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  IconStageH = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_H.svg',
    iconUrl: 'assets/map/stage_H.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  IconStageI = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_I.svg',
    iconUrl: 'assets/map/stage_I.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  IconStageK = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_K.svg',
    iconUrl: 'assets/map/stage_K.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });


  IconStageL = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_L.svg',
    iconUrl: 'assets/map/stage_L.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });


  IconStageM = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_M.svg',
    iconUrl: 'assets/map/stage_M.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });


  IconStageS = Leaflet.icon({
    iconRetinaUrl: 'assets/map/stage_S.svg',
    iconUrl: 'assets/map/stage_S.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });


  navHeight!: number;
  trackPosition: boolean = false;
  pois!: Poi[];

  constructor(private renderer: Renderer2, private el: ElementRef, private poiService: PoiService,
              private router: Router, private activatedRouter: ActivatedRoute) {
    this.deviceMarker = new Leaflet.Marker([0, 0], {icon: this.iconPerson});
    const source = interval(1000);
    this.subscription = source.subscribe(() => {
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

  private centerPoi(stageID: string): Promise<void> {
    return new Promise<void>((resolve, reject) =>{
      this.poiService.getPoiByName(stageID).subscribe((response) => {
        const {data, error} = response;

        if (data){
          var poi = data as Poi
          console.log('lat: ' + poi.latitude + ', long: ' + poi.longitude)
          this.map.flyTo([poi.latitude, poi.longitude], 18);
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

      marker.on('click', () => {
        this.markerClicked(data.icon); // Call the markerClicked() method with the clicked marker data
      });

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

  ngAfterViewInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['stageId']) {
        this.centerPoi(params['stageId']);
      }
    });
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
      navigator.geolocation.getCurrentPosition(
        (x) => {this.position = x; this.trackPosition = true;},
        () => this.trackPosition = false);
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

  markerClicked(iconId: string) {
    this.router.navigate([`/performances`], { queryParams: { stageId: iconId } });
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

  getIcon(iconId: string) {
    switch (iconId) {
      case "0":
        return this.iconEntrance;
      case "2":
        return this.iconFoodTruck;
      case "3":
        return this.iconToilet;
      case "A":
        return this.IconStageA;
      case "B":
        return this.IconStageB;
      case "C":
        return this.IconStageC;
      case "D":
        return this.IconStageD;
      case "E":
        return this.IconStageE;
      case "F":
        return this.IconStageF;
      case "G":
        return this.IconStageG;
      case "H":
        return this.IconStageH;
      case "I":
        return this.IconStageI;
      case "K":
        return this.IconStageK;
      case "L":
        return this.IconStageL;
      case "M":
        return this.IconStageM;
      case "S":
        return this.IconStageS;
    }
    return this.IconStageA;
  }
}

