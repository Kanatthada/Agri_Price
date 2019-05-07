import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ProductDataProvider } from '../../providers/product-data/product-data';
import chartJs from 'chart.js';
import * as moment from 'moment';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  @ViewChild('lineCanvas') lineCanvas: ElementRef;

  lineChart: any;

  public arr_data: Data[];
  public group: any = [];
  public type: any = [];
  public subtype: any = [];
  public ref: any = [];
  groupId: number;
  subtypeId: string;
  typeId: number;
  fromDate: string;
  toDate: string;
  randomColor: any;

  history: string = "graph";
  isAndroid: boolean = false;

  sortedByDate: any = [];
  dataNull: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datas: ProductDataProvider, public platform: Platform) {
    this.isAndroid = platform.is('android');
    this.groupId = this.navParams.get('group');
    this.typeId = this.navParams.get('type');
    this.subtypeId = this.navParams.get('id');
    this.fromDate = this.navParams.get('from');
    this.toDate = this.navParams.get('to');
    console.log(this.groupId + " " + this.typeId + " " + this.subtypeId + " " + this.fromDate + " " + this.toDate);

    this.datas.get_history(this.subtypeId, this.groupId, this.fromDate, this.toDate).subscribe((response) => {
      console.log(response);
      if (response.length != 0) {
        this.group = response[0].group_name;
        this.type = response[0].type_name;
        this.subtype = response[0].subtype_name;
        this.ref = response[0].reference_name;
        this.arr_data = response;

        this.getLineChart(response);

        this.sortedByDate = this.sortArr(response, 'date');
      } else if (response.length == 0) {
        this.datas.get_subtype( this.groupId, this.typeId).subscribe((response) => {
          this.group = response[0].group_name;
          this.type = response[0].type_name;
          this.subtype = response[0].subtype_name;
          this.ref = response[0].reference_name;
          this.dataNull = "ไม่พบข้อมูล" + response[0].subtype_name + " ในช่วงวันที่ต้องการค้นหา";
        });
      }
    });

    this.dateDifference();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  dateDifference() {
    var date1 = moment(this.fromDate, 'YYYY-MM-DD');
    var date2 = moment(this.toDate, 'YYYY-MM-DD');
    var days = date2.diff(date1, 'days');
    console.log("difference " + days + " days");
    return days;
  }

  changeFormatDate(date) {
    var getyear = date.getFullYear() + 543;
    var y = getyear.toString();
    var m = date.getMonth().toString();
    var d = date.getDate().toString();

    var arrShortMonth = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    date = d + " " + arrShortMonth[m] + " " + y;
    return date;
  }

  randomColorGenerator() {
    return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
  };

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType
    })
  }

  getLineChart(response) {
    console.log(response);
    let location = [];
    let price = [];
    let buffer = [];
    let ln = "";
    let days = [];
    let d: Date;
    let next_date: any;
    let rangeDate: number;
    let changeDate: Date;

    rangeDate = this.dateDifference();
    d = new Date(this.fromDate);

    for (let i = 0; i <= rangeDate; i++) {
      if (i == 0) {
        next_date = new Date(d.setDate(d.getDate()));
        next_date = this.changeFormatDate(next_date);
      } else {
        next_date = new Date(d.setDate(d.getDate() + 1));
        next_date = this.changeFormatDate(next_date);
      }
      days.push(next_date);
    }
    console.log(days);
    for (let item in response) {
      if (ln != response[item].location_name) {

        if (buffer.length != 0) {
          price.push(buffer);
          buffer = [];
        }

        ln = response[item].location_name;
        location.push(ln);

      }

    }
    price.push(buffer);
    buffer = [];
    console.log(buffer);
    console.log(price);
    price = Array();
    let pri = Array();
    for (let l in location) {
      pri = Array();
      for (let d in days) {
        let check = false;
        for (let r in response) {
          changeDate = new Date(response[r].date);
          changeDate = this.changeFormatDate(changeDate);
          if ((location[l] == response[r].location_name) && (days[d] == changeDate)) {
            pri.push(response[r].product_price);
            check = true;
          }
        }
        if (check == false) {
          if (pri.length == 0) {
            pri.push(0);
          } else if (pri.length > 0) {
            pri.push(pri[pri.length - 1]);
          }
        }
      }
      price.push(pri);
    }
    console.log(price);

    for (let i in location) {
      this.randomColor = this.randomColorGenerator();
      let data = {
        label: location[i],
        lineTension: 0.1,
        backgroundColor: this.randomColor,
        borderColor: this.randomColor,
        pointBackgroundColor: 'black',
        radius: 4,
        fill: false,
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1.5,
        pointHitRadius: 10,
        data: price[i],
        scanGaps: true
      }
      buffer.push(data)
    }

    const data = {
      labels: days,
      datasets: buffer
    }

    const options = {

      tooltips: {
        mode: 'index',
        intersect: true,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'ราคา'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'วันที่อัปเดต'
          }
        }]
      }

    }

    return this.getChart(this.lineCanvas.nativeElement, 'line', data, options);

  }

  sortArr(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

}

interface Data {
  group_name: string;
  type_name: string;
  subtype_name: string;
  location_name: string;
  province_name: string;
  product_price: number;
  date: string;
  reference_name: string;
}
