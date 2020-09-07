const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const moment = require('moment');
const md5 = require('md5');

function getGLNZ() {
	return moment().utc().add(1, 'm').format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT';
}

app.get('/', (req, res) => {
	res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
		<title>webCache</title>
		<link rel="stylesheet" href="/demo.css">
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

app.get('/demo.css', (req, res) => {
	let cssPath = path.resolve(__dirname, './static/css/demo.css');
	let cont = fs.readFileSync(cssPath);
	let etag = md5(cont);

	if (req.headers['if-none-match'] === etag) {
		res.writeHead(304, 'Not Modified');
		res.end();
	} else {
		res.setHeader('ETag', etag);
		res.writeHead(200, 'OK');
		res.end(cont);
	}
})

app.get('/demo.js', (req, res) => {
	let jsPath = path.resolve(__dirname, './static/js/etag.js');
	let cont = fs.readFileSync(jsPath);
	let etag = md5(cont);

	if (req.headers['if-none-match'] === etag) {
		res.writeHead(304, 'Not Modified');
		res.end();
	} else {
		res.setHeader('ETag', etag);
		res.writeHead(200, 'OK');
		res.end(cont);
	}
})

app.listen(9090, () => {
	console.log('Server is running at http://localhost:9090')
});
