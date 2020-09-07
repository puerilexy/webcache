const express = require('express');
const fs = require('fs');
const path = require('path');
const app= express();

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

// 不加缓存信息
app.get('/demo.js',(req, res)=>{
  let cssPath = path.resolve(__dirname, './static/js/demo.js');
  let cont = fs.readFileSync(cssPath);
  res.end(cont);
})

app.listen(9090, ()=>{
    console.log('Server is running at http://localhost:9090')
});
