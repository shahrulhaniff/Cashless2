import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StartPage } from '../pages/start/start';
import { DisplayPage } from '../pages/display/display';
import { LoginPage } from '../pages/login/login';
import { TextAvatarDirective } from '../directives/text-avatar/text-avatar';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Toast } from '@ionic-native/toast/ngx';
import { KodtransaksiPage } from '../pages/kodtransaksi/kodtransaksi';
import { GlobalProvider } from '../providers/global/global';
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';
import { ModalPage } from '../pages/modal/modal';
import { PayPage } from '../pages/pay/pay';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MigsPage } from '../pages/migs/migs';
import { ProfilePage } from '../pages/profile/profile';
<<<<<<< HEAD
import { MainmenuPage } from '../pages/mainmenu/mainmenu';
=======
import { HistoryPage } from '../pages/history/history';
import { SenaraiPage } from '../pages/senarai/senarai';
>>>>>>> a3add50b9e29c293ff346910e9a22911174d0289


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    StartPage,
    DisplayPage,
    LoginPage,
    TextAvatarDirective,
    KodtransaksiPage,
    SearchPipe,
    SortPipe,
    ModalPage,
    PayPage,
    MigsPage,
    ProfilePage,
<<<<<<< HEAD
    MainmenuPage
=======
    HistoryPage,
    SenaraiPage
>>>>>>> a3add50b9e29c293ff346910e9a22911174d0289
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    StartPage,
    DisplayPage,
    LoginPage,
    KodtransaksiPage,
    ModalPage,
    PayPage,
    MigsPage,
    ProfilePage,
<<<<<<< HEAD
    MainmenuPage
=======
    HistoryPage,
    SenaraiPage
>>>>>>> a3add50b9e29c293ff346910e9a22911174d0289
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Toast,
    GlobalProvider,
    InAppBrowser
  ]
})
export class AppModule {}
