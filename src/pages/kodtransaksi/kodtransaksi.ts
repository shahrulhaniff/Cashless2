import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";

@IonicPage()
@Component({
  selector: 'page-kodtransaksi',
  templateUrl: 'kodtransaksi.html',
})
export class KodtransaksiPage {

  //start hide
  public buttonClicked: boolean = false;
  public buttonClicked2: boolean = true;
  public onButtonClick() {
    this.buttonClicked = !this.buttonClicked;
    this.buttonClicked2 = !this.buttonClicked2;
      console.log("hide n show");
  }
  //done hide

  public items : Array<any> = [];
  private baseURI : string  = this.global.mysite;
  descending: boolean = false;
  order: number;

  constructor(public navCtrl  : NavController, 
              public global   : GlobalProvider,
              public navParams: NavParams,
              public http     : HttpClient,
              public storage  : Storage) {
  }

  ionViewWillEnter() {
    this.load_table(); 
  }

  
  load_table() : void
  {
     this.storage.get('user').then((user) => { 
     let    url : any = this.baseURI+'retrieve_kodtransaksi.php?id='+user;
            
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
  
  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

}
