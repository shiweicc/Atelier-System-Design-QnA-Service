const app = require("./index.js");
const req = require("supertest");

describe('Test the root path', function() {
  it('should respond the GET request', async () => {
    const res = await req(app).get("/qna");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({questions: "answers"});
  });
});