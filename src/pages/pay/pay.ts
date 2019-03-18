import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalProvider } from "../../providers/global/global";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { MigsPage } from '../migs/migs';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  createSuccess = false;
  id_kodtransaksi : string;
  public form     : FormGroup;
  private baseURI : string  = this.global.mysite;
  url : string;

  //ni simpan semua dulu
  public list : Array<any> = [];
  //ni utk pilih satu
  public harga : Array<any> = [];
  public idk : Array<any> = [];
  //dan guna utk show
  public showharga:string;

  constructor(public navCtrl  : NavController, 
              public navParams: NavParams,
              public fb       : FormBuilder,
              public global   : GlobalProvider,
              public http       : HttpClient,
              private alertCtrl : AlertController,
              private inAppBrowser : InAppBrowser,
              public storage  : Storage ) {

    this.id_kodtransaksi = navParams.get('data');

    this.form = fb.group({
      "cn"   : ["", Validators.required],
      "ced"  : ["", Validators.required],
      "csc"  : ["", Validators.required],
      "pa"   : ["", Validators.required]
   });

  }

  ionViewDidLoad() {
  this.loadAmount();
  console.log('Data: ', this.navParams.get("data"));
  //this.selectEntry(this.navParams.get("data"));
  console.log('Harga showharga: ', this.showharga);
  }

  /*selectEntry(mylist: any): void {
    this.idk = this.list.map(go => go.id_kodtransaksi);
    this.harga = this.list.map(go => go.harga); console.log('uuuuu: ', this.list.map(go => go.harga));

    //for (let i = 0; i <= this.list.length; i++) {
      //if (mylist.idk == this.id_kodtransaksi) {
        console.log('mylist dot idk: ', this.id_kodtransaksi);
        this.showharga = this.harga[0];
        console.log('Harga showharga2: ', this.showharga);
        //break;
      //}
    //}
  } */

  goto_url_migs() : void
   {
      console.log('Masuk fungsi register'); 
      let cn : string    = this.form.controls["cn"].value,
          ced: string    = this.form.controls["cn"].value,
          csc: string    = this.form.controls["cn"].value,
          pa : string    = this.form.controls["cn"].value;
      this.pay_process(cn,ced,csc,pa, this.id_kodtransaksi);
   }
   /*pay_process(cn : string,ced : string,csc : string,pa : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {"cn"  : cn,
                               "ced" : ced,
                               "csc" : csc, 
                               "pa"  : pa},
          url       : any   = this.baseURI + "go_url_migs.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) =>
      {
         // If the request was successful notify the user
        this.createSuccess = true;
        this.showPopup("Success", "go to web.");
      },
      error => {
        this.showPopup("Error happen", error);
      });
   } */
   pay_process(cn : string,ced : string,csc : string,pa : string,idk : string) : void
   {
    this.storage.get('user').then((user) => {//
     //let fcn  = cn,fced = ced,fcsc = csc,fpa  = pa;
     let uri = this.baseURI+'go_url_migs.php?cn='+cn+'&ced='+ced+'&csc='+csc+'&pa='+pa+'&idk='+idk+'&user='+user;
     this.openWebpage(uri);
    }); //close storage
   }

   //Untuk Popup
   showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }


  openWebpage(url:string){
    const options: InAppBrowserOptions = {zoom: 'no'}
    const browser = this.inAppBrowser.create(url, '_self', options);
    //browser.close(); TAK JADI NI TRY BUAT KALAU JUMPA URL_DONE & SET MASA TIMEOUT PUN TAJADI
    if(url == "http://localhost/cashless2/app/done.php"){setTimeout(function () {browser.close();}, 1000);}
    this.navCtrl.setRoot(MigsPage);
  }
  
  loadAmount() : void
  {
     let    url : any = this.baseURI+'retrieve_harga.php?id='+this.id_kodtransaksi;
     this.http.get(url).subscribe((data : any) =>
     {
        console.dir(data);
        this.list = data;
        this.harga = this.list.map(go => go.harga);
        console.log('vvv: ', this.list.map(go => go.harga));
        console.log('www: ', this.harga);
        this.showharga = this.harga[0];
     },
     (error : any) =>
     {
        console.dir(error);
     });
  }
}