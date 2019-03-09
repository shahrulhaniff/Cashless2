import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DisplayPage } from '../display/display';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  private baseURI : string  = this.global.mysite;
  public trans : Array<any> = [];
  public test : string;
  public form : FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private storage: Storage,
    public global   : GlobalProvider,
    public http     : HttpClient,
    public fb       : FormBuilder) {

      

      this.form = fb.group({
        "masuk" : ["", Validators.required]
     });
  }
  

  closeModal(){
    //this.view.dismiss();
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.storage.get('test').then((test) => { console.log("siapa storage test"+test); this.test = test; 
    //load kod id jenis transaksi dari database untuk tujuan select lookup
   let    url : any = this.baseURI+'retrieve_kodpengguna.php?id='+this.test; 
   console.log('url debug' + url);    
   this.http.get(url).subscribe((data : any) =>
   {
      console.dir(data);
      this.trans = data;
   },
   (error : any) =>
   {
      console.dir(error);
   });
  });//close storage test

  }

  
  saveEntry() : void
  {
     let kod_pengguna   : string = this.form.controls["masuk"].value;
     this.storage.set('kod_pengguna', kod_pengguna);

          this.storage.get('test').then((test) => { 
            this.storage.set('user', test); console.log('user' + test);
           });

           
          //this.showPopup("Success", record);
          this.navCtrl.setRoot(DisplayPage, { data: kod_pengguna });
  }

}
