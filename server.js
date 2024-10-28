const express=require("express")
const mongoose = require('mongoose');
const movieRouter=require('./routes/movies')
const categoryRouter=require('./routes/categories')
const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/movies')
const connect=mongoose.connection;
connect.once('open',()=>console.log('Connect'))
connect.on('error',(error)=>{console.log(error)})
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
      return res.status(200).json({});
    }
    next();
  });
app.use('/movies',movieRouter.router)
app.use('/categories',categoryRouter.router)

app.listen(3000,()=>{
    console.log("listening on port 3000");
})