/**
 * SoundCloud Cloud Module
 * @name Ryan Hickman
 *
 * Cloud Module for using YouTube API.
 *
 * To use this Cloud Module in Cloud Code, start by requiring
 * the <code>mailgun</code> module and initializing it using your
 * Mailgun domain name and api key.
 *
 * <pre>var SoundCloud = require('cloud/soundcloud-v1-1.0.js');
 * SoundCloud.initialize('clientId');</pre>
 *
 */




(function() {

  var _apiUrl = 'https://api.soundcloud.com/users/';
  var _apiUrlb = 'http://api.soundcloud.com/';
  var _clientID = '';
  var _accessToken = '';

  function wrappedHttpRequest(url, params, authenticateRequest) {
    authenticateRequest = authenticateRequest || false;
    if (authenticateRequest) {
      params.access_token = _accessToken;
    } else {
      params.client_id = _clientID;
    }
   
   console.log(url);
   
    return Parse.Cloud.httpRequest({
        url: url,
       
      });
  }

  module.exports = {

    initialize: function(clientID) {
      _clientID = clientID;
    },

    setAccessToken: function(accessToken) {
      _accessToken = accessToken;
    },

    resolve: function(params) {
      return wrappedHttpRequest(_apiUrlb + 'resolve.json?client_id='+_clientID+'&url='+params.url , params);
    },

            
    showContent: function(params) {
      return wrappedHttpRequest(_apiUrl + params.id +'.json?client_id='+_clientID, params);
    },
    
    showTracks: function(params) {
      return wrappedHttpRequest(_apiUrl + params.id +'/tracks.json?client_id='+_clientID, params);
    },

  }
})();