import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // inject httpclient object

  constructor(private hc:HttpClient) { }

  // createUser(userObjectFromRegistration):Observable<any>{

  //    return this.hc.post("user/createuser",userObjectFromRegistration);

  // }

  registrationService(userObject:any):Observable<any>{
    return this.hc.post("/user/register",userObject);
 }

 loginService(data):Observable<any>{
  return this.hc.post("/user/login",data);
}

allusersservice():Observable<any>{
  return this.hc.get("/admin/Allusers");
}
deleteuserservice(data):Observable<any>{
  console.log("in servide deleted use email",data);
  
  return this.hc.post("/user/deleteuser",data);
}
}
