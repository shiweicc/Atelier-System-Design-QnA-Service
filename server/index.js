const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/qna', (req, res) => {
  res.json({questions: "answers"});
})

module.exports = app;