var express = require('express');

var app = express.createServer(express.logger());

var fsrFS=fs.readFileSync('index.html', 'utf8');

# app.get('/', function(request, response) {
#  response.send('Hello World 2!');
# });

console.log(fsrFS);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
