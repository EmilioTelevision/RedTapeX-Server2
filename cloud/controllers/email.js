var _ = require('underscore');

// Display Stats.
exports.index = function(req, res) {
    
res.render('admin/email', {
    user: Parse.User.current()
});     
    
  
};




// Display Stats.
exports.fan = function(req, res) {
    
res.render('admin/fan', {
    user: Parse.User.current()
});    
    
  
};
