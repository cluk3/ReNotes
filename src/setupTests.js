// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/react/cleanup-after-each';
// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect';

// avoid Draft.js snapshot changing everytime
jest.mock('draft-js/lib/generateRandomKey', () => () => '123');
