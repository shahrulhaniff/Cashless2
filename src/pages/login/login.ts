import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Loading, AlertController, Events } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DisplayPage } from '../display/display';
import { GlobalProvider } from "../../providers/global/global";
//import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import {Md5} from 'ts-md5/dist/md5';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public usrid    : any;
  public nama : any;
  public items    : Array<any> = [];
  public fetch    : any; // fetch one data value only from php server unlike items
  public form     : FormGroup;
  private baseURI : string  = this.global.mysite; //ok dah tukar, satu tempat je tukar lepasni
  loading: Loading;
  registerCredentials = { username: '', password: '' };
  createSuccess = false;
  public profiles : Array<any> = [];
  icdata ="";
  public icdataarray : Array<any> = [];
  namadata ="";
  public namadataarray : Array<any> = [];
  kodpengguna = "";
  go = "false";
  

  constructor(public global: GlobalProvider,
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public http       : HttpClient,
              private alertCtrl : AlertController,
              public fb         : FormBuilder,
              private loadingCtrl: LoadingController,
              public storage : Storage,
              public events: Events
              /*private modal: ModalController */
              ) {
    /* Buat validation */
    this.form = fb.group({
      "username"    : ["", Validators.required],
      "password"    : ["", Validators.required]
   });
  }

  /* komen dulu dan cancel penggunaannya untuk future use
  openModal() {
    const myModal = this.modal.create('ModalPage');
    myModal.present();
  } */

  public usrdb : Array<any> = [];
  public pwddb : Array<any> = [];
  
  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }














   public login() : void {
      let usr     : string    = this.form.controls["username"].value,
          pwd     : string    = this.form.controls["password"].value;
    console.log('usr-->', usr , 'pwd-->', pwd);

    this.showLoading();
      let headers 	: any	= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any	= { "usr" : usr, "pwd" : Md5.hashStr(pwd) },
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
          this.showPopup("Diterima", record);
          this.storage.set('kod_pengguna', '1');
          this.kodpengguna = "1";
          this.events.publish('user:2'); // user:1 = User, user:2 = admin, user:3 = subadmin
          this.storage.get('user').then((user) => { console.log("simpan storage "+user); });
          this.getNama();
          this.navCtrl.setRoot(DisplayPage, { data: this.usrid });

        }
        else if (record=='Granted2'){ 
          /*this.openModal();*/
          this.storage.set('test', this.usrid); 
          console.log("nak masuk dekat test "+this.usrid);
          this.navCtrl.setRoot(ModalPage); 
        }
        
        else if (record=='Denied'){
          this.showError("Access Denied");
          this.navCtrl.setRoot(LoginPage);
        }
      },
      error => {
        this.showPopup("Tiada sambungan internet/server", "Sila cuba sekali lagi.");
        //this.showError(error);
        console.log("Oooops!");
        console.log(error);
        this.loading.dismiss();
        //this.navCtrl.push(LoginPage); kene buuat setroot
      });
      
  }










  //showloading
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Sila tunggu...',
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









  getNama () {
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
  }


}
