import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  schemeUrl = 'https://localhost:7191/api/InsuranceScheme';
  planUrl = 'https://localhost:7191/api/InsurancePlan';
  policyUrl = 'https://localhost:7191/api/PolicyAccount';
  schemeByPlanUrl = 'https://localhost:7191/Plan/'
  policyStatusUrl = 'https://localhost:7191/Status';
  installmentUrl = 'https://localhost:7191/api/Installment/bulk-add';
  getInstallmentByPolicyIdUrl = 'https://localhost:7191/api/Installment/PolicyAccount/';
  updateInstallmentUrl = 'https://localhost:7191/api/Installment';


  constructor(private http: HttpClient) { }
  
  addInstallmentScheduled(data:any){
    return this.http.post(this.installmentUrl, data);
  }
  updatePolicyAccount(data:any){
    return this.http.put(this.policyUrl, data);
  }

  updateInstallment(data :any){
    return this.http.put(this.updateInstallmentUrl, data);
  }

  getInsuranceSchemeById(schemeId:any){
      return this.http.get(`${this.schemeUrl}/${schemeId}`);
  }

  getInstallmentsByPolicyId(policyId : any){
    return this.http.get(this.getInstallmentByPolicyIdUrl+policyId);
  }
  getPolicyAccountsByCustomerId(customerId : any){
    return this.http.get(this.policyUrl+'/Customer/'+customerId);
  }
  // Get Policies 
  getPolicyAccounts(){
    return this.http.get(this.policyUrl);
  }

  changePolicyAccountStatus(statusData: any){
     return this.http.put(this.policyStatusUrl, statusData);
  }
  addScheme(schemeData: any){
    return this.http.post(this.schemeUrl, schemeData);
  }
  getSchemesByPlanId(planId:any){
    return this.http.get(`${this.schemeByPlanUrl}${planId}`);
  }
  createPolicyAccount(data:any){
    return this.http.post(this.policyUrl, data);
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
