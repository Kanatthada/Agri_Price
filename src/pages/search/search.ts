import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as ion2Calendar from 'ion2-calendar';
import * as moment from 'moment';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public date: string;

  dateRange: {
    from: string
    to: string
  };
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: ion2Calendar.CalendarComponentOptions = {
    from: new Date(2017, 0, 1),
    to: new Date(),
    pickMode: 'range'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    
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

}
