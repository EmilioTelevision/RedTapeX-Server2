var _ = require('underscore');
var Contentarea = Parse.Object.extend('Contentarea');

// Display all posts.
exports.index = function(req, res) {
  var catQuery = new Parse.Query(Contentarea);
  
  catQuery.ascending('createdAt');
  catQuery.equalTo('owner', Parse.User.current());
  catQuery.find().then(function(results) {
      
      
        res.render('admin/index_cats', { 
          cats: results
        });
        
        
      },
      function() {
        res.send(500, 'Failed loading posts');
      });
    
   
  
};




// Delete a post corresponding to the specified id.
exports.delete = function(req, res) {
  var cat = new Contentarea();
  
  var query = new Parse.Query(Contentarea);
            query.get(req.params.id).then(function(catt) {
            
               catt.destroy({
                    success:function() {
                        res.redirect('/admin/cats');
                    },
                    error:function(error) {
                        res.error('Could not delete object.');
                    }
               });
                    
                    /*
                       
                        
                        .then(function() {
                    res.redirect('/posts');
                  },
                  function() {
                    res.send(500, 'Failed deleting post');
                  });
                    */
            
            });

/*
    var query = new Parse.Object.extend('Contentarea');
    query.get(req.params.id).then(function(results) {
        query.destory().then(function() {
        res.redirect('/posts');
      },
      function() {
        res.send(500, 'Failed deleting post');
      });
      
    });
      */
};




exports.new = function(req, res) {
    
     var contentQuery = new Parse.Query(Contentarea);
    contentQuery.ascending('createdAt');
     contentQuery.equalTo('owner', Parse.User.current());
    contentQuery.find().then(function(areas) {

      
             res.render('admin/newarea', {
                 areas: areas
             });
        
        
   },
   function() {
     res.send(500, 'Failed loading posts');
   }); 
    
  
};




exports.newGallery = function(req, res) {
    
     var contentQuery = new Parse.Query(Contentarea);
    contentQuery.ascending('createdAt');
     contentQuery.equalTo('owner', Parse.User.current());
    contentQuery.find().then(function(areas) {

      
             res.render('admin/newgallery', {
                 areas: areas
             });
        
        
   },
   function() {
     res.send(500, 'Failed loading posts');
   }); 
    
  
};



exports.newConfig = function(req, res) {
    
     var contentQuery = new Parse.Query(Contentarea);
    contentQuery.ascending('createdAt');
     contentQuery.equalTo('owner', Parse.User.current());
    contentQuery.find().then(function(areas) {

      
             res.render('admin/newconfig', {
                 areas: areas
             });
        
        
   },
   function() {
     res.send(500, 'Failed loading posts');
   }); 
    
  
};




// Create a new post with specified title and body.
exports.create = function(req, res) {
  var cat = new Contentarea();

  // Explicitly specify which fields to save to prevent bad input data

 cat.set("count", 0);
 cat.set('owner', Parse.User.current());
 
  cat.save(_.pick(req.body,  'fields', 'name', 'fieldPath')).then(function(catt) {
    
    res.redirect('/admin');
  },
  function() {
    res.send(500, 'Failed saving Contentarea');
  });
};