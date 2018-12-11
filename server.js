const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use('/retroapp', express.static('./dist'));
app.use('/health', function(req, res) {
    res.send({
        status: true
    });
});
app.listen(port, () => {
    console.log('App running and listening on port', port);
});