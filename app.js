var http = require('http'),
	express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	errorHandler = require('errorhandler'),
	cookieParser = require('cookie-parser'),
	MongoStore = require('connect-mongo')(session);

var app = express();

app.set('port', process.env.PORT || 3000);



http.createServer(app).listen(app.get('port'), function(){
	console.log('Serving up greatness at: ' + app.get('port'));
});