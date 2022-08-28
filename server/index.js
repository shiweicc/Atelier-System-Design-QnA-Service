const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000;
const db = require('../database/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**** GEI questions ****/
app.get(`/qa/questions`, (req, res) => {
  let productId = req.query.product_id;

  db.getQuestions(productId)
  .then((data) => {
    res.status(201).send(data.rows);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

/**** POST a question ****/
//(body, name, email, product_id, 201 CREATED)
app.post("/qa/questions", (req, res) => {
  db.postQuestion(req.body)
    .then(() => {
      res.status(201).send('Success post question data');
    })
    .catch(err => {
      res.status(500).send(err);
    })
});


/**** POST an answer ****/
//(question_id, body, name, email, photos, 201 CREATED)
app.post("/qa/questions/:question_id/answers", (req, res) => {
  let photos = req.body.photos;

  db.postAnswer(req.body)
    .then((result) => {
      let answerId = result.rows[0].answer_id;
      if (photos.length > 0) {
        let promises = photos.map(url => db.postPhoto(answerId, url))
        Promise.all(promises)
          .then(data => {
            res.status(201).send('Success post answer and photo data');
          })
          .catch(err => {
            res.status(500).send(err);
          })
      } else {
        res.status(201).send('Success post answer data');
      }
    })
    .catch(err => {
      res.status(500).send(err);
    })
});


/**** MARK question as helpful ****/ // (quesiton_id, 204 NO CONTENT)
app.put("/qa/questions/:question_id/helpful", (req, res) => {
  db.questionHelpful(req.params.question_id)
    .then(() => {
      res.status(204).send('Success mark question helpful');
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

/**** MARK answer as helpful ****/ //(answer_id, 204 NO CONTENT)
app.put("/qa/answers/:answer_id/helpful", (req, res) => {
  db.answerHelpful(req.params.answer_id)
    .then(() => {
      res.status(204).send('Success mark answer helpful');
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

/**** REPORT questions ****/ // (question_id, 204 NO CONTENT)
app.put("/qa/questions/:question_id/report", (req, res) => {
  db.reportQuestion(req.params.question_id)
  .then(() => {
    res.status(204).send('Success report question');
  })
  .catch(err => {
    res.status(500).send(err);
  })
});

/**** REPORT answers ****/ // (answer_id, 204 NO CONTENT)
app.put("/qa/answers/:answer_id/report", (req, res) => {
  db.reportAnswer(req.params.answer_id)
  .then(() => {
    res.status(204).send('Success report answer');
  })
  .catch(err => {
    res.status(500).send(err);
  })
});


module.exports = app;




