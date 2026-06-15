import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '20s', target: 30 },
    { duration: '5s', target: 0 }
  ],
  thresholds: {
    'http_req_duration{endpoint:login}': ['p(95)<500']
  }
};

const BASE_URL = 'http://localhost:3000';
const LOGIN_PAYLOAD = JSON.stringify({
  email: 'alice@example.com',
  password: 'password1'
});

const HEADERS = {
  'Content-Type': 'application/json'
};

export default function () {
  const response = http.post(`${BASE_URL}/api/login`, LOGIN_PAYLOAD, { headers: HEADERS, tags: { endpoint: 'login' } });

  check(response, {
    'login succeeded': (res) => res.status === 200,
    'returned token': (res) => res.json('token') !== undefined
  });
}
