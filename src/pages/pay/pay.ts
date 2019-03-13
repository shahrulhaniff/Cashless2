import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalProvider } from "../../providers/global/global";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { MigsPage } from '../migs/migs';

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

  constructor(public navCtrl  : NavController, 
              public navParams: NavParams,
              public fb       : FormBuilder,
              public global   : GlobalProvider,
              public http       : HttpClient,
              private alertCtrl : AlertController,
              private inAppBrowser : InAppBrowser) {
    this.id_kodtransaksi = navParams.get('data');

    this.form = fb.group({
      "cn"   : ["", Validators.required],
      "ced"  : ["", Validators.required],
      "csc"  : ["", Validators.required],
      "pa"   : ["", Validators.required]
   });

  }

  ionViewDidLoad() {
  if (this.navParams.get("record")) {
    //this.selectEntry(this.navParams.get("record"));
    console.log('Data: ', this.navParams.get("record"));
  }
  }


  goto_url_migs() : void
   {
      console.log('Masuk fungsi register'); 
      let cn : string    = this.form.controls["cn"].value,
          ced: string    = this.form.controls["cn"].value,
          csc: string    = this.form.controls["cn"].value,
          pa : string    = this.form.controls["cn"].value;
      this.pay_process(cn,ced,csc,pa);
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
   pay_process(cn : string,ced : string,csc : string,pa : string) : void
   {
     //let fcn  = cn,fced = ced,fcsc = csc,fpa  = pa;
     let uri = this.baseURI+'go_url_migs.php?cn='+cn+'&ced='+ced+'&csc='+csc+'&pa='+pa;
     this.openWebpage(uri);

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

    const options: InAppBrowserOptions = {
      zoom: 'no'
    }

    const browser = this.inAppBrowser.create(url, '_self', options);
    //browser.close();

    if(url == "http://localhost/cashless2/app/done.php")
    {
          setTimeout(function () {
            browser.close();
          }, 1000);  
    }
    this.navCtrl.setRoot(MigsPage);
  }
}