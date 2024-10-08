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
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB
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
