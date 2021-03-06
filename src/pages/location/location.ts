import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController, LoadingController, Platform } from 'ionic-angular';
import { PopoverMapComponent } from '../../components/popover-map/popover-map';
import { Geolocation } from '@ionic-native/geolocation';
import { ProductDataProvider } from '../../providers/product-data/product-data';
import * as L from 'leaflet';

declare var google: any;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {

  location: string = "pin";
  isAndroid: boolean = false;

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  select: string = "near";
  latitude: number;
  longitude: number;

  place: any[];
  public arr_data: any[] = [];
  dataTemp: any[] = [];
  address: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public viewCtrl: ViewController, public geolocation: Geolocation, public datas: ProductDataProvider, public platform: Platform, private loadingCtrl: LoadingController) {
    this.isAndroid = platform.is('android');

    this.loadNearbyLocation();

    this.presentLoader();
  }

  presentLoader(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'รอสักครู่ กำลังโหลด...',
      duration: 300
    });

    loading.present();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    this.getLatLng();

    // this.arr_data = this.getNearest();
    // console.log(this.arr_data);

    this.loadmap();
  }

  doRefresh(refresher) {
    this.getLatLng();
    this.map.off();
    this.map.remove();
    this.loadmap();
    refresher.complete();
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

  //Show popover menu
  openPopover(event) {
    let popover = this.popoverCtrl.create(PopoverMapComponent, { arrData: this.place, selectItem: this.select });
    popover.present({
      ev: event
    });

    popover.onDidDismiss((data, selectItem) => {
      console.log("data");
      console.log(data);
      if (data != null) {
        this.arr_data = data;
        this.select = selectItem
      }
      this.dataTemp = this.arr_data;
      this.map.off();
      this.map.remove();
      this.loadmap();
      return this.arr_data, this.select;
    });

  }

  getNearest(data) {
    console.log(data);
    let distance = [];
    let temp = [];
    for (let i in data) {
      distance[i] = parseFloat(data[i].distance);

      if (distance[i] <= 30) {
        temp[i] = data[i];
      }
    }
    if (data.length == 0) {
      for (let i = 0; i < 5; i++) {
        temp[i] = data[i];
      }
    }
    console.log(temp);
    this.arr_data = temp;
    this.loadPoints();
    return this.arr_data;
  }


  loadNearbyLocation() {
    this.datas.get_location().subscribe((response) => {
      console.log("response");
      console.log(response);
      this.geolocation.getCurrentPosition().then(result => {
        this.latitude = result.coords.latitude;
        this.longitude = result.coords.longitude;
        console.log(this.latitude + ", " + this.longitude);
        this.arr_data = this.applyHaversine(response, this.latitude, this.longitude);
        this.arr_data = this.arr_data.sort((locationA: any, locationB: any) => {
          return locationA.distance - locationB.distance;
        });
        this.place = this.arr_data.sort((locationA: any, locationB: any) => {
          return locationA.distance - locationB.distance;
        });
        let near: any = this.getNearest(this.arr_data);
        this.arr_data = near;
        console.log(this.arr_data);
        return this.arr_data;
      });
    });
  }

  applyHaversine(locations, lati, lngi) {

    let usersLocation = {
      lat: lati,
      lng: lngi
    };
    console.log(usersLocation);

    locations.map((location) => {

      let placeLocation = {
        lat: location.coord_latitude,
        lng: location.coord_longitude
      };

      if (placeLocation.lat != null && placeLocation.lng != null) {
        location.distance = this.getDistanceBetweenPoints(
          usersLocation,
          placeLocation,
          'km'
        ).toFixed(2);
        //console.log(location.distance);
      } else {
        location.distance = 0;
      }
    });

    return locations;
  }

  getDistanceBetweenPoints(start, end, units) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'km'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  }

  loadmap() {
    // set up the map 
    this.map = new L.Map('map');
    // load a tile layer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution : 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
    this.map.attributionControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors');
    this.map.locate({
      setView: true,
      maxZoom: 8
    }).on('locationfound', (e) => {
      console.log(e)
      let markerGroup = L.featureGroup();
      let marker: any = L.marker([e.latitude, e.longitude]).on('click', () => {
        console.log(e.latitude + ", " + e.longitude);
        alert(this.address);
      });
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    }).on('locationerror', (err) => {
      alert(err.message);
    });
    this.loadPoints();
  }


  loadPoints() {

    let markerGroup = L.featureGroup();
    var myIcon: any;

    console.log(this.arr_data);
    let arr_data = Array();
    for (let i = 0; i < this.arr_data.length; i++) {
      let check: boolean = false;
      let temp;
      for (let j = 0; j < arr_data.length; j++) {
        if (this.arr_data[i].location_name == arr_data[j].location_name) {
          check = true;
          temp = this.arr_data[i];
        }
      }
      if (check == false) {
        arr_data.push(this.arr_data[i]);
      } else if (check == true) {
        for (let j = 0; j < arr_data.length; j++) {
          if (temp.location_name == arr_data[j].location_name) {
            arr_data[j].category_name = arr_data[j].category_name + temp.category_name;
            console.log(arr_data[j].category_name);
          }
        }
      }
    }
    console.log(arr_data);
    for (let i = 0; i < arr_data.length; i++) {
      if (arr_data[i].category_name == "ตลาดข้าว") {
        myIcon = L.icon({
          iconUrl: 'assets/imgs/pin_rice.png',
          iconSize: [37, 37],
          iconAnchor: [9, 21],
          popupAnchor: [0, -14]
        });
      } else if (arr_data[i].category_name == "ตลาดดอกไม้") {
        myIcon = L.icon({
          iconUrl: 'assets/imgs/pin_flower.png',
          iconSize: [37, 37],
          iconAnchor: [9, 21],
          popupAnchor: [0, -14]
        });
      } else if (arr_data[i].category_name == "ตลาดปศุสัตว์") {
        myIcon = L.icon({
          iconUrl: 'assets/imgs/pin_livestock.png',
          iconSize: [37, 37],
          iconAnchor: [9, 21],
          popupAnchor: [0, -14]
        });
      } else if (arr_data[i].category_name == "ตลาดผลไม้") {
        myIcon = L.icon({
          iconUrl: 'assets/imgs/pin_fruit.png',
          iconSize: [37, 37],
          iconAnchor: [9, 21],
          popupAnchor: [0, -14]
        });
      } else if (arr_data[i].category_name == "ตลาดผัก") {
        myIcon = L.icon({
          iconUrl: 'assets/imgs/pin_vegetable.png',
          iconSize: [37, 37],
          iconAnchor: [9, 21],
          popupAnchor: [0, -14]
        });
      } else if (arr_data[i].category_name == "ตลาดพืชเศรษฐกิจ") {
        myIcon = L.icon({
          iconUrl: 'assets/imgs/pin_agri.png',
          iconSize: [37, 37],
          iconAnchor: [9, 21],
          popupAnchor: [0, -14]
        });
      } else if (arr_data[i].category_name == "ตลาดสัตว์น้ำ") {
        myIcon = L.icon({
          iconUrl: 'assets/imgs/pin_aquatic.png',
          iconSize: [37, 37],
          iconAnchor: [9, 21],
          popupAnchor: [0, -14]
        });
      } else {
        console.log(arr_data[i]);
        myIcon = L.icon({
          iconUrl: 'assets/imgs/icon_market.png',
          iconSize: [37, 37],
          iconAnchor: [9, 21],
          popupAnchor: [0, -14]
        });
      }
      var popup = arr_data[i].location_name;
      var marker = L.marker([arr_data[i].coord_latitude, arr_data[i].coord_longitude], { icon: myIcon }).bindPopup(popup);
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    }

  }

  setItem() {
    this.arr_data = this.dataTemp;
  }

  searchItem(ev: any) {
    console.log(ev);

    // Reset items back to all of the items
    this.setItem();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.arr_data = this.arr_data.filter(function (item: any) {
        return item.location_name.includes(val) || item.province_name.includes(val)
      });
    }

  }

  startExternalMap(lat: any, lng: any) {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((position) => {
        // ios
        if (this.platform.is('ios')) {
          window.open('maps://?saddr=' + position.coords.latitude + ',' + position.coords.longitude + '&daddr=' + lat + ',' + lng, '_system');
        };
        // android
        if (this.platform.is('android')) {
          window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + lat + ',' + lng, '_system');
        };
      });
    });
  }


}