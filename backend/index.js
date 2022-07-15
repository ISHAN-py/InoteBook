// Imports and Constants 
const express = require('express');
const connectToMongo = require('./db.js');
const cors = require('cors')
const fs = require('fs');
const port = 5000

app = express();
app.use(cors());
connectToMongo()

app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`InotebooK listening at ${port}`)
})