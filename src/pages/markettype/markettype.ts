import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MarketdetailPage } from '../marketdetail/marketdetail';

@Component({
  selector: 'page-markettype',
  templateUrl: 'markettype.html',
})
export class MarkettypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarkettypePage');
  }

  goMarketDetailPage(data){
    console.log(data)
    this.navCtrl.push(MarketdetailPage)
  }

}
