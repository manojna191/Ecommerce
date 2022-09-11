const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose')
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/.env` });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("db connection successful");
  })
  .catch((err) => console.log("ERROR", err.message));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
//parses the application/json
app.use(bodyParser.json());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

const authRoutes = require('./routes/auth')
const sellerRoutes = require("./routes/seller")
const buyerRoutes = require('./routes/buyer')

app.use("/api/auth", authRoutes)
app.use("/api/seller", sellerRoutes)
app.use('/api/buyer', buyerRoutes)

app.listen(process.env.PORT, ()=>{
    console.log("Server is running at port 3000");
})