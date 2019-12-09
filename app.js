var express = require('express');
var app = express();
var shopController = require('./controllers/shopController');


app.set('view engine', 'ejs');
app.use(express.static('public'));










shopController(app);

app.listen(3000, function(){ console.log("server running at port localhost:3000");});