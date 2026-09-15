const http = require("http"),
	fs = require("fs");

var webpage = fs.readFileSync(__dirname + "/index.html");
var icon = fs.readFileSync(__dirname + "/favicon.ico");
var title = fs.readFileSync(__dirname + "/title.png");

var server = http.createServer((req, res) => {
	if (req.method == 'GET') {
		if (req.url == "/") {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(webpage);
			return;
		} else if (req.url == "/favicon.ico") {
			res.writeHead(200, {'Content-Type': 'image/x-icon'});
			res.end(icon);
			return;
		} else if (req.url == "/title") {
			res.writeHead(200, {'Content-Type': 'image/png'});
			res.end(title);
			return;
		}
	}
	console.log("Attempt to access ", req.url, " via a ", req.method, " request, ignored");
	res.writeHead(404, {'Content-Type': 'text/plain'});
	res.end('Not Found');
});

process.on("SIGINT", () => {
	console.log("Shutting Down...");
	server.close((err) => {
		if (err) {
			console.log(err);
		}
		console.log("Server Offline");
	});
});

process.on("SIGTERM", () => {
	console.log("Shutting Down...");
	server.close((err) => {
		if (err) {
			console.log(err);
		}
		console.log("Server Offline");
	});
});
server.listen(process.env.PORT || 8080, "0.0.0.0", () => { console.log("Server online!"); });
