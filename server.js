require('dotenv').config();

const path = require('path')

// express
const express = require('express')
const handlebars = require('express-handlebars')
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
// fileUpload
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express()+
//-------------- body parser --------------------- //
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ------------- handlebars ---------------------- //
app.set('view engine', 'hbs')
app.engine('hbs', handlebars ({
    layoutDir: __dirname + 'views/layouts',
    extname: 'hbs'
}))
app.use(express.static(path.join(__dirname, 'public')))

// ------------- sessions ---------------------- //
app.use(cookieParser());
app.use(session({ 
        secret: 'morfology-secret-key-9997',
        proxy: true,
        resave: true,
        saveUninitialized: true 
    }));

app.use(fileUpload({
    createParentPath: true
}))

app.use(cors())

// ------------- routes ---------------------- //

const MainRoute = require('./routes/MainRoute')
const LoginRoute = require('./routes/LoginRoute')
const RegisterRoute = require('./routes/RegisterRoute')
const SentenceRoute = require('./routes/SentenceRoute')
const ManageSentenceRoute = require('./routes/ManageSentenceRoute')
const AboutRoute = require('./routes/AboutRoute')
const AnalyzeRoute = require('./routes/AnalyzeRoute')
const ActivesRoute = require('./routes/ActivesRoute')

app.use('/', MainRoute)
app.use('/login', LoginRoute)
app.use('/register', RegisterRoute)
app.use('/sentence', SentenceRoute)
app.use('/sentence/manage', ManageSentenceRoute)
app.use('/about', AboutRoute)
app.use('/analyze', AnalyzeRoute)
app.use('/actives', ActivesRoute)

const port = process.env.PORT || 5000

app.listen(port, async () => {
    console.log(`server is running on http://localhost:${port}`)
})