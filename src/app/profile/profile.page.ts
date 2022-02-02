import { Component } from '@angular/core';
import { ApiProviderService } from '../Services/api-provider.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  slideOpts = {};
  stories: any = [];
  buttonValue = 'grid';
  buttonItems: any[] = [];
  posts: any[] = [];  userData:any = {name: '', picture: {thumbnail: 'assets/preson.png'}};

  constructor(public apiServicesProvider: ApiProviderService) {}

  ngOnInit() {
    this.getUser();
    this.getStories();
    
    this.buttonItems = [
      {value: 'grid', icon: 'grid'},
      {value: 'reels', icon: 'film'},
      {value: 'photos', icon: 'images'},
    ];
    this.posts = [
      { id: 1, url: 'https://picsum.photos/id/0/5616/3744'},
      { id: 2, url: 'https://picsum.photos/id/1/5616/3744'},
      { id: 3, url: 'https://picsum.photos/id/10/2500/1667'},
      { id: 4, url: 'https://picsum.photos/id/100/2500/1656'},
      { id: 9, url: 'https://picsum.photos/id/1000/5626/3635'},
      { id: 6, url: 'https://picsum.photos/id/1001/5616/3744'},
      { id: 5, url: 'https://picsum.photos/id/1002/4312/2868'},
      { id: 8, url: 'https://picsum.photos/id/1003/1181/1772'},
      { id: 7, url: 'https://picsum.photos/id/1004/5616/3744'},
      { id: 10, url: 'https://picsum.photos/id/1005/5760/3840'},
      { id: 11, url: 'https://picsum.photos/id/1006/3000/2000'},
      { id: 12, url: 'https://picsum.photos/id/1008/5616/3744'},
    ];
  }

  async getStories() {
        this.apiServicesProvider.apiData('1', '10').
        subscribe((data:any)=> 
          {     
          this.stories = data.results;
          console.log(this.stories)
           this.slideOpts = {    
              slidesPerView: this.checkScreen(),
              slideShadows: true
            };
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

  checkScreen() {
    let innerWidth = window.innerWidth;
    console.log(innerWidth);
    switch (true) {
      case 340 > innerWidth:
        return this.checkLength(5.5);
      case 340 <= innerWidth && innerWidth <= 400:
        return this.checkLength(5.5);
      case 401 <= innerWidth && innerWidth <= 700:
        return this.checkLength(6.5);
      case 701 <= innerWidth && innerWidth <= 900:
        return this.checkLength(7.5);
      case 901 <= innerWidth:
        return this.checkLength(9.5);
    }
  }

  checkLength(val) {
    let length = this.stories.length;
    return val < length ? val : length;
  }

  buttonsChanged(event) {
    console.log(event.detail.value);
    this.buttonValue = event.detail.value;
  }

}
