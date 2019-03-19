import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { DisplayPage } from '../pages/display/display';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { KodtransaksiPage } from '../pages/kodtransaksi/kodtransaksi';
import { ProfilePage } from '../pages/profile/profile';
import { HistoryPage } from '../pages/history/history';
import { Kodtransaksi2Page } from '../pages/kodtransaksi2/kodtransaksi2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
  private user: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private storage: Storage) {
    //this.initializeApp();

    //One time Login Purposes
    this.storage.get('user').then((user) => {
      this.user = user; console.log("data kat dalam app.co-->"+this.user); 
      if(this.user==null) { this.rootPage =LoginPage;}
      else {this.rootPage=DisplayPage; };
     /*
      // TUKAR DARI IC GUNA SET ROLE kod_pengguna ++++++++++++++++++++++++++++++++ MUHAIMIN 1 +++++++++++++++++++++++++++++
      if(user=='941013115436') {
        // used for an example of ngFor and navigation
        this.pages = [
          { title: 'Utama', component: DisplayPage },
          { title: 'Profil', component: ProfilePage },
          { title: 'Aktiviti Transaksi', component: HistoryPage },
          { title: 'Senarai Sebut Harga', component: KodtransaksiPage },
          { title: 'Log Keluar', component: ListPage }
        ];
             }
             else if(user=='941013115435') {
        // used for an example of ngFor and navigation
        this.pages = [
          { title: 'Utama', component: DisplayPage },
          { title: 'Profil', component: ProfilePage },
          { title: 'Aktiviti Transaksi', component: HistoryPage },
          { title: 'Senarai Sebut Harga', component: KodtransaksiPage },
          { title: 'Senarai Sebut Harga', component: Kodtransaksi2Page }, // +++++++++++++++ nanti bila dah tambah yang selain JPP guna menu ni MUHAIMIN 3 +++++++++++++++++
          { title: 'Log Keluar', component: ListPage }
        ];
             }
             //tambah satu lagi THIS.PAGES untuk sub-admin selain jpp ++++++++++++++++++++++++++++++ MUHAIMIN 2 +++++++++++++++
    */
    });//close storage


    //kalau jadi menu authorize based on user diatas sila komen/buang kod this.pages dibawah ini.
    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: HomePage },
      //{ title: 'Start', component: StartPage },
      //{ title: 'List', component: ListPage }, //dah guna untuk logout
      { title: 'Utama', component: DisplayPage },
      { title: 'Profil', component: ProfilePage },
      { title: 'Aktiviti Transaksi', component: HistoryPage },
      { title: 'Senarai Sebut Harga', component: KodtransaksiPage },
      { title: 'Log Keluar', component: ListPage }
    ];
}

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
