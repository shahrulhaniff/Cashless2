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



   ionViewWillEnter(): void {
      /*if(window.localStorage.getItem('load') == '0'){
      this.appCtrl.getRootNav().setRoot(DisplayPage);
      window.location.reload();
      window.localStorage.setItem('load', '1');
      } */
      //this.load();
      this.loadjenisbayar();
      console.log('ionViewWillEnter DisplayPage');
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

}