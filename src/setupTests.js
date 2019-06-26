// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/react/cleanup-after-each';
// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect';

//mock DOM API for Quill
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
  takeRecords() {
    return [];
  }
};
global.document.getSelection = function() {};

jest.mock('./helpers/index.js', () => ({
  ...jest.requireActual('./helpers/index.js'),
  humanFriendlyDate: () => 'Mocked'
}));
