import { Component, ViewChild } from '@angular/core';
import { ApiProviderService } from '../Services/api-provider.service';
import { HttpParams } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
    selector: 'app-feeds',
    templateUrl: 'feeds.page.html',
    styleUrls: [ 'feeds.page.scss' ]
})
export class FeedsPage {
    @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
    statusList:any = [];    feedList:any = [];      page = '1';
    userData:any = {name: '', picture: {thumbnail: 'assets/preson.png'}};

    constructor(public apiServicesProvider: ApiProviderService) {
    }

    ngOnInit() {
        this.getUser();
        console.log(this.apiServicesProvider.getimages())
        this.getStories();
        this.getPosts('');
  }

    async getStories() {
        this.apiServicesProvider.apiData('1', '10').
        subscribe((data:any)=> 
          {     
          this.statusList = data.results;
          console.log(data)
            
          },
          (err) =>{
            console.log(err)
          });
    }

    async getUser() {
        this.apiServicesProvider.apiData('5', '1').
        subscribe((data:any)=> 
          {     
          this.userData = data.results[0];
          console.log(this.userData)
            
          },
          (err) =>{
            console.log(err)
          });
  }

    async getPosts(event) {
        this.apiServicesProvider.apiData(this.page, '2').
        subscribe((data:any)=> 
          {     
          this.infinite.complete();
          if (this.page == '1') { 
            //loader.dismiss(); 
            this.infinite.disabled = false;
          }
          this.page = (parseInt(this.page) + 1).toString();
          data.results.forEach((value, index) => {
              this.feedList.push(value);
          });


          // this.feedList = data.results;
          // console.log(this.apiServicesProvider.getimages())
            
          },
          (err) =>{
            console.log(err)
          });
    }

    slideOpts = {
        initialSlide: 0,
        speed: 400
    };

    

}
