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
  private jmlh : any; 
  private trkh : any;
  private idjnstrnsks : any;
  private sttstrs : any;
  private sttsdoc : any;
  private docaccept : any;
  private docgive : any;
  

  constructor(public global: GlobalProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public storage: Storage) {
  }

  ionRefresh(event) {
    console.log('Pull Event Triggered!');
    setTimeout(() => {
       console.log('Async operation has ended');
       this.ionViewWillEnter();
       //complete()  signify that the refreshing has completed and to close the refresher
       event.complete();
    }, 2000);
 }
 ionPull(event) {
    //Emitted while the user is pulling down the content and exposing the refresher.
    console.log('ionPull Event Triggered!');
 }
 ionStart(event) {
    //Emitted when the user begins to start pulling down.
    console.log('ionStart Event Triggered!');
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
    this.jmlh = item.jumlah;
    this.trkh = item.tarikh;
    this.idjnstrnsks = item.id_jenistransaksi;
    this.sttstrs = item.statustransaction;
    this.sttsdoc = item.status_dokumen;
    this.docaccept = item.doc_acceptby;
    this.docgive = item.doc_giveby;

    console.log("huhuhu", this.sttstrs);





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
