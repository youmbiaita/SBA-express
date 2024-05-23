const express = require("express");
// const bodyParser = require("body=parser")
const app = express();
const PORT = 3000;

// We use the body-parser middleware FIRST so that
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body".
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))

app.get("/", (req,res) =>{
    res.send("other page")
});

app.get("/users",(req,res)=>{
    res.send("This is users page")
});

app.get("/posts",(req,res)=>{
    res.send("This is posts page")
});

app.get("/comments",(req,res)=>{
    res.send("This is comments page")
});


app.listen(PORT, (req, res) =>{
    console.log("Server is runing")
})