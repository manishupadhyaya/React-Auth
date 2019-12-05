const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const withAuth = require('./middleware');
const Todo = require('./models/Todo')
const app = express();

const secret = 'mysecretsshhh';

const mongo_uri = 'mongodb://manishupadhyaya:manish12345@ds159273.mlab.com:59273/pragmatic';
mongoose.connect(mongo_uri, {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client","build"))); /*React root*/


app.get('/api/home', (req, res) => {
  res.send('Welcome!');
});

app.get('/api/todos', withAuth, (req, res) => {
  let id = req.id;
  Todo.find({
    id
  }, (err, data) => {
    res.json(data);
  })
});

app.post('/api/todos', withAuth, (req, res) => {
  const data = req.body.data
  console.log(req.id);
  const id = req.id
  const todo = new Todo({
    data,
    id
  })
  todo.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  })
});

// app.get('/api/secret', withAuth, function(req, res) {

// });

app.post('/api/register', (req, res) => {
  const {
    email,
    password
  } = req.body;
  const user = new User({
    email,
    password
  });
  user.save(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post('/api/authenticate', (req, res) => {
  console.log("HELLO");
  const {
    email,
    password
  } = req.body;
  User.findOne({
    email
  }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          console.log(user);
          const id = user._id;
          const payload = {
            email: email,
            id: id
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          var obj = {
            token
          }
          res.status(200).json(obj);
        }
      });
    }
  });
});


app.post('/api/logout', withAuth, (req, res) => {

})

app.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"client","build","index.html"));
});

app.listen(process.env.PORT || 8080);