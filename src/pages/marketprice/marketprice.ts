import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MarketDataProvider } from '../../providers/market-data/market-data';
import { MarkettypePage } from '../markettype/markettype';

/**
 * Generated class for the MarketpricePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-marketprice',
  templateUrl: 'marketprice.html',
})
export class MarketpricePage {

  public arr_data : Data[];
  currentDate;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datas : MarketDataProvider) {
      this.datas.get_category().subscribe((response) => {
        this.arr_data = response;
      });

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

  goMarketTypePage(data){
    console.log(data)
    this.navCtrl.push(MarkettypePage, { id: data.category_id, name: data.category_name })
  }
}

interface Data{
  category_id: number;
  category_name: string;
  category_image: string;
  category_icon: string;
}