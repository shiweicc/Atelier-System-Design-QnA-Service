import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  vus: 1000, // corresponds to RPS i.e. changed to 10,100,1000 to meet RPS test requests
  duration: '30s',
  thresholds: {
    http_req_duration: ["p(99)<2000"], // 99% of requests must complete below 2s
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
  },
};

export default function () {
  let question_id = randomIntBetween(3167066, 3518963);
  const res = http.put(`http://localhost:3000/qa/questions/${question_id}/report`);
  check(res, {
    'is status 204': (r) => r.status === 204,
  });
  sleep(1);
}

// k6 run putQuestionReport.js