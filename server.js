const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const controllers = require('./controllers')
const middlewares = require('./middlewares')
const nunjucks = require('nunjucks');

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/js', express.static(__dirname + '/js'))

app.get(['/', '/auth'], middlewares.auth, controllers.profile)

app.post('/sign-in', controllers.signIn)
app.post('/sign-up', controllers.signUp)
app.post('/log-out', controllers.logOut)

app.listen(3000)