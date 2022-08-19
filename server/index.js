const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000;
const db = require('../database/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**** GEI questions ****/
app.get(`/qa/questions`, (req, res) => {
  db.getQuestions(1)
  .then((data) => {
    console.log('Success get questions data: ', data.rows);
    res.status(201).send(data.rows);
  })
  .catch((err) => {
    console.log('Fail to get questions data: ', err);
    res.status(500).send('Fail to get questions data', err);
  })
})

/**** POST a question ****/ //(body, name, email, product_id, 201 CREATED)
app.post("/qa/questions", (req, res) => {});

/**** POST an answer ****/ //(question_id, body, name, email, photos, 201 CREATED)
app.post("/qa/questions/:question_id/answers", (req, res) => {});

/**** mark question as helpful ****/ // (quesiton_id, 204 NO CONTENT)
app.put("/qa/questions/:question_id/helpful", (req, res) => {});

/**** mark answer as helpful ****/ //(answer_id, 204 NO CONTENT)
app.put("/qa/answers/:answer_id/helpful", (req, res) => {});

/**** report answers ****/ // (answer_id, 204 NO CONTENT)
app.put("/qa/answers/:answer_id/report", (req, res) => {});



module.exports = app;





