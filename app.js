var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path')
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var multer = require('multer');
var morgan = require('morgan');
var mongoose  = require('mongoose');
var authRoutes = require('./routes/api/auth');
var pdfRoutes = require('./routes/api/upload');
var os = require('os');







/**
 * Middleware
 */
app.use(bodyParser.json({limit: '10mb', extended: true})); // for parsing application/json
app.use(bodyParser.urlencoded({limit: '10mb', extended: true})); // for parsing application/x-www-form-urlencoded
// app.use(multer({ dest: './public/uploads/'})); // for parsing multipart/form-data
app.use(morgan("dev"));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


  mongoose.connect('mongodb://localhost:27017/newsletter', { useNewUrlParser: true }, function(err, db){
    if(!err){
      console.log('Database connected..... mongodb://localhost:27017/newsletter')
    }
  })


app.use('/api', pdfRoutes);
app.use('/auth', authRoutes);


app.use(express.static(path.join(__dirname, 'client/dist/myapp')))

app.use("/pdf", express.static(path.join(__dirname, 'pdf')))
app.use('/newsletters', express.static(path.join(__dirname,'newsletters')))


app.use("/", function(req, res, next){
  var output = fs.readFileSync(__dirname + '/client/dist/myapp/index.html');
  res.type('html').send(output);
  next();
})
// app.use(express.static(path.join(__dirname,'./myApp/dist/myapp/index.html')));

// app.use('/newsletter', express.static(path.join('newsletters')))






// app.use('/client', express.static('client'));
// app.use('/', express.static('client/dist/client'));





app.listen(3000, function(){
  console.log('server is running...')
})
