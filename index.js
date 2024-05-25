const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const PORT = 3000;

//routes
const menuRouter = require("./routes/menus");
const orderRouter = require("./routes/orders");
const userRouter = require("./routes/users");

//data
const orders = require("./data/orders");
const menus = require("./data/menus")
const users = require("./data/users")




//set view engine ejs
app.set("view engine", "ejs")

//middleware router
app.use("/api/menus", menuRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);

//Logging middleware
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))

app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

app.get("/", (req,res) =>{
    res.render("index.ejs")
});

app.get("/form", (req, res) => {
    res.render("form");
  });

app.get("/users",(req,res)=>{
    res.send("This is users page")
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  };


app.listen(PORT, (req, res) =>{
    console.log("Server is runing")
})