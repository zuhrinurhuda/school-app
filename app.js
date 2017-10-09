// require express
const express = require('express')
const app = express()

// require express-session
const session = require('express-session')
app.use(session({
  secret: 'hacktiv8',
  resave: false,
  saveUninitialized: true
}))

// require express
app.use(express.static('./public'))

// require body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// require ejs
app.set('view engine', 'ejs')

const index = require('./routers/index')
app.use('/', index)

const teacher = require('./routers/teacher')
app.use('/', teacher)

const subject = require('./routers/subject')
app.use('/', subject)

const student = require('./routers/student')
app.use('/', student)

app.listen(3000)
console.log('Listening on port 3000')