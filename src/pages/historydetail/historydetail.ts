import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";

@IonicPage()
@Component({
  selector: 'page-historydetail',
  templateUrl: 'historydetail.html',
})
export class HistorydetailPage {

  private baseURI: string = this.global.mysite;
  public items: Array<any> = [];
  private idtr: any;
  

  constructor(public global: GlobalProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public storage: Storage) {
  }

  /*ionViewDidLoad() {
    //this.load();
    console.log('ionViewDidLoad HistoryPage');
    console.log(this.idtr);
  } */

  ionViewWillEnter() {
    if (this.navParams.get("record")) {
      this.selectEntry(this.navParams.get("record"));
    }
    this.load();
  }


  selectEntry(item: any): void {
    this.idtr = item.id_transaksi;

  }


  load(): void {
    this.storage.get('user').then((user) => {
      //this.idtr = this.navParams.get("param");
      console.log("hahaha", this.idtr);
      console.log("hahaha" + this.idtr);
      let url: any = this.baseURI + 'r_dhistory.php?id=' + user +"&idtr=" + this.idtr;
      this.http.get(url).subscribe((data: any) => {
        //console.dir(data);
        this.items = data;
      },
        (error: any) => {
          console.dir(error);
        });
      //--------------------------------------------------
    }); //close storage
  }
}
