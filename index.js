// Node-express
const express=require('express');
const App=express();
App.use(express.static('public'));
// 將post request放入body
App.use(parser.urlencoded({extended:true}))


// 載入MONGODB Module
const { MongoClient, ServerApiVersion } = require('mongodb');
//連線網址
const uri = "mongodb+srv://root:root123@cluster0.173xug4.mongodb.net/?retryWrites=true&w=majority";
//建立資料庫的客戶端物件
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// ejs
App.set("view engine","ejs");


// mongodb啟動
async function run() {
    // try {
    //   // Connect the client to the server (optional starting in v4.7)
    //   await client.connect();
    //   // Send a ping to confirm a successful connection
    //   await client.db("admin").command({ ping: 1 });
    //   console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // } finally {
    //   // Ensures that the client will close when you finish/error
    //   await client.close();
    // }
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db=client.db('website');
        const collection=db.collection('user');

      } catch(e){
        console.log('連線失敗',e)
      }finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
  }
  run().catch(console.dir);












App.listen(2000,function(){
    console.log('server start');
});