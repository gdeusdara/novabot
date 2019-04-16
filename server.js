const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//Route setup
app.post('/', (req, res) => {
  
  res.send('Seu quote será salvo em breve');
})
//Start server
app.listen(port, (req, res) => {
console.log(`server listening on port: ${port}`)
 });