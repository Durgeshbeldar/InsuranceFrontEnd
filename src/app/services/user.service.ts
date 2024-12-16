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
  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.customerUrl);
  }
  getAgentById(agentId: any) {
    return this.http.get(`${this.agentUrl}/${agentId}`);
  }
  updateAgent(agent: any) {
    return this.http.put(this.agentUrl, agent);
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
  addUser(userData: any) {
    return this.http.post(this.userUrl, userData);
  }
  hardDeleteUser(id: any) {
    return this.http.delete(`${this.userUrl}/User/${id}`);
  }

  addCustomer(customer: any) {
    return this.http.post(this.customerUrl, customer);
  }

  addEmployee(employee: any) {
    return this.http.post(this.employeeUrl, employee);
  }

  addAgent(agent: any) {
    return this.http.post(this.agentUrl, agent);
  }
}
