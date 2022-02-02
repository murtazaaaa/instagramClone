import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

let apiUrl="https://randomuser.me/api/";

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  constructor(public http: HttpClient) { 

  }

  apiData(pages, results){
    let url = `https://randomuser.me/api/?page=${pages}&results=${results}&seed=feed`
    let headers = new HttpHeaders();

    return this.http.get<any[]>(url)
    
  }

  getimages(){
    let url2 = 'https://picsum.photos/v2/list';

    return this.http.get<any[]>(url2)
    
  }
}
