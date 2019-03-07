import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Loading, AlertController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DisplayPage } from '../display/display';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public usrid    : any;
  public items    : Array<any> = [];
  public fetch    : any; // fetch one data value only from php server unlike items
  public form     : FormGroup;
  //private baseURI : string  = "http://192.168.0.112/alist/"; 
  //private baseURI : string  = "http://localhost/slogin/";
  //private baseURI : string  = "https://myraxsoft.com/alist/";
  private baseURI : string  = "https://fifwayintern.000webhostapp.com/alist/";
  loading: Loading;
  registerCredentials = { username: '', password: '' };
  createSuccess = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http       : HttpClient,
              private alertCtrl : AlertController,
              public fb         : FormBuilder,
              private loadingCtrl: LoadingController,
              public storage : Storage
              ) {
    /* Buat validation */
    this.form = fb.group({
      "username"    : ["", Validators.required],
      "password"    : ["", Validators.required]
   });
  }

  public usrdb : Array<any> = [];
  public pwddb : Array<any> = [];
  
  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

   public login() : void {

    //this.usrdb = this.items.map(items => items.usr);// userID ni drp database
    //this.pwddb = this.items.map(items => items.pwd);

      let usr     : string    = this.form.controls["username"].value,
          pwd     : string    = this.form.controls["password"].value;
          
    console.log('usr-->', usr , 'pwd-->', pwd);

    this.showLoading() //tutup dulu 
    /*
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        this.nav.setRoot('HomePage');
      } else {
        //this.showError("Access Denied");
        this.nav.setRoot('HomePage');
      }
    },
      error => {
        this.showError(error);
      }); */
      let headers 	: any	= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any	= { "usr" : usr, "pwd" : pwd },
          url       : any = this.baseURI + "login.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) => 
      {
        this.usrid = usr;
        console.log("this.usrid pgg value usr-->"+this.usrid);
        // If the request was successful notify the user
        //this.createSuccess = true;
        //this.usrid = record.usr;
        //this.usrid = this.fetch.map(fetch => fetch.auth); //xjadi dia undefine map. salah ni..
        
        if (record=='Granted') {
          
          //simpan login user dalam storage
          this.storage.set('user', this.usrid);
          this.showPopup("Success", record);
          this.navCtrl.setRoot(DisplayPage, { data: this.usrid });

          this.storage.get('user').then((user) => { console.log("simpan storage "+user); });


        } else if (record=='Denied'){
          this.showError("Access Denied");
          this.navCtrl.setRoot(LoginPage);
        }
      },
      error => {
        this.showPopup("Try Again", "Server Error!");
        //this.showError(error);
        console.log("Oooops!");
        console.log(error);
        //this.navCtrl.push(LoginPage); kene buuat setroot
      });
      
  } 


  //showloading
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
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
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Nope',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  load() : void
  {
     this.http
     .get(this.baseURI + 'login.php')
     .subscribe((data : any) =>
     {
        console.dir(data);
        this.items = data;
     },
     (error : any) =>
     {
        console.dir(error);
     });
  }

  public showuser : any;
  ionViewDidLoad() {
    this.storage.get('user').then((user) => { 
      console.log("simpan storage "+user);
      this.showuser = user;
    });
    console.log('ionViewDidLoad LoginPage-->'+this.showuser);
    //this.load(); kita takyah load data dulu nati berat
  }

}
