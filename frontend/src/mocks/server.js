import {setupServer} from 'msw/node';
import {handlers} from './handlers';
// mock api server declared and handlers passed
export const server = setupServer(...handlers);
