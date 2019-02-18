import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { CalendarModule } from "ion2-calendar";

import { LocationPage } from '../pages/location/location';
import { HistoryPage } from '../pages/history/history';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { PurchtypePage } from '../pages/purchtype/purchtype';
import { PurchdetailPage } from '../pages/purchdetail/purchdetail';
import { MarkettypePage } from '../pages/markettype/markettype';
import { MarketdetailPage } from '../pages/marketdetail/marketdetail';
 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geocoder } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    LocationPage,
    HistoryPage,
    HomePage,
    TabsPage,
    SearchPage,
    PurchtypePage,
    PurchdetailPage,
    MarkettypePage,
    MarketdetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocationPage,
    HistoryPage,
    HomePage,
    TabsPage,
    SearchPage,
    PurchtypePage,
    PurchdetailPage,
    MarkettypePage,
    MarketdetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    NativeGeocoder,
    Geocoder
  ]
})
export class AppModule {}
