import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductserviceService } from 'src/app/productservice.service';


@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {

  // profile pic
  file:File;
  incomingfile(event)
{
      this.file= event.target.files[0];
      }

      formData=new FormData();

  constructor(private productservice:ProductserviceService) { }

  ngOnInit(): void {
  }


 


  createproduct(ref:NgForm){  

    let regObject= ref.value ;


    //adding image and other data to FormData object
    
    this.formData.append('productimage',this.file,this.file.name);
 
    this.formData.append("regObject",JSON.stringify(regObject))
      // call createuser method of user service
        this.productservice.createproductservice(this.formData).subscribe(
          res=>{

            alert((res["msg"]));

            if (res['status'] == 200) {
              let name = res['data']
              window.location.reload();
              // or let name = userObjectInRegistration.name
              // this.router.navigate(["/user-dashboard/"+name]) 
            }
          },
          err=>{
            console.log("err in reg comp", err);
            alert ({message:"something went wrong"})
            
          })

  }
  
}
