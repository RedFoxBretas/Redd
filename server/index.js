const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

// Use a variável URI do seu arquivo .env
const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const databaseConnection = async () => {
  if (!global.mongoose) {
    mongoose.set('strictQuery', false);
    global.mongoose = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

module.exports = databaseConnection;

app.get('/', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({_id:id})
    .then(user => res.json(users))
    .catch(err => res.json(err));
});

app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name, 
        email: req.body.email, 
        age:req.body.age})
      .then(users => res.json(users))
      .catch(err => res.json(err));
  });

  app.delete('/deleteUser/:id', (req, res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err));
  })

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running");
});
