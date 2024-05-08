const express = require('express');
// import dotenv from 'dotenv';
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
const dotenv = require('dotenv');
const path = require('path');


const uri = 'mongodb+srv://pass:pass@blockchain.uwy3aou.mongodb.net/';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Signup sender

const itemSchemasignup = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: 'User',
    }
  },
  { versionKey: false } // Exclude the version key (__v)
);
const Item = mongoose.model('signup', itemSchemasignup);
app.post('/api/signup', (req, res) => {
  const newItem = new Item({ username: req.body.username, email: req.body.email, password: req.body.password, role: req.body.role });

  newItem
    .save()
    .then((result) => {
      console.log('Saved item in username,email,password:', result);
      res.sendStatus(200);
    })

});


// report a bug/
const itemSchemareportbug = new mongoose.Schema(
  {
    os: String,
    app: String,
    version: String,
    dis: String,
    user: String,
    timeed: String,
    label: String,
  },
  { versionKey: false } // Exclude the version key (__v)
);
const Itemreport = mongoose.model('bugreport', itemSchemareportbug);

app.post('/api/bugreport', (req, res) => {
  const newItemreport = new Itemreport({ os: req.body.os, app: req.body.app, version: req.body.version, dis: req.body.dis, user: req.body.user, timeed: req.body.timeed, label: req.body.label });

  newItemreport
    .save()
    .then((result) => {
      console.log('Saved item in username,email,password:', result);
      res.sendStatus(200);
    })

});
app.get('/api/bugreport', (req, res) => {
  Itemreport.find({})
    .then((items) => {
      res.status(200).json(items);
    })

});

// verify history sender/

const itemSchemaverify = new mongoose.Schema(
  {

    name: String,
    blocknumber: String,
    gasused: Number,
    cumulativeGasUsed: Number,
    effectivegasprice: Number,
    from: String,
    to: String,
    blockhash: String,
    transactionhash: String,
    timeed: String


  },
  { versionKey: false }
)
const itemverify = mongoose.model('verifyhist', itemSchemaverify);
app.post('/api/verifyhist', (req, res) => {
  console.log(req.body);
  const newItem = new itemverify({ name: req.body.name, blocknumber: req.body.blocknumber, gasused: req.body.gasused, cumulativeGasUsed: req.body.cumulativeGasUsed, effectivegasprice: req.body.effectivegasprice, from: req.body.from, to: req.body.to, blockhash: req.body.blockhash, transactionhash: req.body.transactionhash, timeed: req.body.timeed });
  newItem
    .save()
    .then((result) => {
      console.log('Saved item in blocknumber:', result);
      res.sendStatus(200);
    })

});

app.get('/api/verifyhist', (req, res) => {
  itemverify.find({})
    .then((items) => {
      res.status(200).json(items);
    })

});

// ......................................................................................


app.post('/api/updateLabel', async (req, res) => {
  console.log(req.body);
  try {
    // Iterate over the array of data
    for (const item of req.body.data) {

      // Check if the description exists in MongoDB
      const existingItem = await Itemreport.findOne({ dis: item.description });
      if (existingItem) {
        // Update the label status with the provided label value
        existingItem.label = item.labelValue;
        await existingItem.save();
      }
    }

    res.status(200).json({ message: 'Labels updated successfully.' });
  } catch (error) {
    console.error('Error updating labels:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { Email, Password } = req.body;
  console.log(Email, Password);
  try {
    const Items = await Item.findOne({ email: Email });
    console.log(Items);
    console.log((Items.password == Password))
    if (Items && Items.password == Password) {
      const tokenPayload = {
        email: Items.email,
        role: Items.role,
        username: Items.username
      }
      const Email = Items.email;
      const Role = Items.role;
      const Username = Items.username;
      const token = jwt.sign(tokenPayload, '1234567890', { expiresIn: 2 * 24 * 60 * 60 });
      console.log("shashi" + token);
      res.cookie("shashi", token, {
        withCredentials: true,
        httpOnly: false,
        expiresIn: 2 * 24 * 60 * 60,
      })
      res.status(200).json({ token, Email, Role });
    }
    else {
      res.status(401).json({ message: 'Authentication failed! Unauthorized access' });
    }
  }
  catch (error) {
    console.error('Error occurred during authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ......................................................................................
app.get('/api/signup', (req, res) => {
  Item.find({})
    .then((items) => {
      res.status(200).json(items);
    })
});

// ......................................................................................


// Middleware function to authenticate JWT token
const authenticateToken = (req, res, next) => {
  // Retrieve the token from the request headers or cookies
  const token = req.headers.authorization || req.cookies.shashi;
  console.log(token);
  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'No token found, authentication failed' });
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, '1234567890');

    // Attach the decoded token to the request object

    req.user = decodedToken;
    console.log(req.user);
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification error
    return res.status(401).json({ message: 'Invalid token, authentication failed' });
  }
};
app.get('/api/user', authenticateToken, (req, res) => {
  // Access the authenticated user's information from req.user
  // const { email, role } = req.user;
  const { email, username } = req.user;

  // Return the user information
  // res.json({ email, role });
  res.json({ email, username });
});
const port = 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});