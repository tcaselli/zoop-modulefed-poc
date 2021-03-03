import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This file setup the nodeJS worker, to be used with Jest for mocking requests.
export const server = setupServer(...handlers);
