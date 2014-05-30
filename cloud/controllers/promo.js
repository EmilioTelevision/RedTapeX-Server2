var _ = require('underscore');
var Post = Parse.Object.extend('Post');
var Comment = Parse.Object.extend('Comment');
var Contentarea = Parse.Object.extend('Contentarea');
var Insights = Parse.Object.extend('Insights');
var Orders_admin = Parse.Object.extend('Orders_admin');


// Display all posts.
exports.index = function(req, res) {
    
  
    
    res.render('admin/promo', { 
                   user: Parse.User.current()
                 });

  
};



exports.ajaxSocial = function(req, res) {
    
  
    
    res.render('admin/ajax/'+req.params.id, { 
                    user: Parse.User.current()
                 });

  
};




exports.checkout = function(req, res) {
    
  
     var order = new Orders_admin();

  // Explicitly specify which fields to save to prevent bad input data
  
 
 // post.set('area', req.body.contentarea);
        
        
        console.log(req.body.startdate);
        
         order.set('customer', Parse.User.current());
         order.set('startdate', new Date(req.body.startdate));
          
          
          
         if (typeof req.body.img_array != 'undefined')
             {
                 order.set('img_array',req.body.img_array.split(','));
             }
         

         order.save(_.pick(req.body, 'artist', 'name', 'duration', 'amount', 'product')).then(function() {
               res.redirect('/stats');
          },
          function(e) {
            res.send(e);
          });
 
  
    
 

  
};

