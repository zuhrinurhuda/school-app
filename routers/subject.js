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
  if (req.session.role == 'academic' || req.session.role == 'headmaster') {
    next()
  } else {
    res.redirect('/login')
  }
}

let filter = {
  include: [{model: Model.Teacher}]
}

router.get('/subject', otorisasi, function (req, res) {
  Model.Subject.findAll(filter).then(dataSubjects => {
  res.render('subject', {dataSubjects: dataSubjects, title: 'Subjects Page', role: req.session.role})
  })
})

router.get('/subject/add', otorisasi, function (req, res) {
  	res.render('subject/add', {title: 'Add Subject Page', role: req.session.role})
})

router.post('/subject/add', otorisasi, function (req, res) {
  Model.Subject.create(req.body).then(() => {
  res.redirect('/subject')
  })
})

router.get('/subject/edit/:id', otorisasi, function (req, res) {
  Model.Subject.findById(req.params.id).then(dataSubject => {
  res.render('subject/edit', {dataSubjects: dataSubject, title: 'Edit Subject Page', role: req.session.role})
  })
})

router.post('/subject/edit/:id', otorisasi, function (req, res) {
  Model.Subject.update(req.body, {where: req.params}).then(() => {
  res.redirect('/subject')
  })
})

router.get('/subject/delete/:id', otorisasi, function (req, res) {
  Model.Subject.destroy({where: req.params}).then(() => {
  res.redirect('/subject')
  })
})

router.get('/subject/enrolledstudents/:id', otorisasi, function (req, res) {
  Model.Subject.findById(req.params.id).then(dataSubject => {
    Model.StudentSubject.findAll({
      attributes:['id', 'StudentId', 'SubjectId'],
      include: [ Model.Student ],
      where: { SubjectId: req.params.id }
    }).then(dataStudentSubjects => {
      res.render('subject/enrolledstudents', {dataSubjects: dataSubject, dataStudentSubjects: dataStudentSubjects, title: 'Enrolled Students Page', role: req.session.role})
    })
  })
})

module.exports = router