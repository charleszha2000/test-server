const express = require('express');
const app = express();

app.get('/time', (req, res) => {
    console.log("got request");
    res.writeHead(200, {'ContentType' : 'text/plain'});
    res.write(Date());
    res.end();
})

app.set('port', 80);
app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
