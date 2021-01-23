import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // profile pic
  file:File;
  incomingfile(event)
{
      this.file= event.target.files[0];
      }

      formData=new FormData();

  // inject user service

  constructor(private us:UserService , private router:Router) { }

  ngOnInit(): void {
  }



  // reference variable of type ngform(ref:NgForm) 
      userRegistrationForm(ref:NgForm){
      // value property of ref variable(ref.value)
      let userObject= ref.value ;
      console.log("userObjectInRegistration is>>>>>..",userObject);

      //adding image and other data to FormData object
   	 this.formData.append('photo',this.file,this.file.name);
 
   	 this.formData.append("userObject",JSON.stringify(userObject))






      // call createuser method of user service
        this.us.registrationService(this.formData).subscribe(
          res=>{
            alert(res["msg"]);
            if (res['status'] == 200) {
              let name = res['data']
              // or let name = userObjectInRegistration.name
              this.router.navigate(["/user/"+name]) 
            }
          },
          err=>{
            console.log("err in reg comp", err);
            alert ({message:"something went wrong"})
            
          })
    }

    


}

