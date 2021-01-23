import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private us:UserService, private router:Router) { }
   message:any;
   messagestatus:boolean = false
  ngOnInit(): void {
  }

  
  loginForm(ref:NgForm){
    let loginObject= ref.value;
    // console.log("loginObject...",loginObject);
    
 

  this.us.loginService(loginObject).subscribe(
    res=>{
      if (res['status'] == 200) {
        this.messagestatus = false
        // console.log("userarray>>>>>>>>>>",res['userarray']);
        if (res['userarray'][0].role == "admin") {
          this.router.navigate(["/admin/"+res['userarray'][0].name]) 
          // res.userarray[0].name
        } else {
          // or let name = userObjectInRegistration.name
        this.router.navigate(["/user/"+res['userarray'][0].name]) 
        }
      
       
      }
      else{
        this.messagestatus = true
        this.message = res["msg"]
      }

      
    },
    err=>{
      console.log("err in reg comp", err);
      alert ({message:"something went wrong"})
      
    }
  )
  }

}
