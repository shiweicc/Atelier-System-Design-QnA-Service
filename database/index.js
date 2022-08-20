const pool = require('../config.js');

const getQuestions = (productId) => {
  return new Promise ((resolve, reject) => {
    let queryQuestions = `
    SELECT
    q.question_id,
    q.question_body,
    q.question_date,
    q.asker_name,
    q.question_helpfulness,
    q.question_reported AS reported,
      ( SELECT json_agg (eachAnswer)
        FROM ( SELECT
          a.question_id AS id,
          a.answer_body AS body,
          a.answer_date AS date,
          a.answerer_name,
          a.answer_helpfulness AS helpfulness,
          a.answer_reported AS reported,
          ( SELECT json_agg(eachPhoto)
            FROM (
              SELECT
              p.photo_id AS id,
              p.photo_url AS url
              FROM photos p
              WHERE p.answer_id = a.answer_id
            ) eachPhoto
          ) AS photos
          FROM answers a
          WHERE a.question_id = q.question_id
        ) eachAnswer
      ) AS answers
    FROM questions q
    WHERE product_id = ${productId};
    `
    pool.query(queryQuestions, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

const postQuestion = (data) => {
  let productId = data.product_id;
  let body = data.body;
  let name = data.name;
  let email = data.email;
  let date = new Date().toISOString();

  return new Promise ((resolve, reject) => {
    let queryPostQuestion = `
    INSERT INTO questions
    (product_id, question_body, question_date, asker_name, asker_email, question_id)
    VALUES (${productId}, '${body}', '${date}', '${name}', '${email}',
    ((SELECT MAX(question_id) FROM questions)+1));
    `
    pool.query(queryPostQuestion, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}


const postAnswer = (data, questionId) => {
  let productId = data.product_id;
  let body = data.body;
  let name = data.name;
  let email = data.email;
  let date = new Date().toISOString();

  return new Promise ((resolve, reject) => {
    let queryPostAnswer = ``

    pool.query(queryPostQuestion, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}


const questionHelpful = (questionId) => {
  return new Promise ((resolve, reject) => {
    let queryQHelpful = `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${questionId};`

    pool.query(queryQHelpful, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

const answerHelpful = (answerId) => {
  return new Promise ((resolve, reject) => {
    let queryAHelpful = `UPDATE answers SET answer_helpfulness = answer_helpfulness + 1 WHERE answer_id = ${answerId};`

    pool.query(queryAHelpful, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

const reportQuestion = (questionId) => {
  return new Promise ((resolve, reject) => {
    let queryQReport = `UPDATE questions SET question_reported = true WHERE question_id = ${questionId};`

    pool.query(queryQReport, (err, result) => {
      if (err) {
        console.log('err in DB: ', err);
        reject(err);
      } else {
        console.log('success in DB: ', result);
        resolve(result);
      }
    })
  })
}

const reportAnswer = (answerId) => {
  return new Promise ((resolve, reject) => {
    let queryAReport = `UPDATE answers SET answer_reported = true WHERE answer_id = ${answerId};`

    pool.query(queryAReport, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}


module.exports = {
  getQuestions,
  postQuestion,
  postAnswer,
  questionHelpful,
  answerHelpful,
  reportQuestion,
  reportAnswer,
};


