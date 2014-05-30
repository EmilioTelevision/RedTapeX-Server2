var _ = require('underscore');
var TokenRequest = Parse.Object.extend("TokenRequest");
var TokenStorage = Parse.Object.extend("TokenStorage");




/**
 * Auth
 */
exports.facebookAuth = function(req, res) {
    
     var tokenRequest = new TokenRequest();
    // Secure the object against public access.
    tokenRequest.setACL(restrictedAcl);
    /**
     * Save this request in a Parse Object for validation when GitHub responds
     * Use the master key because this class is protected
     */
    tokenRequest.save(null, { useMasterKey: true }).then(function(obj) {
      /**
       * Redirect the browser to GitHub for authorization.
       * This uses the objectId of the new TokenRequest as the 'state'
       *   variable in the GitHub redirect.
       */
      res.redirect(
        githubRedirectEndpoint + querystring.stringify({
          client_id: githubClientId,
          state: obj.id
        })
      );
    }, function(error) {
      // If there's an error storing the request, render the error page.
      res.render('error', { errorMessage: 'Failed to save auth request.'});
    });
  
};



exports.youtubeAuth = function(req, res) {
    
     var tokenRequest = new TokenRequest();
    // Secure the object against public access.
    tokenRequest.setACL(restrictedAcl);
    /**
     * Save this request in a Parse Object for validation when GitHub responds
     * Use the master key because this class is protected
     */
    tokenRequest.save(null, { useMasterKey: true }).then(function(obj) {
      /**
       * Redirect the browser to GitHub for authorization.
       * This uses the objectId of the new TokenRequest as the 'state'
       *   variable in the GitHub redirect.
       */
      res.redirect(
        githubRedirectEndpoint + querystring.stringify({
          client_id: githubClientId,
          state: obj.id
        })
      );
    }, function(error) {
      // If there's an error storing the request, render the error page.
      res.render('error', { errorMessage: 'Failed to save auth request.'});
    });
  
};



exports.twitterAuth = function(req, res) {
    
     var tokenRequest = new TokenRequest();
    // Secure the object against public access.
    tokenRequest.setACL(restrictedAcl);
    /**
     * Save this request in a Parse Object for validation when GitHub responds
     * Use the master key because this class is protected
     */
    tokenRequest.save(null, { useMasterKey: true }).then(function(obj) {
      /**
       * Redirect the browser to GitHub for authorization.
       * This uses the objectId of the new TokenRequest as the 'state'
       *   variable in the GitHub redirect.
       */
      res.redirect(
        githubRedirectEndpoint + querystring.stringify({
          client_id: githubClientId,
          state: obj.id
        })
      );
    }, function(error) {
      // If there's an error storing the request, render the error page.
      res.render('error', { errorMessage: 'Failed to save auth request.'});
    });
  
};








/**
 * Callback Handler
 */
 
 