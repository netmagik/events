const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require('method-override')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const eventRoutes = require('./routes/events')
const itemRoutes = require('./routes/items')
const guestRoutes = require('./routes/guests')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

//Connect To Database
connectDB();

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(logger('dev'))

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// // Set Global Variable
// app.use(function(req, res, next) {
//   res.locals.user = req.user || null
//   next()
// })

// Method override
//Use forms for put / delete
app.use(methodOverride("_method"));

app.use('/', mainRoutes)
app.use('/events', eventRoutes)
app.use('/items', itemRoutes)
app.use('/guests', guestRoutes)

const PORT = 2121;

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})