import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PurchdetailPage } from '../purchdetail/purchdetail';

@Component({
  selector: 'page-purchtype',
  templateUrl: 'purchtype.html',
})
export class PurchtypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchtypePage');
  }

  goPurchDetailPage(data){
    console.log(data)
    this.navCtrl.push(PurchdetailPage)
  }
}