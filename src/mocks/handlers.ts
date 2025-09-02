
import { http, HttpResponse } from 'msw';
import { emails } from '../../data';

export const handlers = [
  // Intercept the GET /api/emails request
  http.get('/api/emails', () => {
    // And respond with the mocked email data
    return HttpResponse.json(emails);
  }),
];
