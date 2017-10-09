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

router.get('/student', function (req, res) {
  Model.Student.findAll({order: [['id', 'ASC']]}).then(dataStudents => {
  res.render('student', {dataStudents: dataStudents, title: 'Students Page', role: req.session.role})
  })
})

router.get('/student/add', function (req, res) {
  	res.render('student/add', {title: 'Add Student Page', role: req.session.role})
})

router.post('/student/add', function (req, res) {
  Model.Student.create(req.body).then(() => {
  res.redirect('/student')
  }).catch((err) => {
    res.render('student/add', {errors: err.errors, title: 'Add Student Page', role: req.session.role})
  })
})

router.get('/student/edit/:id', function (req, res) {
  Model.Student.findById(req.params.id).then(dataStudents => {
  res.render('student/edit', {dataStudents: dataStudents, title: 'Edit Student Page', role: req.session.role})
  })
})

router.post('/student/edit/:id', function (req, res) {
  Model.Student.update(req.body, {where: req.params}).then(() => {
  res.redirect('/student')
  })
})

router.get('/student/delete/:id', function (req, res) {
  Model.Student.destroy({where: req.params}).then(() => {
  res.redirect('/student')
  })
})

router.get('/student/addsubject/:id', function (req, res) {
  Model.Student.findById(req.params.id).then(dataStudent => {
    Model.Subject.findAll().then(dataSubjects => {
      res.render('student/addsubject', {dataStudents: dataStudent, dataSubjects: dataSubjects, title: 'Add Subject Students Page', role: req.session.role})
      // res.send(dataSubjects)
    })
  })
})

router.post('/student/addsubject/:id', function (req, res) {
  Model.StudentSubject.create(req.body).then(() => {
    res.redirect('/student')
    // res.send(req.body)
  })
})

module.exports = router