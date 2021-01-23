const exp = require("express");
const userRouterObject = exp.Router();

// import bcrypt(npm i bcrypt)
const bcrypt = require("bcryptjs")
// import jwtwebtoken
const jwtwebtoken = require("jsonwebtoken");

let secratekey = '123#$%^#@$%^SDFGH@#$%^!@#$%^&)(*&^%$#)(*&^%$#@'


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

var clstorage =new CloudinaryStorage({
    cloudinary:cloudinary,
    // folder:"user profile pictures",
    // allowedFormats:["jpeg","jpg","png"],
    // filename:function(req,file,cb){
    //     cb(undefined,file.fieldname+"-"+Date.now());
    // }
    params: {
        folder: 'profilepictures',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => 'file.fieldname'+'-'+Date.now(),
      },
})
// // configute multer
 var upload=multer({storage:clstorage});

// registration req handlers 
userRouterObject.use(exp.json())
   
userRouterObject.post("/register",upload.single("photo"), (req, res) => {
  
    
    // get cdn link from clodinary
    let profilepic = req.file.path
   
    // req.body.imageUrl=req.file.url; 
    // console.log("reqqqqqqqqqqqqqqqqqqqqq",req.body)
    // console.log("reqq.userinreg",req.body.userObjectInRegistration)
   let user=JSON.parse(req.body.userObject)
   console.log("user in 55 row.....",user);
  
    user.image=profilepic;
     let userobj= user
     console.log("userobj...........",userobj);
    let userDB = req.app.get("userCollectionObject")
    // role based authentication login
        userobj.role = "user"

        
    // console.log(req.body);
    // cloudinary.v2.uploader.upload(data.image);
    userDB.find({ email: userobj.email }).toArray((err, userarray) => {
        // console.log("registration userarray>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", userarray);
        if (err) {
            console.log(err);

        }
        else {
            // [] userarray lenth =0
            if (userarray.length == 0) {
                bcrypt.hash(userobj.password, 10, (err, hashedpassword) => {
                    if (err) {
                        console.log(" err in reg  ", err);
                    }
                    else {
                        userobj.password = hashedpassword
                        // console.log(hashedpassword);
                        userDB.insertOne(userobj, (err, suc) => {
                            if (err) {
                                res.send({ err })
                            }
                            else {
                                res.json({
                                    status:200,
                                    msg: `${userobj.name} have registered succesfully ...`,
                                    data: userobj.name
                                })
                            }
                        })
                    }

                })


            }
            else {
                res.json({
                    status:401,
                    msg: "user alredy exist "
                })
            }
        }
    })
})

// user login 
userRouterObject.post("/login", (req, res) => {
    let userDB = req.app.get("userCollectionObject")
    // console.log(req.body);
    userDB.find({ email: req.body.email }).toArray((err, userarray) => {
        console.log("login userarray >>>>>>>>>>>>>>>>>>>", userarray);
        if (err) {console.log(err)}
        else {
            // toArray contianes array of values ---if array length is greater then 0 means . it conatine user details i.e not empty array
            if (userarray.length > 0) {
                bcrypt.compare(req.body.password, userarray[0].password, (err, succ) => {
                    if (err) {
                        res.json({ err })
                    } else if (succ) {
                        let payload = {email: req.body.email} ;
                        let token = jwtwebtoken.sign(payload,secratekey, { expiresIn: 30 * 30})
                        res.json({
                            status:200,
                            msg: `welcome ${userarray[0].name}`,
                            token,
                            userarray
                        })
                    } else {
                        // res.status(400).json({msg: "password wrong..."})
                        res.json({msg: "password wrong..."})
                       
                    }
                })




            }
            else {
                // []if empty array i.e no user exists with that email 
                res.json({
                    msg: "please provide correct email"
                })
            }
        }
    })
})


// req handler for delect user
userRouterObject.post("/deleteuser",(req, res) => {
   console.log("req.body in deleteuser>>>>>>>",req.body);

    let userDB = req.app.get("userCollectionObject")

    // console.log(req.body);
    userDB.deleteOne({ email: req.body.email })
    .then(
    res.send({msg:"deleted user succesfully.................."})
    )
    .catch(err=>{res.send({msg:"err"})})
})











// export
module.exports = userRouterObject;