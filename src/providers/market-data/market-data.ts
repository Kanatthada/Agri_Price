import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the MarketDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MarketDataProvider {

  host = "http://192.168.56.1";
  constructor(public http: Http) {
    console.log('Hello MarketDataProvider Provider');
  }

  get_reference(){
    let url = this.host + "/api/index.php/Market/getReference";
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_category(){
    let url = this.host + "/api/index.php/Market/getCategoryAll";
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_type(categoryId){
    let url = this.host + "/api/index.php/Market/getType/"+categoryId;
    return this.http.get(url).map((res)=>res.json()); 
  }
  
  get_allType(){
    let url = this.host + "/api/index.php/Market/getTypeAll";
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_subtype(typeId){
    let url = this.host + "/api/index.php/Market/getSubtype/"+typeId;
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_lastUpdate(){
    let url = this.host + "/api/index.php/Market/getLastUpdate";
    return this.http.get(url).map((res)=>res.json()); 
  }
 
  get_history(id, fromDate, toDate){
    let url = this.host + "/api/index.php/Market/getHistory/id="+id+"&fromDate="+fromDate+"&toDate="+toDate;
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_location(){
    let url = this.host + "/api/index.php/Market/getLocation";
    return this.http.get(url).map((res)=>res.json()); 
  }

}
