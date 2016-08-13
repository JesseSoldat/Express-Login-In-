

module.exports = function(app) {
	app.get('/', function(req, res){
		res.render('login', {title: 'Hello Please Login To Your Account'});
	});
}