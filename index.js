
const express = require ('express'),
    app = express(),
    http = require('http'),
    hostname2 = '127.0.0.1',
    port = 3333,
    es6Renderer = require('express-es6-template-engine'),
    helmet = require('helmet'),
    morgan = require('morgan'),
    session = require('express-session'),
    FileStore = require("session-file-store")(session),
    cookieParser = require('cookie-parser');

app.engine('html', es6Renderer)
app.set('views', './views')
app.set('view engine', 'html')

const logger = morgan('tiny')
app.use(logger)

app.use(helmet())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser()); 
app.use(
    session({
        store: new FileStore(),
        secret: "not get rad",
        resave: false,
        saveUninitialized: true,
        is_logged_in: false
    })
)                                                                                           

const server = http.createServer(app)

server.listen(port, hostname2, () => {
    console.log(`I'm listening at ${hostname2}:${port}`)
})

const rootController = require('./routes/index')
const restaurantController = require('./routes/restaurant')
const loginController = require('./routes/login')
const signupController = require('./routes/signup');


app.use('/', rootController)
app.use('/restaurant', restaurantController)
app.use('/login', loginController)
app.use('/signup', signupController)