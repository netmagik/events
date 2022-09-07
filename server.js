const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')(session)
const mainRoutes = require('./routes/main')
const eventRoutes = require('./routes/events')
const connectDB = require('./config/database')
const methodOverride = require('method-override')
const logger = require('morgan')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)


connectDB()

const app = express()

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(logger('dev'))

// Sessions
app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set Global Variable
app.use(function(req, res, next) {
  res.locals.user = req.user || null
  next()
})

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

app.use(flash())

app.use('/', mainRoutes)
app.use('/events', eventRoutes)

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is running, you better catch it!')
})