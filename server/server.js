const path = require('path');
const express = require('express'); 
const app = express(); 
const publicPath = path.join(__dirname, '..','public'); 
const port = process.env.PORT || 3000; 


/* 
  if someone makes a request to the server we might want to run some code that logs something
  to the screen. if something makes a request we might want to run some code that serves up 
  that asset from the public directory.

  Luckily for us that code is built in. 
  just take advantage of express.static() and put it inside of app.use. 
  
  Now static also takes the argument. It takes the path to that public folder. 

  create path and publicPath and add it to static. 

  we now have an Express application that is going to serve up all assets from that directory. 

  
*/
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

/* 
  start up the server 

  app.listen, when we listen we have to listen on a specific port. 

*/
app.listen(port, () => {
  console.log('Server is up.'); 
});