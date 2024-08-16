const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'zawadi2005',
    database: 'smartbrain',
  },
});

const app = express();

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {res.send('success')})

app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, ()=>{
  console.log('app is running on port 3000');
});
