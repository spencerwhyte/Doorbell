var express = require('express');
var https = require('https');
var bodyParser = require('body-parser')
var apn = require('apn');
var app = express();
var options = { };
var apnConnection = new apn.Connection(options);

app.use(bodyParser.json());
app.use(express.static('images'));


app.post('/play', function (req, response) {
    
    console.dir("sent" + req.body.id);
    var myDevice = new apn.Device("79e6a310e24ee690eea9963763a65d1ea6bfc2f8b5623cfd0988e956b985a9d7");
    
    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "\uD83D\uDCE7 \u2709 You have a new messages";
    note.payload = {'tone': req.body.id};

    apnConnection.pushNotification(note, myDevice);
    
    
    response.write("{\"success\":1}}");
    response.end();

});


app.get('/', function(req,res) {
  res.sendfile('index.html');
});

app.set('port', (process.env.PORT || 80));

app.listen(app.get('port'), function () {
    console.log('Example app listening on port ' + app.get('port'));
});
