import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  schemeUrl = 'https://localhost:7191/api/InsuranceScheme';
  planUrl = 'https://localhost:7191/api/InsurancePlan';
  constructor(private http: HttpClient) { }
  
  addScheme(schemeData: any){
    return this.http.post(this.schemeUrl, schemeData);
  }
  addPlan(planData:any){
    return this.http.post(this.planUrl, planData);
  }
  getPlans(){
    return this.http.get(this.planUrl);
  }
  getPlanById(id:any){
    return this.http.get(`${this.planUrl}/${id}`);
  }
  updatePlan(planData:any){
    return this.http.put(this.planUrl ,planData);
  }
  deletePlan(planId:any){
    return this.http.delete(`${this.planUrl}/${planId}`);
  }


  // Schemes is here

  updateScheme(scheme: any){
    return this.http.put(this.schemeUrl, scheme);
  }

  getSchemes(){
    return this.http.get(this.schemeUrl);
  }
  getSchemeById(id: any){
    return this.http.get(`${this.schemeUrl}/${id}`);
  }
}
