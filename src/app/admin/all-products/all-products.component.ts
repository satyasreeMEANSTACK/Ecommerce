import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductserviceService } from 'src/app/productservice.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  constructor(private product:ProductserviceService, private router:Router) { }
  allProducts:any;
    ngOnInit(): void {
     this.productMethod()
    }
  
    productMethod(){
      this.product.getAllProductService().subscribe(
        res=>{
        //  console.log("response of all products",res);
         
    this.allProducts =res['data']
          
        },
        err=>{
          console.log("err in reg comp", err);
          alert ({message:"something went wrong"})
          
        }
      )
      
    }



    delectproduct(productname:any){
      console.log("productname>>>>>>>",productname);
      // let value={_id:productID}




      
      this.product.deleteproductservice(productname).subscribe(
        res=>{
          // this.productMethod();
          alert(res['msg'])
          window.location.reload();
          // this.product=res["products"] 
        },
        err=>{
          if(err){
            console.log(err);
            alert({msg:"something went wrong in delete"})
            
          }
        }
      )
      
    }

    editproduct(productID){
      // console.log("productid>>>>>>>>>>>>",productID);
      // this.router.navigate(["amin/edit"]) 

      // console.log(this.router.navigateByUrl(`/edit/${_id}`) );
      
      this.router.navigateByUrl(`/edit/${productID}`) 
  
      
    }

}
