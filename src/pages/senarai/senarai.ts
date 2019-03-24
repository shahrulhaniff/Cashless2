import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { PayPage } from '../pay/pay';

/**
 * Generated class for the SenaraiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-senarai',
  templateUrl: 'senarai.html',
})
export class SenaraiPage {

  private baseURI : string  = this.global.mysite;
  public items : Array<any> = [];
  descending: boolean = false;
  order: number;

    //start hide
    public buttonClicked: boolean = false;
    public buttonClicked2: boolean = true;
    public onButtonClick() {
      this.buttonClicked = !this.buttonClicked;
      this.buttonClicked2 = !this.buttonClicked2;
        console.log("hide n show");
    }
    //done hide

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public global   : GlobalProvider,
              public http     : HttpClient,
              public storage  : Storage,
              public toastCtrl : ToastController) {
  }

  ionViewDidLoad() {
    this.load_table(this.navParams.get("data"));
    console.log('ionViewDidLoad SenaraiPage',this.navParams.get("data"));

    if (this.navParams.get("record")) {
      this.load_table(this.navParams.get("record"));
      console.log('Data dari navparam min: ' + this.navParams.get("record"));
      console.log('Data dari navparam min: ' , this.navParams.get("record"));
    }
  }
  
  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }
  
  sendNotification(message : string)  : void
  {
     let notification = this.toastCtrl.create({
         message       : message,
         duration      : 3000
     });
     notification.present();
  }

  pay(id_kodtransaksi) {
     id_kodtransaksi = id_kodtransaksi || 'Ada kesilapan';
 
     this.navCtrl.push(PayPage, {
       data: id_kodtransaksi
     });
   }

   load_table(idk : any) : void
   {
      let    url : any = this.baseURI+'retrieve_kodtransaksi2.php?id='+idk;
             
      this.http.get(url).subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });
      //--------------------------------------------------
    
 
 
   }

} 