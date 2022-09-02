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
  executor: 'constant-vus',
  gracefulStop: '30s',
};

export default function () {
  let product_id = randomIntBetween(900009, 1000011);
  const url = `http://localhost:3000/qa/questions?${product_id}`;
  const payload = JSON.stringify({
    product_id: 999999,
    body: "Is it a short sleeve?",
    name: "Nike",
    email: "Nike@gmail.com"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  check(res, {
    'is status 201': (r) => r.status < 400,
  });
  sleep(1);
}

// k6 run postQuestion.js