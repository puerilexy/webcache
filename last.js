const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
	res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
		<title>webCache</title>
  </head>
  <body>
		Http Cache Demo
		<script src="/demo.js"></script>
  </body>
  </html>`)
});

app.get('/favicon.ico', (req, res) => {
	let icoPath = path.resolve(__dirname, './static/favicon.ico');
	let cont = fs.readFileSync(icoPath);
	res.end(cont)
})

app.get('/demo.js', (req, res) => {
	let jsPath = path.resolve(__dirname, './static/js/lastMod.js')
	let cont = fs.readFileSync(jsPath);
	let status = fs.statSync(jsPath)

	let lastModified = status.mtime.toUTCString()
	if (lastModified === req.headers['if-modified-since']) {
		res.writeHead(304, 'Not Modified')
		res.end()
	} else {
		res.setHeader('Cache-Control', 'public,max-age=5')
		res.setHeader('Last-Modified', lastModified)
		res.writeHead(200, 'OK')
		res.end(cont)
	}
})

app.listen(9090, () => {
	console.log('Server is running at http://localhost:9090')
});
