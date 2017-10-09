// require express
const express = require('express')
const router = express.Router()

// require express-session
const session = require('express-session')

// require model
const Model = require('../models')

// require helper for check authentication
const checkAuth = require('../helper/checkAuth')
router.use(checkAuth)

function otorisasi (req, res, next) {
  if (req.session.role === 'headmaster') {
    next()
  } else {
    res.redirect('/login')
  }
}

// router.use(function (req, res, next) {
//   if (req.session.role == 'headmaster') {
//     next()
//   } 
//   else {
//     res.send('error')
//   }
// })

let filter = {
  include: [{model: Model.Subject}]
}

router.get('/teacher', otorisasi, function (req, res) {
  
  Model.Teacher.findAll(filter).then((dataTeachers) => {
  res.render('teacher', {dataTeachers: dataTeachers, title: 'Teachers Page', role: req.session.role})
  })
})

router.get('/teacher/add', otorisasi, function (req, res) {
  res.render('teacher/add', {title: 'Add Teacher Page', role: req.session.role})
})

router.post('/teacher/add', function (req, res) {
  Model.Teacher.create(req.body).then(() => {
  res.redirect('/teacher')
  })
})

router.get('/teacher/edit/:id', otorisasi, function (req, res) {
  Model.Teacher.findById(req.params.id).then(dataTeacher => {
    Model.Subject.findAll().then(dataSubject => {
      res.render('teacher/edit', {dataTeachers: dataTeacher, dataSubjects: dataSubject, title: 'Edit Teacher Page', role: req.session.role})
    })
  })
})

router.post('/teacher/edit/:id', otorisasi, function (req, res) {
  Model.Teacher.update(req.body, {where: req.params}).then(() => {
  res.redirect('/teacher')
  })
})

router.get('/teacher/delete/:id', otorisasi, function (req, res) {
  Model.Teacher.destroy({where: req.params}).then(() => {
  res.redirect('/teacher')
  })
})

module.exports = router