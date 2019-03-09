import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { GlobalProvider } from "../../providers/global/global";

@IonicPage()
@Component({
  selector: 'page-display',
  templateUrl: 'display.html',
})
export class DisplayPage {

  //Used to store returned PHP data
  public items : Array<any> = [];  
  public category;
  private baseURI : string  = this.global.mysite; 

  //public mysite : string  = LoginPage.();

  constructor(public global: GlobalProvider,
              public navCtrl  : NavController, 
              public navParams: NavParams,
              public http     : HttpClient,
              public storage  : Storage ) {

               this.category = "all";
  }
  

  ionViewWillEnter() : void {
    this.load(); 
    console.log('ionViewWillEnter DisplayPage');
  }

  load() : void
  {
     this.storage.get('user').then((user) => { 

     let    url : any = this.baseURI+'retrieve.php?id='+user;
            
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
   }); //close storage
  }

  viewEntry(param : any) : void
  {
     this.navCtrl.push('CrudPage', param);
  }
  addEntry() : void
  {
     this.navCtrl.push('CrudPage');
  }
  scanToPay() : void
  {
     this.navCtrl.push('ScanPage');
  }

}
