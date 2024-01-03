const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const employee = require('./routes/employees')
const departments = require('./routes/departments')
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/api/employees', employee);
app.use('/api/departments', departments);


mongoose.connect('mongodb://localhost:27017/apollonia')
    .then(() => console.log('Connected to the db'))
    .catch((err) => console.log('Error :', err.message));

app.get('/', (req, res) => {
    res.send('Welcome on the Apollonia App')

});

app.listen(port, () => {
    console.log(`Listening on Port : ${port}`);
})