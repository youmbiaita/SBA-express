const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 5050;

//static file
app.use(express.static("./views"));
//routes
const menus = require("./routes/menus");
const orders = require("./routes/orders");
const users = require("./routes/users");

//error
const error = require("./utilities/error.js");

//set view engine ejs
app.set("view engine", "ejs");

//parsing  middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.msg });
});


//middleware router
app.use("/api/menus", menus);
app.use("/api/orders", orders);
app.use("/api/users", users);


app.get("/", (req, res) => {
  res.render("index.ejs");
});

// app.post("/addMenu", (req, res) => {
//   const m = require("./data/menus");
//   res.render("index.ejs", {
//     id: m.length + 1,
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     image: req.body.image
//   });
// });

app.get("/users", (req, res) => {
  res.send("This is users page");
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};


app.listen(PORT, (req, res) => {
  console.log("Server is runing");
});