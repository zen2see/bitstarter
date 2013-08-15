var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());
var fsrFS=fs.readFileSync('index.html', 'utf8');

app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response)
         {
           response.send(fsrFS);
         }
       );

var port = process.env.PORT || 8080;
app.listen(port, function()
            {
              console.log("Listening on " + port);
            }
          );
