import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor(private hc:HttpClient) { }

   


  getAllProductService():Observable<any>{
    return this.hc.get("/admin/Allproduct");
 }

 loginService(data):Observable<any>{
  return this.hc.post("/user/login",data);
}
createproductservice(formDataObj):Observable<any>{
  return this.hc.post("/admin/createproduct",formDataObj);

}
deleteproductservice(productname):Observable<any>{
  return this.hc.delete(`/admin/removeproduct/${productname}`);

}
editproductservice(data):Observable<any>{
  console.log("in servide updated data>>",data);
  
  return this.hc.post("/admin/updateproduct",data);
}

editproductimageservice(data):Observable<any>{
  console.log("in servide updated data>>",data);
  
  return this.hc.post("/admin/updateproductimage",data);
}



}
