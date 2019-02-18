import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PurchtypePage } from '../purchtype/purchtype';
import { MarkettypePage } from '../markettype/markettype';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentDate;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.getCurrentDate();

  }

  getCurrentDate(){
    var dateObj = new Date();
    var getyear = dateObj.getFullYear()+543;
    var year = getyear.toString();
    var month = dateObj.getMonth().toString();
    var date = dateObj.getDate().toString();

    var monthArray = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน ', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

    this.currentDate = date + " " + monthArray[month] + " " + year;
  }

  goPurchTypePage(){
    this.navCtrl.push(PurchtypePage)
  }

  goMarketTypePage(){
    this.navCtrl.push(MarkettypePage)
  }

}