/* eslint-disable max-len */
import {expect} from 'chai';
import {describe, it} from 'mocha';
import request from 'request';
/**
 * Testing the gitlab /:username route
 * randomly selected a user from the gitlab projects feed namely;
 * Kai Matsusaka
 * see: https://gitlab.com/api/v4/users?username=Kairem (in browser) for sample of the response from the gitlab api
 */
describe('Gitlab users', ()=>{
  // Testing the status and content response of the express endpoint for gitlab users
  describe('Status & content', () => {
    // as the user exists this should return a status 200 status code
    it('status 200', (done)=>{
      request('http://localhost:5000/gitlab/Kairem', (error, response, body)=>{
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    // as the users username is Kairem this should return Kairem
    it('contains username Kairem', (done)=>{
      request('http://localhost:5000/gitlab/Kairem', (error, response, body)=>{
        // data variable is assigned the result of parsing the body from json
        const data = JSON.parse(body);
        // the username variable is assigned the value of the username
        const username = data[0].username;
        expect(username).to.equal('Kairem');
        done();
      });
    });
    // as the users name is Kai Matsusaka this should return 'Kai Matsusaka'
    it('contains name Kairem Matsusaka', (done)=>{
      request('http://localhost:5000/gitlab/Kairem', (error, response, body)=>{
        // data variable is assigned the result of parsing the body from json
        const data = JSON.parse(body);
        // name variable is assigned the value of the name in the data object
        const name = data[0].name;
        expect(name).to.equal('Kai Matsusaka');
        done();
      });
    });
  });
});
