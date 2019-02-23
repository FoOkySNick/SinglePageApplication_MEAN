const { DataBase } = require('./scripts/dataBase');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require("crypto");
const fs = require('fs');

const app = express();

app.use(express.static('dist/' + fs.readdirSync('dist')[0].toString()));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

function generateToken() {
  return crypto.createHash('sha256').update(crypto.randomBytes(256).toString('hex')).digest('hex');
}

function checkRequestForgery(req, res) {
  if (req.cookies.csrf === req.body.csrf) {
    delete req.body.csrf;
    return true;
  } else {
    console.log('REQUEST FORGERY!');
    res.json({code: 700, status: 'REQUEST FORGERY'});
    return false;
  }
}

app.post('/login', function(req, res) {
  console.info('post \'login\'');

  const login = req.body.login;
  const password = req.body.password;

  DataBase.selectFiltered({login: login, password: password}, 'admins', (obj) => {
    const token = generateToken();
    if (obj.code === 200 && obj.status === 'OK') {
      obj.role = 'admin';
      const id = obj.results[0]['_id'];
      delete obj.results;
      obj.csrf = token;
      res.cookie('csrf', token, {httpOnly: true});
      res.cookie('SESSIONID', id, {httpOnly: true});
      res.json(obj);
    } else {
      DataBase.selectFiltered({login: login, password: password}, 'personal-info', (obj) => {
        if (obj.code === 200 && obj.status === 'OK') {
          obj.role = '';
          const id = obj.results[0]['_id'];
          delete obj.results;
          obj.csrf = token;
          res.cookie('csrf', token, {httpOnly: true});
          res.cookie('SESSIONID', id, {httpOnly: true});
          res.json(obj);
        } else {
          res.json({code: 401, status: 'NOT AUTHORISED'});
        }
      });
    }
  });
});

app.get('/', function(req, res) {
	console.log('get \'root\'');
	res.send('Welcome home!');
});

app.post('/admin', function(req, res) {
  console.log('post \'admin\'');
  DataBase.selectAll(req.body, '', res);
});

app.post('/registration', function(req, res) {
  console.log('post \'registration\'');
  DataBase.selectFiltered(req.body, 'personal-info', (obj) => {
    if (obj.code === 200 && obj.status === 'OK' ) {
      console.log('User exists');
      res.json({code: 300, status: 'exist'})
    } else {
      console.log('new User');
      DataBase.insertOne(req.body, 'personal-info', (obj) => res.json(obj))
    }
  });
});

app.post('/request-payment', function(req, res) {
  console.log('post \'request-payment\'');
  if (checkRequestForgery(req, res)) {
    req.body.client = req.cookies.SESSIONID;
    DataBase.insertOne(req.body, 'request-payment-info', (obj) => res.json(obj));
  }
});

app.post('/admin-sorter', function (req, res) {
  console.log('post \'admin-sorter\'');
  if (checkRequestForgery(req, res)) {
    DataBase.sortSomeFromDB(req.body.db, req.body.skip, req.body.delta, req.body.sorter, (obj) => res.json(obj));
  }
});

app.post('/pay-by-card', function(req, res) {
	console.log('post \'pay-by-card\'');
  if (checkRequestForgery(req, res)) {
    req.body.client = req.cookies.SESSIONID;
    DataBase.insertOne(req.body, 'payment-info', (obj) => res.json(obj));
  }
});

app.post('/pay-from-online-bank', function(req, res) {
  console.log('post \'pay-from-online-bank\'');
  if (checkRequestForgery(req, res)) {
    req.body.client = req.cookies.SESSIONID;
    DataBase.insertOne(req.body, 'payment-info', (obj) => res.json(obj));
  }
});

app.post('/admin-request-payment-info', function (req, res) {
  console.log('post \'admin-request-payment-info\'');
  if (checkRequestForgery(req, res)) {
    DataBase.selectSome('request-payment-info', req.body.skip, req.body.delta, (obj) => {res.json(obj)})
  }
});

app.post('/admin-filter', function (req, res) {
  console.log('post \'admin-filter\'');
  if (checkRequestForgery(req, res)) {
    DataBase.selectSomeFiltered(req.body.filter, req.body.db, req.body.skip, req.body.delta,
      (obj) => {res.json(obj)})
  }
});

app.post('/admin-get-user', function (req, res) {
  console.log('post \'admin-get-user\'');
  if (checkRequestForgery(req, res)) {
    DataBase.selectSomeFiltered(DataBase.getId(req.body.filter._id),
      req.body.db, req.body.skip, req.body.delta, (obj) => {res.json(obj)})
  }
});


app.post('/admin-unsafe-update', function (req, res) {
  console.log('post \'admin-unsafe-update\'');
  if (checkRequestForgery(req, res)) {
    delete req.body.modify._id;
    DataBase.updateDB(req.body.modify, req.body.safe, 'payment-info', (obj) => {res.json(obj)})
  }
});

app.post('/admin-payment-info', function (req, res) {
  console.log('post \'admin-payment-info\'');
  if (checkRequestForgery(req, res)) {
    DataBase.selectSome('payment-info', req.body.skip, req.body.delta, (obj) => {res.json(obj)})
  }
});

app.listen(4200, function(err){
  if (err) {
    console.error(err);
  }
});
