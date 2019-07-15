// general polyfills (uses core-js)
import 'babel-polyfill';

// polyfill for fetch()
import 'whatwg-fetch';

if (process.env.ENV === 'production') {
  // production
} else {
  // development and test
  Error['stackTraceLimit'] = Infinity;
}
