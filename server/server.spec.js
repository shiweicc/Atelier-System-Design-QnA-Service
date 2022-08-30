const app = require("./index.js");
const request = require("supertest");
const pool = require("../config.js");

// close pool after tests are completed
afterAll(() => pool.end());

/**** GEI questions ****/
describe('GET /qa/question', () => {
  const testProductID = 1;
  test('should response 200 status with valid product_id in json format', async () => {
    const res = await request(app)
      .get(`/qa/questions?product_id=${testProductID}`)
      .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('should response 400 status with invalid product_id', async () => {
    const res = await request(app)
      .get(`/qa/questions?product_id=invalidID`)
      .set('Accept', 'application/json');
    expect(res.status).toEqual(400);
  });

  test('should find the questions by provided product_id', async () => {
    const res = await request(app)
      .get(`/qa/questions?product_id=${testProductID}`)
      .set('Accept', 'application/json');
      console.log('here: ', res.body[0].answers[0].body)
    expect(res.body[0].question_body).toBe('HEY THIS IS A WEIRD QUESTION!!!!?');
    expect(res.body[1].question_body).toBe('Does this product run big or small?');
  });

  test('should find the answers by provided product_id', async () => {
    const res = await request(app)
      .get(`/qa/questions?product_id=${testProductID}`)
      .set('Accept', 'application/json');
    expect(res.body[0].answers[0].body).toBe('Its a rubber sole');
    expect(res.body[0].answers[1].body).toBe('The rubber on the bottom wears thin quickly');
  });
});

/**** POST a question ****/
describe('POST /qa/question', () => {
  const testProductID = 1000;
  const testData = {
    "product_id": 1000,
    "body": "Testing Question???",
    "name": "tester",
    "email": "tester@gmail.com"
  }

  afterEach(async () => {
    await pool.query('DELETE FROM answers WHERE question_id >=3518963;');
    await pool.query('DELETE FROM questions WHERE question_id >=3518963;');
  });

  test('should response 201 status and success message with valid input data', async () => {
    const res = await request(app)
      .post(`/qa/questions?product_id=${testProductID}`)
      .send(testData)
    expect(res.status).toEqual(201);
    expect(res.text).toEqual('Success post question data');
  });

  test('should response 400 status and server error with invalid input data', async () => {
    const res = await request(app)
      .post(`/qa/questions?product_id=${testProductID}`)
      .send('invalidData')
    expect(res.status).toEqual(400);
  });
});

/**** POST an answer ****/
describe('POST /qa/questions/:question_id/answers', () => {
  const testQuestionID = 10000;
  const testDataWithPhoto = {
    "question_id": 10000,
    "body": "Testing Answer!!!",
    "name": "tester",
    "email": "tester@gmail.com",
    "photos": ["testing"]
  }
  const testDataWithoutPhoto = {
    "question_id": 10000,
    "body": "Testing Answer!!!",
    "name": "tester",
    "email": "tester@gmail.com",
    "photos": []
  }

  afterEach(async () => {
    await pool.query('DELETE FROM photos WHERE answer_id >=6879306;');
    await pool.query('DELETE FROM answers WHERE answer_id >=6879306;');
  });

  test('should response 201 status and success message with valid input data and photo', async () => {
    const res = await request(app)
      .post(`/qa/questions/${testQuestionID}/answers`)
      .send(testDataWithPhoto)
    expect(res.status).toEqual(201);
    expect(res.text).toEqual('Success post answer and photo data');
  });

  test('should response 201 status and success message with valid input data without photo', async () => {
    const res = await request(app)
      .post(`/qa/questions/${testQuestionID}/answers`)
      .send(testDataWithoutPhoto)
    expect(res.status).toEqual(201);
    expect(res.text).toEqual('Success post answer data');
  });

  test('should response 400 status and server error with invalid input data', async () => {
    const res = await request(app)
      .post(`/qa/questions/${testQuestionID}/answers`)
      .send('invalidData')
    expect(res.status).toEqual(400);
  });
});


/**** MARK question as helpful ****/
describe('PUT /qa/questions/:question_id/helpful', () => {
  const testQuestionID = 1;
  let helpfulnessBefore;

  beforeEach(async () => {
    const dataBefore = await pool.query(`SELECT question_helpfulness FROM questions WHERE question_id = ${testQuestionID}`);
    helpfulnessBefore = dataBefore.rows[0].question_helpfulness;
  });

  afterEach(async () => {
    await pool.query(`UPDATE questions SET question_helpfulness = ${helpfulnessBefore} WHERE question_id = ${testQuestionID};`);
  });

  test("should response 204 status and increment question helpfulness by one when mark question helpful", async () => {
    let res = await request(app)
      .put(`/qa/questions/${testQuestionID}/helpful`)
    expect(res.status).toEqual(204);
    const dataAfter = await pool.query(`SELECT question_helpfulness FROM questions WHERE question_id = ${testQuestionID}`);
    const helpfulnessAfter = dataAfter.rows[0].question_helpfulness;
    expect(helpfulnessAfter).toEqual(helpfulnessBefore + 1);
  })
});

/**** MARK answer as helpful ****/
describe('PUT /qa/answers/:answer_id/helpful', () => {
  const testAnswerID = 1;
  let helpfulnessBefore;

  beforeEach(async () => {
    const dataBefore = await pool.query(`SELECT answer_helpfulness FROM answers WHERE answer_id = ${testAnswerID}`);
    helpfulnessBefore = dataBefore.rows[0].answer_helpfulness;
  });

  afterEach(async () => {
    await pool.query(`UPDATE answers SET answer_helpfulness = ${helpfulnessBefore} WHERE answer_id = ${testAnswerID};`);
  });

  test("should response 204 status and increment answer helpfulness by one when mark answer helpful", async () => {
    let res = await request(app)
      .put(`/qa/answers/${testAnswerID}/helpful`)
    expect(res.status).toEqual(204);
    const dataAfter = await pool.query(`SELECT answer_helpfulness FROM answers WHERE answer_id = ${testAnswerID}`);
    const helpfulnessAfter = dataAfter.rows[0].answer_helpfulness;
    expect(helpfulnessAfter).toEqual(helpfulnessBefore + 1);
  })
});

/**** REPORT questions ****/
describe('PUT /qa/questions/:question_id/report', () => {
  test("should response 204 status when report question", async () => {
    let testQuestionID = 1000;
    let res = await request(app)
      .put(`/qa/questions/${testQuestionID}/report`)
     expect(res.status).toEqual(204);
  })
});

/**** REPORT answers ****/
describe('PUT /qa/answers/:answer_id/report', () => {
  test("should response 204 status when report answer", async () => {
    let testAnswerID = 1000;
    let res = await request(app)
      .put(`/qa/answers/${testAnswerID}/report`)
     expect(res.status).toEqual(204);
  })
});