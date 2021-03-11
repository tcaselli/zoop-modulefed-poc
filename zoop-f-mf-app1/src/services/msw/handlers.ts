import { rest } from 'msw';

// Define all your default REST mocks here, they will be used by MSW when intercepting requests if MSW is enabled.

export const handlers = [
  rest.get(`http://${process.env.MS_APP_DOMAIN}:${process.env.MS_APP_PORT}/v1/counter`, (req, res, ctx) => {
    return res(ctx.status(200, 'Success'), ctx.body('1'));
  }),
  rest.get(`http://${process.env.MS_APP_DOMAIN}:${process.env.MS_APP_PORT}/v1/counter/increment`, (req, res, ctx) => {
    return res(ctx.status(200, 'Success'), ctx.body('1'));
  }),
];
