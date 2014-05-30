/**
 * Youtube Cloud Module
 * @name Ryan Hickman
 *
 * Cloud Module for using YouTube API.
 *
 * To use this Cloud Module in Cloud Code, start by requiring
 * the <code>mailgun</code> module and initializing it using your
 * Mailgun domain name and api key.
 *
 * <pre>var YouTube = require('cloud/youtube-v1-1.0.js');
 * YouTube.initialize('clientId');</pre>
 *
 */




(function() {

  var _apiUrl = 'https://www.googleapis.com/youtube/v3/';
  var _clientID = '';
  var _accessToken = '';

  function wrappedHttpRequest(url, params, authenticateRequest) {
    authenticateRequest = authenticateRequest || false;
    if (authenticateRequest) {
      params.access_token = _accessToken;
    } else {
      params.key = _clientID;
    }
   
    console.log(url);
    
    return Parse.Cloud.httpRequest({
        url: url,
        params: params
      });
  }

  module.exports = {

    initialize: function(clientID) {
      _clientID = clientID;
    },

    setAccessToken: function(accessToken) {
      _accessToken = accessToken;
    },

    searchUserChannel: function(params) {
      return wrappedHttpRequest(_apiUrl + 'search/', params);
    },

    showChannel: function(params) {
      return wrappedHttpRequest(_apiUrl + 'channels/', params);
    },
            
    showContents: function(params) {
      return wrappedHttpRequest(_apiUrl + 'playlistItems/', params);
    },
    

  }
})();