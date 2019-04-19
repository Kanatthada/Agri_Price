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
import { PurchpricePage } from '../pages/purchprice/purchprice';
import { MarketpricePage } from '../pages/marketprice/marketprice';
 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geocoder } from '@ionic-native/google-maps';
import { PopoverComponent } from '../components/popover/popover';
import { PopoverMapComponent } from '../components/popover-map/popover-map';
import { ProductDataProvider } from '../providers/product-data/product-data';
import { ThaiDatePipe } from '../pipes/thai-date/thai-date';
import { MarketDataProvider } from '../providers/market-data/market-data';

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
    MarketdetailPage,
    PopoverComponent,
    PopoverMapComponent,
    PurchpricePage,
    MarketpricePage,
    ThaiDatePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonIcon: 'ios-arrow-back' ,
      backButtonText: 'ย้อนกลับ',
      pageTransition: 'ios-transition', // attention
      activator: 'ripple',
      mode: 'ios',
      tabsHideOnSubPages: true // attention
    }),
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
    MarketdetailPage,
    PopoverComponent,
    PopoverMapComponent,
    PurchpricePage,
    MarketpricePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    NativeGeocoder,
    Geocoder,
    ProductDataProvider,
    MarketDataProvider
  ]
})
export class AppModule {}
