import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDataProvider } from '../../providers/product-data/product-data';
import { HistoryPage } from '../history/history';
import * as ion2Calendar from 'ion2-calendar';
import * as moment from 'moment';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public arr_type: any[];
  public arr_subtype: any[];
  public arr_group: any[];
  public arr_price: any[];
  public arr_data: any[];
  private typeId: number;
  private groupId: number;
  private subtype: string;
  private fromDate: any;
  private toDate: any;
  public date: string;

  dateRange: {
    from: string
    to: string
  };
  group: 'string';
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: ion2Calendar.CalendarComponentOptions = {
    from: new Date(2017, 0, 1),
    to: new Date(),
    pickMode: 'range'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public datas: ProductDataProvider) {

    this.datas.get_allGroup().subscribe((response) => {
      console.log(response);
      this.arr_group = response;
    });

  }

  sendPrice(groupId) {
    this.groupId = groupId;
    this.datas.get_groupprice(groupId).subscribe((response) => {
      console.log(this.groupId);
      console.log(response);
      this.arr_type = response;
    });
  }

  sendData(typeId) {
    this.typeId = typeId;
    this.datas.get_subtype(this.groupId, typeId).subscribe((response) => {
      console.log(this.typeId);
      console.log(response);
      this.arr_subtype = response;
    });
  }

  changeFormatDate(date) {
    var getyear = date.getFullYear() + 543;
    var y = getyear.toString();
    var m = date.getMonth().toString();
    var d = date.getDate().toString();

    var arrMonth = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน ', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    //var arrShortMonth = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    date = d + " " + arrMonth[m] + " " + y;
    return date;
  }

  onChange(){
    let from:any = moment(this.dateRange.from).format('YYYY-MM-DD');
    let f = new Date(from);
    from = new Date(f.setDate(f.getDate()));
    from = this.changeFormatDate(from);
    
    let to:any = moment(this.dateRange.to).format('YYYY-MM-DD');
    let t = new Date(to);
    to = new Date(t.setDate(t.getDate()));
    to = this.changeFormatDate(to);

    console.log(from + " " + to);
    this.date = from + " ถึง " + to;
    return this.date;
  }

  searchData() {
    console.log("search");
    if (!this.group) {
      console.log("price data empty");
      alert("ไม่พบข้อมูล กรุณาเลือกหมวดหมู่ราคาสินค้าค่ะ");
    } else if(!this.type){
      console.log("type data empty");
      alert("ไม่พบข้อมูล กรุณาเลือกสินค้าหลักค่ะ");
    } else if(!this.subtype){
      console.log("subtype data empty");
      alert("ไม่พบข้อมูล กรุณาเลือกสินค้าย่อยค่ะ");
    } else if(!this.dateRange){
      console.log("subtype data empty");
      alert("ไม่พบข้อมูล กรุณาเลือกวันที่ค่ะ");
    } else {
      this.fromDate = moment(this.dateRange.from).format('YYYY-MM-DD');
      this.toDate = moment(this.dateRange.to).format('YYYY-MM-DD');
      console.log(this.groupId + " " + this.typeId + " " + this.subtype + " " + this.fromDate + " " + this.toDate);
      this.navCtrl.push(HistoryPage, { group: this.groupId, type: this.typeId, id: this.subtype, from: this.fromDate, to: this.toDate });
    }
  }


}
