import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  public form     : FormGroup;
  
  //private baseURI : string  = "http://192.168.0.112/alist/";
  //private baseURI : string  = "https://myraxsoft.com/alist/";
  private baseURI : string  = "https://fifwayintern.000webhostapp.com/alist/";

  constructor(  public navCtrl    : NavController, 
                public navParams  : NavParams, 
                public http       : HttpClient,
                private alertCtrl : AlertController,
                public fb         : FormBuilder) {
                  /* Buat validation */
                  this.form = fb.group({
                    "username"    : ["", Validators.required],
                    "password"    : ["", Validators.required],
                    "password2"   : ["", Validators.required]
                 });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    
    //this.register();
  }

  public usr;
  public pwd;
  
  register() : void
   {
      console.log('Masuk fungsi register'); 
      let usr     : string    = this.form.controls["username"].value,
          pwd     : string    = this.form.controls["password"].value,
          pwd2    : string    = this.form.controls["password2"].value;
      if (pwd!=pwd2) { this.showPopup("Nope", "Check your password."); }
      else { this.createUser(usr, pwd);  } 
      
    console.log('usr-->', usr , 'pwd-->', pwd); //undefine bosku
   }

   createUser(usr : string, pwd : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "create", "usr" : usr, "pwd" : pwd },
          url       : any   = this.baseURI + "createEntry2.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) =>
      {
         // If the request was successful notify the user
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      },
      error => {
        this.showPopup("Fail bosku error", error);
      });
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

}