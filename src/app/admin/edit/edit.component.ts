import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from 'src/app/productservice.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  details: any

  // profile pic
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
    this.formData.append('productimage', this.file, this.file.name);
    let regObject = this.details.productID;
    this.formData.append("regObject", JSON.stringify(regObject))
    // call createuser method of user service
    this.productservice.editproductimageservice(this.formData).subscribe(
      res => {
        this.ngOnInit();
        alert((res["msg"]));

        if (res['status'] == 200) {
          console.log("response>>>>", res.data);

          let name = res['data']
          // or let name = userObjectInRegistration.name
          // this.router.navigate(["/user-dashboard/"+name]) 
        }
      },
      err => {
        console.log("err in reg comp", err);
        alert({ message: "something went wrong" })

      })
  }

  formData = new FormData();
  constructor(private productservice: ProductserviceService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(
      (passedid) => {
        console.log("data in edit>>>>>>>>", passedid);


        this.productservice.getAllProductService().subscribe(
          (alldata) => {
            let one
            let array = alldata["data"]
            // console.log("array in edit>>>",array);
            array.filter(function (x: any) {
              if (passedid.productID == x.productID) {
                one = x

              }
            })

            if (one) {
              this.details = one
              // console.log(this.details);
            }
          }
        )
      }
    )
  }

  UpdatedProduct(ref: NgForm) {
    console.log("ref>>>>>>>>>>>>>>", ref.value);
    let regObject = ref.value;
    // if (this.details.productimage != regObject.productimage) {
    //   this.formData.append('productimage', this.file, this.file.name);
    // }

    // //adding image and other data to FormData object


    // console.log("  this.formData>>>", this.formData);

    // this.formData.append("regObject", JSON.stringify(regObject))
    // call createuser method of user service
    this.productservice.editproductservice(ref.value).subscribe(
      res => {
        this.ngOnInit();
        alert((res["msg"]));

        if (res['status'] == 200) {
          console.log("response>>>>", res.data);

          let name = res['data']
          // or let name = userObjectInRegistration.name
          // this.router.navigate(["/user-dashboard/"+name]) 
        }
      },
      err => {
        console.log("err in reg comp", err);
        alert({ message: "something went wrong" })

      })

  }







  
}
