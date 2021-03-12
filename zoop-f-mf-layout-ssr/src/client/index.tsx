// @ts-ignore
// Why we do that : https://webpack.js.org/concepts/module-federation/#troubleshooting
import('./bootstrap');

// Start the Mock Service Worker conditionally on env variable.
// https://github.com/mswjs/msw
// The service worker intercepts all HTTP request and mocks the ones that are defined in /services/msw/handlers
// (async function prepare() {
//   const MockHttpRequests = Boolean(JSON.parse(process.env.MOCK_WITH_MSW || 'false'));
//   if (MockHttpRequests) {
//     const { worker } = await import('./services/msw/browser');
//     worker.start();
//   }
//   return;
// })();
