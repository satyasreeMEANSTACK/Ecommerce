
const exp = require("express");
const adminRouterObject = exp.Router();
// import jwtwebtoken
const jwtwebtoken = require("jsonwebtoken");
const bodyParser = require('body-parser');


adminRouterObject.use(exp.json())
adminRouterObject.use(bodyParser.urlencoded({ extended: true }));
let secratekey = '123#$%^#@$%^SDFGH@#$%^!@#$%^&)(*&^%$#)(*&^%$#@'

function verifytoken(req,res,next) {
    
    // console.log("request dataa>>>>>",req.headers.token);
    let isVerified = jwtwebtoken.verify(req.headers.token,secratekey)
// console.log("isVerified >>>",isVerified );

if (isVerified) {
    next(); 
} else {
    res.send("unauthorized user.....")      
}
}

//multi media files upload in coudinery 
var cloudinary = require("cloudinary").v2;
var {CloudinaryStorage} = require("multer-storage-cloudinary");
var multer = require("multer");
// // configure cloudinary
cloudinary.config({
    
    cloud_name:"do9rkiixv",	
    api_key:"536261516597445",
    api_secret:"xEm7YG8F4HnR_7cOOAdOdMXIamM"
})

 // configure storage setting

var clstorage = new CloudinaryStorage({
    cloudinary:cloudinary,
    // folder:"user profile pictures",
    // allowedFormats:["jpeg","jpg","png"],
    // filename:function(req,file,cb){
    //     cb(undefined,file.fieldname+"-"+Date.now());
    // }
    params: {
        folder: 'productpictures',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => 'file.fieldname'+'-'+Date.now(),
      },
})

adminRouterObject.use(exp.json())
// // configute multer
 var upload=multer({storage:clstorage});



//Request handler to insert user data
adminRouterObject.post("/createproduct",upload.single("photo"),(req,res)=>{
console.log(" iam inside function of creat product ....");
      // get cdn link from clodinary
      let productpic = req.file.path
// console.log("productpic>>>>>>>>>>>>",productpic);
console.log("req.body>>>>>>>>>>>>",req.body);

      let admin=JSON.parse(req.body.regObject)
   console.log("user in 65 row.....",admin);
   admin.productimage=productpic;
   admin.productID = Date.now(); 
     let adminobj= admin
    //  console.log("adminobj...........",adminobj);
    

    let adminDB = req.app.get("ProductCollectionObject")

    
     
      adminDB.insertOne(adminobj,(err,suc)=>{
        if(err){
            res.send({err})          
        }
        else{
           res.json({
            status:200,

               msg:"product inserted succesfully ...",
           })
        }
    })
});

// request handler for delect

adminRouterObject.delete("/removeproduct/:productname",(req,res)=>{

    let paramsid= req.params
    console.log("req.body.id >>>>>>>>...",req.params); 
    const adminDB = req.app.get("ProductCollectionObject")    
        adminDB.deleteOne({productname:paramsid.productname})
        .then(
        // adminDB.find().toArray()
    //     .then(
    //         array=>res.send({msg:"success",product:array})
    //     ) 
    //     .catch(err=>{
    //         res.send({mdg:"err"})
    //     })
    res.send({msg:"deleted succesfully"})
    )
    .catch(err=>{res.send({msg:"err"})})
});

// update product req handler
adminRouterObject.post("/updateproduct",(req,res)=>{
     let adminobj= req.body

    let adminDB = req.app.get("ProductCollectionObject")
    console.log("this is updated body>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",adminobj);   
   let updateditemdetrails= {
                                        $set:{
                                    productname:adminobj.productname,
                                    productprice:adminobj.productprice,
                                    productdiscount:adminobj.productdiscount
                                    }}

        adminDB.updateOne({ProductID:adminobj.ProductID},updateditemdetrails,(err,suc)=>{
        if(err){
            res.send({err})          
        }
        else{
           res.json({
               msg:"product updated succesfully ...",
           })
        }
    })
});




// update product image based on id 
adminRouterObject.post("/updateproductimage",upload.single("productimage"),(req,res)=>{
    // get cdn link from clodinary
    let productpic = req.file.path
    
  req.body.productimage=productpic;

   let adminDB = req.app.get("ProductCollectionObject")  
  let updateditemdetrails= {
       $set:{
           productimage:req.body.productimage,
   }}
       adminDB.updateOne({id:req.body.id},updateditemdetrails,(err,suc)=>{
       if(err){
           res.send({err})          
       }
       else{
          res.json({
              msg:"productImage updated succesfully ...",
          })
       }
   })
});

// list of all products

adminRouterObject.get("/Allproduct",(req,res)=>{

    let adminDB = req.app.get("ProductCollectionObject")
    // getDB().collection("login").insertOne(req.body,(err,suc)=>{
        adminDB.find().toArray((err,suc)=>{
        if(err){
            res.send({err})          
        }
        else{
           res.json({
               msg:"All product  ...",
               data:suc
           })
        }
    })
});

// all users

adminRouterObject.get("/Allusers",(req,res)=>{
// console.log(" ia m inside all users>>>>>>>>>>>>>>>>>>>>>>>>");
    let adminDB = req.app.get("userCollectionObject")
    // getDB().collection("login").insertOne(req.body,(err,suc)=>{
        adminDB.find().toArray((err,suc)=>{
            // console.log("succc in alluser>>>>>>>>",suc);

        if(err){
            res.send({err})          
        }
        else{
           res.json({
               msg:"All product  ...",
               data:suc
           })
        }
    })
});








// export
module.exports= adminRouterObject;