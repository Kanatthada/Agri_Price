import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PurchdetailPage } from '../purchdetail/purchdetail';
import { ProductDataProvider } from '../../providers/product-data/product-data';

@Component({
  selector: 'page-purchtype',
  templateUrl: 'purchtype.html',
})
export class PurchtypePage {
  public arr_data : Data[];
  categoryName: string;
  categoryId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datas: ProductDataProvider) {
    this.categoryId = this.navParams.get('id');
    this.categoryName = this.navParams.get('name');
    
    console.log(this.categoryId);

    this.datas.get_type(this.categoryId).subscribe((response) => {
      console.log("log :"+response);
      this.arr_data = response;
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchtypePage');
  }

  goPurchDetailPage(data){
    console.log(data)
    this.navCtrl.push(PurchdetailPage, { id: data.type_id, name: data.type_name })
  }
}

interface Data{
  type_id: number;
  type_name: string;
  category_id: number;
  type_image: string;
}
