import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import * as L from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  location: string = "pin";
  isAndroid: boolean = false;

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  latitude: number;
  longitude: number;
  address: string;

  constructor(public navCtrl: NavController, public navParems: NavParams, public platform: Platform, public geolocation: Geolocation) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
      this.getLatLng();
      this.loadmap();
  }

  getLatLng() {
    let options = { timeout: 30000, enableHighAccuracy: true, maximumAge: 3600 };
    this.geolocation.getCurrentPosition(options).then(result => {
      this.latitude = result.coords.latitude;
      this.longitude = result.coords.longitude;
      this.getCurrAddress(this.latitude, this.longitude);
    });
  }

  getCurrAddress(latitude, longitude) {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(latitude, longitude);
    let request = {
      latLng: latlng
    };
    geocoder.geocode(request, (data, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (data[0] != null) {
          this.address = data[0].formatted_address;
          console.log(data[0]);
          console.log("address is: " + this.address);
        } else {
          console.log("No address available");
        }
      }
    });
    return this.address;
  }

  loadmap() {
    this.map = new L.Map('map');
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
    this.map.attributionControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors');
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = L.featureGroup();
      let marker: any = L.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
  }

}
