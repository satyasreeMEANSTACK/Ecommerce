import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from 'src/app/productservice.service';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private productservice:ProductserviceService) { }

  allProducts:any = []

  ngOnInit(): void {

  this.showProducts()

  }
  showProducts(){
    this.productservice.getAllProductService().subscribe(
      (res)=>{
      
        
       this.allProducts = res['data']
       console.log(" all products>>>>",this.allProducts);
      },
      (err)=>{
        if(err){
          console.log(err);
          

        }

      }
    )
  }


  viewproduct(id){
console.log("view product id >>>>", );


  }

}
