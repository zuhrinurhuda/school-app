// require express
const express = require('express')
const router = express.Router()

// require express-session
const session = require('express-session')

// require model
const Model = require('../models')

// require helper for check authentication
const checkAuth = require('../helper/checkAuth')

router.get('/', checkAuth, function (req, res) {
  res.render('index', {title: 'Home Page', role: req.session.role})
})

router.get('/login', function (req, res) {
  res.render('login', {title: 'Login Page', role: req.session.role})
})

router.post('/login', function (req, res) {
  Model.User.findOne({where: req.body}).then((dataUser) => {
    if (dataUser) {
      req.session.auth = true
      req.session.username = dataUser.username
      req.session.role = dataUser.role
      console.log(req.session)
      res.render('index', {title: 'Home Page', role: req.session.role})
    } else {
      res.redirect('/login')
    }
  })
})

router.get('/logout', function (req, res) {
  req.session.destroy(function(err) {
    res.redirect('/login')
  })
})

module.exports = router