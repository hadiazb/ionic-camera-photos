import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';

const apiToken = environment.apiTokenMapbox;

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() coords?: string | null;
  @ViewChild('map', { static: true }) map?: ElementRef;

  constructor() {}

  ngOnInit() {
    this.buildMap();
  }

  public buildMap() {
    if (this.coords) {
      mapboxgl.accessToken = apiToken;
      const latLng = this.coords.split(',');

      const lat = Number(latLng[0]);
      const lng = Number(latLng[1]);
      const map = new mapboxgl.Map({
        container: this.map?.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: 13,
      });

      map.on('style.load', () => {
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
        map.resize();
      });
    }
  }
}
