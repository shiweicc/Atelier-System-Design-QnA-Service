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
}

// A
const getAnswer = (questionId) => {
}

const postAnswer = (data, questionId) => {
}

// Q
const questionHelpful = (questionId) => {
}

const reportQuestions = (questionId) => {
}

// A
const answerHelpful = (answerId) => {
}

const reportAnswer = (answerId) => {
}


module.exports = {
  getQuestions,
  postQuestion,
  postAnswer,
  questionHelpful,
  answerHelpful,
  reportAnswer,
};


