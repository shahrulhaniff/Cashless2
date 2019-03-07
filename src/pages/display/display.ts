import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-display',
  templateUrl: 'display.html',
})
export class DisplayPage {

  //Used to store returned PHP data
  public items : Array<any> = [];

  constructor(public navCtrl  : NavController, 
              public navParams: NavParams,
              public http     : HttpClient,
              public storage  : Storage ) {
  }
  

  ionViewWillEnter() : void {
    this.load(); 
    console.log('ionViewWillEnter DisplayPage');
  }

  load() : void
  {
     this.storage.get('user').then((user) => { 
     //-------------------------------------------------- 
     //let    url : any = 'https://myraxsoft.com/alist/retrieve.php?id='+user;
     let    url : any = 'https://fifwayintern.000webhostapp.com/alist/retrieve.php?id='+user;
     //let    url : any = 'http://192.168.0.112/alist/retrieve.php?id='+user;
     //, json 	: any		= { "usr" : user};
            
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

}
