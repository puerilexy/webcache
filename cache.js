const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

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

app.get('/demo.css',(req, res)=>{
  let cssPath = path.resolve(__dirname,'./static/css/demo.css');
  let cont = fs.readFileSync(cssPath);
  res.setHeader('Cache-Control', 'public,max-age=10') // 10s
  res.end(cont)
})

// 强缓存 - Cache-Control
app.get('/demo.js', (req, res) => {
  let jsPath = path.resolve(__dirname, './static/js/control.js');
  let cont = fs.readFileSync(jsPath);
  res.setHeader('Cache-Control', 'public,max-age=10') // 10s
  res.end(cont);
})

app.listen(9090, () => {
  console.log('Server is running at http://localhost:9090')
});
