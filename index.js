const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require("cors");
const { ObjectID } = require("bson");

const port = process.env.PORT || 5000;

app.use(cors())
app.use(express())


const uri = "mongodb+srv://simmiFoundationAssignment:WgDn8nnMCCoUrruj@cluster0.mtnim2c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); 


async function run(){
    try{
         const doctorsCollection = client.db("simmiFoundationAssignment").collection("doctors");

         app.get("/doctors", async(req, res) =>{
            const query = {};
            const doctors = await doctorsCollection.find(query).toArray();
            res.send(doctors);
         })


         app.get("/doctors/:id", async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectID(id)};
            const doctorDetail = await doctorsCollection.findOne(query);
            res.send(doctorDetail);
         })

    } 
    finally{

    }
}

run().catch( error => console.error(error))

app.get("/", async(req, res) =>{
    res.send("Simmi Foundation Server Is Running")
});

app.listen(port, () =>{
    console.log(`The server is running on port ${port}`)
});