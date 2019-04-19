import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MarketdetailPage } from '../marketdetail/marketdetail';
import { MarketDataProvider } from '../../providers/market-data/market-data';

@Component({
  selector: 'page-markettype',
  templateUrl: 'markettype.html',
})
export class MarkettypePage {
  public arr_data : Data[];
  categoryName: string;
  categoryId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datas: MarketDataProvider) {
    this.categoryId = this.navParams.get('id');
    this.categoryName = this.navParams.get('name');
    
    console.log(this.categoryId);

    this.datas.get_type(this.categoryId).subscribe((response) => {
      console.log("log :"+response);
      this.arr_data = response;
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarkettypePage');
  }

  goMarketDetailPage(data){
    console.log(data)
    this.navCtrl.push(MarketdetailPage, { id: data.type_id, name: data.type_name })
  }
}

interface Data{
  type_id: number;
  type_name: string;
  category_id: number;
  type_image: string;
}
