const express = require('express');
const path = require('path');
var app = express();

app.set('port', 8081);
app.use(express.static(path.join(__dirname, 'public')));

//Return the index for any other GET request
app.get('/*', function (req, res) {
    res.sendFile('showtimes.html', {root: path.join(__dirname, 'public')});
});

const server = app.listen(app.get('port'), function() {
	console.log('The server is running on: ' + app.get('port'));
});