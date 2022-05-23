const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());

app.get('/', (req,res) => {
    res.send('Hello');
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));