const express = require('express')
const router = express.Router()

const Model = require('../models')

let filter = {
  include: [{model: Model.Teacher}]
}

router.get('/subject', function (req, res) {
  Model.Subject.findAll(filter, {order: [['id', 'ASC']]}).then(dataSubjects => {
  res.render('subject', {dataSubjects: dataSubjects})
  })
})
// {order: [['id', 'ASC']]}
router.get('/subject/add', function (req, res) {
  	res.render('subject/add')
})

router.post('/subject/add', function (req, res) {
  Model.Subject.create(req.body).then(() => {
  res.redirect('/subject')
  })
})

router.get('/subject/edit/:id', function (req, res) {
  Model.Subject.findById(req.params.id).then(dataSubject => {
  res.render('subject/edit', {dataSubjects: dataSubject})
  })
})

router.post('/subject/edit/:id', function (req, res) {
  Model.Subject.update(req.body, {where: req.params}).then(() => {
  res.redirect('/subject')
  })
})

router.get('/subject/delete/:id', function (req, res) {
  Model.Subject.destroy({where: req.params}).then(() => {
  res.redirect('/subject')
  })
})

router.get('/subject/enrolledstudents/:id', function (req, res) {
  Model.Subject.findById(req.params.id).then(dataSubject => {
    Model.StudentSubject.findAll({
      attributes:['id', 'StudentId', 'SubjectId'],
      include: [ Model.Student ],
      where: { SubjectId: req.params.id }
    }).then(dataStudentSubjects => {
      // Model.Subject.findAll().then(dataSubject => {
        res.render('subject/enrolledstudents', {dataSubjects: dataSubject, dataStudentSubjects: dataStudentSubjects})
        // res.send(dataStudentSubjects[0].Student.getFullName())
      // })
    })
  })
})

module.exports = router