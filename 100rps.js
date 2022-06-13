import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter, Rate } from 'k6/metrics';

export const requests = new Counter('http_reps');
export const failureRate = new Rate("failed_requests");

export const option = {
  thresholds: {
    failed_requests: ['rate<=0'],
    http_req_duration: ['p(100)<2000']
  }
};

export const options = {
  vus: 500,
  duration: '15s',
};

const baseUrl = "http://localhost:3000/qa"

const generateId = () => Math.floor(Math.random() * 1000011);

export default function () {
  const url = `${baseUrl}/${generateId()}`;
  const res = http.get(url);
  sleep(1);
  check(res, {
    'is status 200': (r) => r.status == 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
  // failureRate.add(status !== 200);
}