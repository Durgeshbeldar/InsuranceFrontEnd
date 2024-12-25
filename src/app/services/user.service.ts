import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'https://localhost:7191/api/User';
  roleUrl = 'https://localhost:7191/api/Role';
  customerUrl = 'https://localhost:7191/api/Customer';
  employeeUrl = 'https://localhost:7191/api/Employee';
  agentUrl = 'https://localhost:7191/api/Agent';
  queryUrl = 'https://localhost:7191/api/CustomerQuery';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.customerUrl);
  }
  getAgents(){
    return this.http.get(this.agentUrl);
  }
  getAgentById(agentId: any) {
    return this.http.get(`${this.agentUrl}/${agentId}`);
  }
  updateAgent(agent: any) {
    return this.http.put(this.agentUrl, agent);
  }
  updateUser(user: any){
    return this.http.put(this.userUrl, user);
  }
  getUserById(id:any){
    return this.http.get(`${this.userUrl}/${id}`);
  }
  changeKycStatus(kycData: any) {
    return this.http.put(this.customerUrl + '/Kyc', kycData);
  }
  getRoles() {
    return this.http.get(this.roleUrl);
  }
  getCustomerById(customerId : any){
    return this.http.get(`${this.customerUrl}/${customerId}`);
  }
  getEmployeeById(employeeId : any){
    return this.http.get(`${this.employeeUrl}/${employeeId}`);
  }
  addUser(userData: any) {
    return this.http.post(this.userUrl, userData);
  }
  hardDeleteUser(id: any) {
    return this.http.delete(`${this.userUrl}/User/${id}`);
  }
  
  getCustomersByAgentId(id: any){
    return this.http.get(`${this.customerUrl}/Agent/${id}`);
  }
  addCustomer(customer: any) {
    return this.http.post(this.customerUrl, customer);
  }

  addEmployee(employee: any) {
    return this.http.post(this.employeeUrl, employee);
  }
  getEmployees(){
    return this.http.get(this.employeeUrl);
  }

  addAgent(agent: any) {
    return this.http.post(this.agentUrl, agent);
  }

  raiseCustomerQuery(data:any){
    return this.http.post(this.queryUrl, data);
  }
  
  getCustomerQueries(){
    return this.http.get(this.queryUrl);
  }
  updateQueryResponse(data:any){
    return this.http.put(this.queryUrl,data);
  }

  getQueriesByCustomerId(customerId:any){
    return this.http.get(`${this.queryUrl}/Customer/${customerId}`);
  }

}
