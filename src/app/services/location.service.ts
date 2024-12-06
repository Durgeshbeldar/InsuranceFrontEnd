import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  stateUrl = 'https://localhost:7191/api/State';
  cityUrl = 'https://localhost:7191/api/City';
  constructor(private http: HttpClient) { }

  addState(state:any){
    return this.http.post(this.stateUrl, state);
  }
  getStates(){
    return this.http.get(this.stateUrl);
  }

  getCities(){
    return this.http.get(this.cityUrl);
  }
  addCity(city:any){
    return this.http.post(this.cityUrl, city);
  }

}
