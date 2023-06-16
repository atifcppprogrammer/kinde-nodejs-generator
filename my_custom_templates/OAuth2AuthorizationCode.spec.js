/**
 * Kinde Management API
 * Provides endpoints to manage your Kinde Businesses
 *
 * The version of the OpenAPI document: 1
 * Contact: support@kinde.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */
import sinon from 'sinon';

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.KindeManagementApi);
  }
}(this, function(expect, KindeManagementApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new KindeManagementApi.AuthorizationCode();
  });

  describe('AuthorizationCode', function() {
    describe('generateAuthorizationURL', function() {
      it('should call generateAuthorizationURL successfully', function() {
        const client = {
          clientId: 'clientId',
          scope: 'scope',
          redirectUri: 'redirectUri',
          authorizationEndpoint: 'authorizationEndpoint',
          audience: 'audience',
        };
        const options = {
          start_page: 'start_page',
          state: 'state',
          is_create_org: true,
          org_code: 'org_code',
          org_name: 'org_name',
        };
        const result = instance.generateAuthorizationURL(client, options);
        const expectedSearchParams = {
          client_id: 'clientId',
          response_type: 'code',
          scope: 'scope',
          state: 'state',
          start_page: 'start_page',
          redirect_uri: 'redirectUri',
          audience: 'audience',
          is_create_org: true,
          org_name: 'org_name',
          org_code: 'org_code',
        };
        expect(result).to.be(`${client.authorizationEndpoint}?${new URLSearchParams(expectedSearchParams).toString()}`);
      });
    });
    describe('getToken', async function() {
      let fetchStub;
      beforeEach(() => {
        fetchStub = sinon.stub(global, 'fetch');
      });
    
      afterEach(() => {
        fetchStub.restore();
      });
    
      it('should call getToken successfully', async () => {
        const client = {
          clientId: 'abc123',
          clientSecret: 'secret',
          redirectUri: 'https://example.com/redirect',
          tokenEndpoint: 'https://example.com/token',
        };
        const code = 'def456';
        const expectedSearchParams = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: client.clientId,
          client_secret: client.clientSecret,
          code,
          redirect_uri: client.redirectUri,
        });
        const fakeToken = { access_token: '123456' };
        fetchStub.resolves({ json: sinon.stub().resolves(fakeToken) });
        const token = await instance.getToken(client, code);
        expect(fetchStub.calledOnce).to.be(true);
        expect(fetchStub.args[0][0]).to.be(client.tokenEndpoint);
        expect(fetchStub.args[0][1].method).to.be('POST');
        expect(fetchStub.args[0][1].headers['Content-Type']).to.be('application/x-www-form-urlencoded');
        expect(fetchStub.args[0][1].body.toString()).to.be(expectedSearchParams.toString());
        expect(token).to.eql(fakeToken);
      });
    });
  });
}));