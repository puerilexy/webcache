const express = require('express');
const fs = require('fs');
const path = require('path');
const app= express();

const moment = require('moment');

function getGLNZ(){
  return moment().utc().add(0.2,'m').format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT';
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

app.get('/favicon.ico',(req, res)=>{
  let icoPath = path.resolve(__dirname,'./static/favicon.ico');
  let cont = fs.readFileSync(icoPath);
  res.end(cont)
})


app.get('/demo.css',(req, res)=>{
  let cssPath = path.resolve(__dirname,'./static/css/demo.css');
  let cont = fs.readFileSync(cssPath);
  res.setHeader('Expires', getGLNZ())
  // res.setHeader('Cache-Control', 'public,max-age=100') // 100s
  res.end(cont)
})

// 强缓存 - Expires
app.get('/demo.js',(req, res)=>{
  let jsPath = path.resolve(__dirname,'./static/js/expires.js');
  let cont = fs.readFileSync(jsPath);
  res.setHeader('Expires', getGLNZ())
  // res.setHeader('Cache-Control', 'public,max-age=100') // 100s
  res.end(cont)
})

app.listen(9090, ()=>{
    console.log('Server is running at http://localhost:9090')
});
