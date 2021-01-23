// create express application
const exp = require("express")
// console.log(exp);
const app = exp();

// import mongoclient
const mongoclient = require("mongodb").MongoClient
// db url
// const dataBaseurl = "mongodb+srv://satya:satya@cluster0.7muvv.mongodb.net/Ecommercise?retryWrites=true&w=majority";
const dataBaseurl = "mongodb://satya:satya@cluster0-shard-00-00.7muvv.mongodb.net:27017,cluster0-shard-00-01.7muvv.mongodb.net:27017,cluster0-shard-00-02.7muvv.mongodb.net:27017/Ecommercise?ssl=true&replicaSet=atlas-qxwq6l-shard-0&authSource=admin&retryWrites=true&w=majority"





// to connect angular to express(dist)
const path = require("path");
app.use(exp.static(path.join(__dirname, './dist/Appone')));
console.log("path of server is ", __dirname);

// import apis objects
const userApiObject = require("./APIS/userapi");
const adminApiObject = require("./APIS/adminapi");

// re-direct to apis
app.use("/user", userApiObject)
app.use("/admin", adminApiObject)


// connect to database
mongoclient.connect(dataBaseurl,{userNewUrlParser:true,useUnifiedTopology:true} ,(err, client) => {
    if (err) {
        console.log("error in monodb connect 30th row", err);

    }
    else {
        // get db object(db method on client)
        const dataBaseObject = client.db("Ecommercise")

        // get collection object
        const ProductCollectionObject = dataBaseObject.collection("ProductCollection")
        const userCollectionObject = dataBaseObject.collection("usercollection")



        // make collection object available to apis
        app.set("ProductCollectionObject", ProductCollectionObject)
        app.set("userCollectionObject", userCollectionObject)
        console.log("Ecommercise Initiallized successfully");

    }


})





// error handlings by using middlewares
// for wrong path
app.use((req, res, next) => {
// console.log("req>>>>>>>",req);
    res.send({ message: "path does not exist" });

})

// for error
app.use((err, req, res, next) => {
    res.send({ message: "something went wrong" });
})



// asskign port
const port = 3000;
app.listen(port, (console.log(`server started at port number ${port}`)))

