const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3002;
const mongoURL = process.env.MONGODB_URL;
const bcrypt = require('bcrypt');
const User = require('./models/users'); // Correct path to User model

// Database connection
const DB = require('./DB');
DB.connect(mongoURL);

// Middleware
app.use(express.json());
app.use("/static", express.static('./static/'));


app.get('/', (req, res) => {
  res.redirect('/static/index.html');
});

// Register endpoint
app.post('/register', async (req, res) => {
  console.log('Register endpoint hit');
  const { user, pass } = req.body;

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    // Create a new user with the hashed password
    const newUser = new User({ username: user, password: hashedPassword });
    await newUser.save();

    console.log(newUser)

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(400).send('Error registering user');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  console.log('Login endpoint hit');
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    console.log(existingUser)
    if (!existingUser) {
      return res.status(401).send('Invalid username or password');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (validPassword) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
