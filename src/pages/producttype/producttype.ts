import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductdetailPage } from '../productdetail/productdetail';

/**
 * Generated class for the ProducttypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-producttype',
  templateUrl: 'producttype.html',
})
export class ProducttypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProducttypePage');
  }

  goProductDetailsPage(data){
    console.log(data)
    this.navCtrl.push(ProductdetailPage)
  }
}