// HTML Routes
// =============================================================
module.exports = function(app, path) { 

	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/home.html'));
	});
	app.get('/survey', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/survey.html'));
	});
	app.get('/img/:imageName', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/img/'+req.params.imageName));
	});

	app.get('/js/:jsName', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/js/'+req.params.jsName));
	});

	app.get('/css/:cssName', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/css/'+req.params.cssName));
	});

}