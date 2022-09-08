import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://localhost:3000/qa/questions?product_id=900009');
  sleep(1);
}

// k6 run --vus 1 --duration 30s script.js

// k6 run getQuestion.js
// k6 run postAnswer.js
// k6 run postQuestion.js
// k6 run putQuestionHelpful.js
// k6 run putQuestionReport.js
// k6 run putAnswerHelpful.js
// k6 run putAnswerReport.js