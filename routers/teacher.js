const express = require('express')
const router = express.Router()

const Model = require('../models')

let filter = {
  include: [{model: Model.Subject}]
}

router.get('/teacher', function (req, res) {
  Model.Teacher.findAll(filter, {order: [['id', 'ASC']]}).then((dataTeachers) => {
  res.render('teacher', {dataTeachers: dataTeachers})
  })
})

router.get('/teacher/add', function (req, res) {
  res.render('teacher/add')
})

router.post('/teacher/add', function (req, res) {
  Model.Teacher.create(req.body).then(() => {
  res.redirect('/teacher')
  })
})

router.get('/teacher/edit/:id', function (req, res) {
  Model.Teacher.findById(req.params.id).then(dataTeacher => {
    Model.Subject.findAll().then(dataSubject => {
      res.render('teacher/edit', {dataTeachers: dataTeacher, dataSubjects: dataSubject})
    })
  })
})

router.post('/teacher/edit/:id', function (req, res) {
  Model.Teacher.update(req.body, {where: req.params}).then(() => {
  res.redirect('/teacher')
  })
})

router.get('/teacher/delete/:id', function (req, res) {
  Model.Teacher.destroy({where: req.params}).then(() => {
  res.redirect('/teacher')
  })
})

module.exports = router