import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductDataProvider {

  host = "http://192.168.56.1";
  constructor(public http: Http) {
    console.log('Hello ProductDataProvider Provider');
  }

  get_reference(){
    let url = this.host + "/api/index.php/Agri/getReference";
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_category(){
    let url = this.host + "/api/index.php/Agri/getCategoryAll";
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_type(categoryId){
    let url = this.host + "/api/index.php/Agri/getType/"+categoryId;
    return this.http.get(url).map((res)=>res.json()); 
  }
  
  get_allType(){
    let url = this.host + "/api/index.php/Agri/getTypeAll";
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_allSubtype(typeId){
    let url = this.host + "/api/index.php/Agri/getSubtypeAll/"+typeId;
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_subtype(groupId, typeId){
    let url = this.host + "/api/index.php/Agri/getSubtype/" + groupId + "/" + typeId;
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_allGroup(){
    let url = this.host + "/api/index.php/Agri/getGroupAll";
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_groupprice(groupId){
    let url = this.host + "/api/index.php/Agri/getGroup/"+groupId;
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_lastUpdate(){
    let url = this.host + "/api/index.php/Agri/getLastUpdate";
    return this.http.get(url).map((res)=>res.json()); 
  }
 
  get_history(subtypeId, groupId, fromDate, toDate){
    let url = this.host + "/api/index.php/Agri/getHistory/"+subtypeId+"/"+groupId+"/"+fromDate+"/"+toDate;
    return this.http.get(url).map((res)=>res.json()); 
  }

  get_location(){
    let url = this.host + "/api/index.php/Agri/getLocation";
    return this.http.get(url).map((res)=>res.json()); 
  }

}
