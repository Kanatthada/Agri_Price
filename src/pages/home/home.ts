import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDataProvider } from '../../providers/product-data/product-data';
import { PurchpricePage } from '../purchprice/purchprice';
import { MarketpricePage } from '../marketprice/marketprice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentDate;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datas : ProductDataProvider) {

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

  goPurchPricePage(){
    this.navCtrl.push(PurchpricePage)
  }

  goMarketPricePage(){
    this.navCtrl.push(MarketpricePage)
  }

}
