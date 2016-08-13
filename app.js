var http = require('http'),
	express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	errorHandler = require('errorhandler'),
	cookieParser = require('cookie-parser'),
	MongoStore = require('connect-mongo')(session);

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(require('stylus').middleware({src: __dirname + '/app/public'}));
app.use(express.static(__dirname + '/app/public'));
//MongoDB
var dbHost = process.env.DB_HOST || 'localhost';
var dbPort = process.env.DB_PORT || 27017;
var dbName = process.env.DB_NAME || 'node-login';
var dbURL = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;
console.log(dbURL);


app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: dbURL })
	})
);

require('./app/server/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Serving up greatness at: ' + app.get('port'));
});