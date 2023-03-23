// Node-express
const express=require('express');
const App=express();
App.use(express.static('public'));
// 將post request放入body
const parser=require('body-parser')
App.use(parser.urlencoded({extended:true}))


// 載入MONGODB Module
const { MongoClient, ServerApiVersion } = require('mongodb');
//連線網址
const uri = "mongodb+srv://root:root123@myserver.dsx0a6c.mongodb.net/?retryWrites=true&w=majority";
//建立資料庫的客戶端物件
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// ejs
App.set("view engine","ejs");


// template_route

App.get('/',function(req,res){
    res.sendFile("./index.html");
});

App.get('/login',function(req,res){
    res.render("login.ejs");
});
App.get('/registration',function(req,res){
    res.render("registration.ejs",{ state:null });
});






App.post('/signup',async function(req,res){
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    await client.connect();
    const db = client.db('website');
    let collection=db.collection("user");
    let result=await collection.findOne({
        email:email
    });
    if (name && email && password) {
        // 如果name、email和password都存在，則執行以下代碼
        if (result == null) {
          await collection.insertOne({
            name: name,
            email: email,
            password: password,
            level: 0
          });
          res.render('registration', { state: true });
        } else {
          res.render('registration', { state: false });
        }
      } else {
        res.render('registration', { state: 2 });
    }
      
  
});



App.get('/error',function(req,res){
    res.render("error.ejs");
});
const session = require('express-session');
App.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// signin
App.post('/signin',async function(req,res){
    let email=req.body.email;
    let password=req.body.password;
    await client.connect();
    const db = client.db('website');
    let collection=db.collection("user");

    let result=await collection.findOne({
        $and:[
        {email:email},
        {password:password},
        ]
    });
    if (result==null){
        req.session.user=null;
        res.redirect("/error")
    }else{
        req.session.user={
            email:result.email,name:result.name
        };
        res.redirect("/member");
    }
});
App.get("/member",function(req,res){

    if(req.session.user==null){
        res.redirect("/");
    }else{
        res.render("member.ejs",{name:req.session.user.name});
    };

});


let db=null;
// mongodb啟動
async function run() {
    try {
        await client.connect();
        console.log("資料庫連線成功");
        const db = client.db('website');
        const collection = db.collection('user');
        // await collection.deleteMany({ level: 0 });
    } catch (e) {
        console.log('連線失敗', e)
    } 
    // finally {
    //     await client.close();
    // }
  }
  run().catch(console.dir);












App.listen(2000,function(){
    console.log('server start');
});
