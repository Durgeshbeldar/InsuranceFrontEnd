import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'https://localhost:7191/api/User';
  roleUrl = 'https://localhost:7191/api/Role';
  customerUrl = 'https://localhost:7191/api/Customer';
  constructor(private http: HttpClient) { }

  getRoles(){
    return this.http.get(this.roleUrl);
  }
  addUser(userData:any){
    return this.http.post(this.userUrl, userData);
  }
  hardDeleteUser(id:any){
    return this.http.delete(`${this.userUrl}/User/${id}`);
  }

  addCustomer(customer:any){
    return this.http.post(this.customerUrl, customer);
  }

}
