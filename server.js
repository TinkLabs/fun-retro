const express = require('express');
const app = express();
app.use(express.static('./dist'));
const port = process.env.PORT || 5000;

app.use('/health', function(req, res) {
    res.send({
        status: true
    });
});
app.listen(port, () => {
    console.log('App running and listening on port', port);
});