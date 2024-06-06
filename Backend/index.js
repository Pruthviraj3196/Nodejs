const express = require("express");
const messageroutes = require("./routes/messageRoutes");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const{ errorMiddleware} = require("./middlewares/error");
const userrouter = require("./routes/userRouter");
const appointmentRouter = require("./routes/appointmentRouter");



const app = express();


// cors are used to connect backend to front end servers..(it is an middleware)

app.use(
    cors({
      origin: [process.env.FRONTEND_URI, process.env.DASHBOARD_URI],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/temp/",
    })
  ); 

  cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRETE,
  });

// Lets Connect to DataBase Hahahahaha

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "MERN_STACK_PROJECT_HOSPITAL_MANAGEMENT",
  })
  .then(() =>
    console.log("Connection with Data Base is Established Sucessfully")
  )
  .catch((err) => console.log("Error with Connection with DataBAse", err));

// Api All Routes are here ...
app.use("/api/v1/message", messageroutes);
app.use("/api/v1/user", userrouter);
app.use("/api/v1/appointment", appointmentRouter);

// error middleware 
app.use(errorMiddleware); 
  

app.listen(process.env.PORT, () => {
  console.log(`sever is running on port:${process.env.PORT}`);
});
   
