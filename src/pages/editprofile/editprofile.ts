import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  public profiles : Array<any> = [];
  private baseURI : string  = this.global.mysite; 

  constructor(private alertCtrl : AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public http     : HttpClient,
              public global: GlobalProvider,
              public storage  : Storage) {
  }


  ionViewWillEnter() : void {
    this.load(); 

    if(this.navParams.get("record"))
    {
      this.selectEntry(this.navParams.get("record"));
    }

    console.log('ionViewDidLoad ProfilePage');
  }

  user = "";
  kodpengguna = "";
  name = "";
  email = "";
  telnum = "";
  ic ="";
  createSuccess = false;


  selectEntry(profile : any) : void
    {
      this.name = profile.nama;
      this.email = profile.email;
      this.telnum=profile.no_telefon;
    }

    submit(){
      this.update(this.name, this.email, this.telnum, this.user);
    }

    update(name : string, email : string, telnum : string, user : string) : void
   {
      this.storage.set('nama', name);
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {"name" : name, "email" : email, "telnum" : telnum, "user" : user },
          url       : any   = this.baseURI + "editprofile.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) =>
      {
         // If the request was successful notify the user
         this.createSuccess = true;
         this.showPopup("Profil dikemaskini", "Profil telah berjaya dikemaskini.");
      },
      error => {
        this.showPopup("Gagal", "Sila cuba lagi sekali.");
      });
   }

  load() : void
  {
    this.storage.get('kod_pengguna').then((kod_pengguna) => { 
      this.kodpengguna = kod_pengguna;
    }); //close storage

     this.storage.get('user').then((user) => {
      this.user = user;
     //--------------------------------------------------
   }); //close storage
  }


  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              //this.navCtrl.popToRoot();
              this.navCtrl.setRoot(ProfilePage);
            }
          }
        }
      ]
    });
    alert.present();
  }


}
