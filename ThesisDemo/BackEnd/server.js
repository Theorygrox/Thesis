const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');


require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,

})
const UserModel = mongoose.model('newUser', userSchema);

app.post('/register', function (req, res) {
  if(req.body.password !== req.body.cpassword){
    res.send('error1');
  }
  else{

    UserModel.findOne({'username':req.body.username},(err, data) => {
      if(err) console.log(err);
      if(data){
        res.send('error2');
      }else{
        let newUser = [{
          username:req.body.username,
          password:req.body.password
      }]
      UserModel.create(newUser, (err) => {
        if(err) return console.log(err)
      });

      res.send('success');
      }
    });
  }
})

app.post('/signin', function (req, res) {

    UserModel.findOne({'username':req.body.username,'password': req.body.password},(err, data) => {
      if(err) console.log(err);
      if(data){
        res.send('success');
      }else{
        res.send('error');
      }
    });
  
})
