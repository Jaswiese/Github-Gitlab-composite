/* eslint-disable no-undef */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'whatwg-fetch';
// server imported
import {server} from './mocks/server';
// server behaviour added, error handler added for out of bound api calls
beforeAll(()=> server.listen({onUnhandledRequest: 'error not responding'}));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
