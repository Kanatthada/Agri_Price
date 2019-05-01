import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, App } from 'ionic-angular';
import { ProductDataProvider } from '../../providers/product-data/product-data';

/**
 * Generated class for the PopoverMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-map',
  templateUrl: 'popover-map.html'
})
export class PopoverMapComponent {
  
  selectItem: string;
  arr_data: Data[];
  data: any[] = [];

  constructor(public viewCtrl: ViewController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public datas: ProductDataProvider,
    public appCtrl: App) {

      console.log('Hello PopoverMapComponent Component');
      this.selectItem = this.navParams.get('selectItem');
      console.log(this.selectItem);

  }

  showData() {
    // console.log( this.arr_data);
    console.log("show = " + this.selectItem);
    this.arr_data = this.navParams.get('arrData');
    this.data = this.arr_data;
    if (this.selectItem == "all") {
      this.data = this.arr_data;
    }
    else if (this.selectItem == "near") {
      for (let i in this.arr_data) {
        if (this.arr_data[i].distance <= 30) {
          this.data[i] = this.arr_data[i];
        }
      }
      if (this.data.length == 0) {
        for (let i = 0; i < 5; i++) {
          this.data[i] = this.arr_data[i];
        }
      } 
    }
    else if (this.selectItem == "purch") {
      const val = 'ราคารับซื้อ';

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        console.log("เข้าฟังก์ชัน",this.arr_data)
        this.data = this.arr_data.filter((item) => {
          let filterGroupprice = item.group_name.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1;
          // console.log("filterGroupprice",filterGroupprice)
          let filter ="";
          if(filterGroupprice == true){
            if(item.group_name == val){
            filter = item.group_name;
            }
          console.log("filterGroupprice",filter)
          return filter;  
          }

          // return filterGroupprice;  
        })
        console.log(this.data)
      }   
    }
    else if (this.selectItem == "market") {
      const val = 'ราคาขาย';

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.data = this.arr_data.filter(item => {
          let filterGroupprice = item.group_name;
          // console.log()
          var filter = "";
          console.log(item);
          if(item.group_name == val){
            console.log("filterGroupprice");
            filter = item.group_name;
          }
          console.log("filterGroupprice",filter);
          return filter;  
        })
      } 
    }
    

    this.viewCtrl.dismiss(this.data, this.selectItem);
  }

  close() {
    this.data = this.arr_data;
    this.viewCtrl.dismiss(this.data, this.selectItem);
  }

}

interface Data{
  category_name: string;
  coord_id: number;
  coord_latitude: number;
  coord_longtitude: number;
  distance: any;
  location_name: string;
  province_name: string;
  type_name: string;
  group_name: string;
}
