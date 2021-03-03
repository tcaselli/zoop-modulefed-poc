import { setupWorker } from 'msw';
import { handlers } from './handlers';

// This file setup the browser worker, to be used with Cypress or to mock http requests for development.

export const worker = setupWorker(...handlers);
