import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import 'rxjs/add/operator/map';
import { SenaraiPage } from '../senarai/senarai';
import { SlidePage } from '../slide/slide';

@IonicPage()
@Component({
   selector: 'page-display',
   templateUrl: 'display.html',
})
export class DisplayPage {

   //Used to store returned PHP data
   public items: Array<any> = [];
   public types: Array<any> = [];
   public category;
   private baseURI: string = this.global.mysite;

   constructor(public global: GlobalProvider,
      public navCtrl: NavController,
      public navParams: NavParams,
      public http: HttpClient,
      public storage: Storage, public appCtrl: App) {

      this.category = "all";
   }
   ionRefresh(event) {
      console.log('Pull Event Triggered!');
      setTimeout(() => {
         console.log('Async operation has ended');
         this.ionViewWillEnter();
         //complete()  signify that the refreshing has completed and to close the refresher
         event.complete();
      }, 2000);
   }
   ionPull(event) {
      //Emitted while the user is pulling down the content and exposing the refresher.
      console.log('ionPull Event Triggered!');
   }
   ionStart(event) {
      //Emitted when the user begins to start pulling down.
      console.log('ionStart Event Triggered!');
   }

   shownama = "";
   showuser = "";
   kodpengguna = "";

   ionViewWillEnter(): void {
      this.getNama();
      this.loadjenisbayar();
      console.log('------DISPLAYPAGE------');
      this.storage.get('nama').then((nama) => {this.shownama = nama; });
      this.storage.get('user').then((user) => {this.showuser = user; });
      this.storage.get('kod_pengguna').then((kod_pengguna) => {this.kodpengguna = kod_pengguna; });
      console.log("storage nama user SEKARANG:",this.shownama); //kena pan dalam baru keluar
   }


   load(): void {
      this.storage.get('user').then((user) => {

         let url: any = this.baseURI + 'retrieve.php?id=' + user;

         this.http.get(url).subscribe((data: any) => {
            console.dir(data);
            this.items = data;
         },
            (error: any) => {
               console.dir(error);
            });
         //--------------------------------------------------
      }); //close storage
   }


   loadjenisbayar(): void {

      let url: any = this.baseURI + 'retrieve_idjenistransaksi.php';

      this.http.get(url).subscribe((data: any) => {
         console.dir(data);
         this.types = data;
      },
         (error: any) => {
            console.dir(error);
         });
   }



   viewEntry(param: any): void {
      this.navCtrl.push('CrudPage', param);
   }
   addEntry(): void {
      this.navCtrl.push('CrudPage');
   }
   scanToPay(): void {
      this.navCtrl.push('ScanPage');
   }
   gotoSenarai(): void {
      this.navCtrl.push(SenaraiPage);
   }
   gotoSenarai2(param: any): void {
      //this.navCtrl.push(SenaraiPage, param);

      this.navCtrl.push(SenaraiPage, {
         data: param
      });

      console.log("param ID " + param);
   }

   slide(){
      this.navCtrl.push(SlidePage)
   }








  usrid= "";
  public profiles : Array<any> = [];
  icdata ="";
  public icdataarray : Array<any> = [];
  namadata ="";
  public namadataarray : Array<any> = [];

  getNama () {
   this.storage.get('user').then((user) => {this.usrid = user;
      let    url : any = this.baseURI+'retrieve_profile.php?id='+this.usrid+'&kodpengguna='+this.kodpengguna;
      this.http.get(url).subscribe((data2 : any) =>
      {
         console.dir(data2);
         this.profiles = data2;
         console.log("profile.length->",this.profiles.length);
         this.icdataarray = this.profiles.map(profiles => profiles.ic_pengguna);
         this.namadataarray = this.profiles.map(profiles => profiles.nama);
         console.log("this.nama-data-array->", this.namadataarray);
        for(let i = 0; i < this.profiles.length; i++){
          if(this.usrid == this.icdataarray[i]){
            this.icdata = this.icdataarray[i];
            this.namadata = this.namadataarray[i];
            this.storage.set('nama', this.namadata);
            console.log("namadata masuk dalam storage1",this.namadata);
            break;
          }
        }
      },
      (error : any) =>
      {
         console.dir(error);
      });
      console.log("namadata masuk dalam storage2",this.namadata);
  });
  }

}