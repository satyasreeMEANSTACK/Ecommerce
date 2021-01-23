import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-viewallusers',
  templateUrl: './viewallusers.component.html',
  styleUrls: ['./viewallusers.component.css']
})
export class ViewallusersComponent implements OnInit {
  allusersdetail:any =[]
  constructor(private userservice:UserService) { }

  ngOnInit(): void {
    this.allusers();
  }
  allusers(){
    this.userservice.allusersservice().subscribe(
      res=>{
      //  console.log("response of all users>>>>>>>>>>>>>>>>>>>>>>>>.",res['data']);
       
  this.allusersdetail = res['data']
        
      },
      err=>{
        console.log("err in reg comp", err);
        alert ({message:"something went wrong"})
        
      }
    )
    
  }

  // deleteuser()--for delete user 
  deleteuser(email){
    console.log("id in viewuser>>>>>>>>>>>>",email);
     
    this.userservice.deleteuserservice({email:email}).subscribe(

      (res)=>{
        console.log("res in view user>>>>>>>>>>",res);
        alert(res['msg'])
        window.location.reload();
        
      },
      (err)=>{
        if(err){
          console.log(err);
          
        }
      }

    )

  }

}
