var _ = require('underscore');
var Post = Parse.Object.extend('Post');
var Comment = Parse.Object.extend('Comment');
var Contentarea = Parse.Object.extend('Contentarea');
var Insights = Parse.Object.extend('Insights');

// Display all posts.
exports.index = function(req, res) {
    
  
    
    var contentQuery = new Parse.Query(Contentarea);
    //contentQuery.equalTo('owner', Parse.User.current());
    contentQuery.equalTo('siteid', req.cookies.site);
    contentQuery.ascending('createdAt');
    contentQuery.find().then(function(areas) {

      
            var query = new Parse.Query(Post);
             query.descending('createdAt');
             //query.equalTo('owner', Parse.User.current());
             query.include('area');
             query.notEqualTo('title', 'undefined');
             query.equalTo('siteid', req.cookies.site);
             
             query.find().then(function(posts) {
               var query = new Parse.Query(Comment);
               query.descending('createdAt');
              
               
               query.find().then(function(comments) {
                 
                   
                   
                   console.log('looking at usr...');
    
                    var user = Parse.User.current();
                    var relation = user.relation("sites");
                    relation.query().find({
                            success: function(sites) {
                                res.render('admin/index', { 
                                    posts: posts,
                                    comments: comments,
                                    areas: areas,
                                    user: Parse.User.current(),
                                    sites: sites,
                                    active: req.cookies.site
                                });
                            },
                            error: function(error) {
                                   res.send(error);
                            }
                    });
                   
                   
                 
               },
               function() {
                 res.send(500, 'Failed loading comments');
               });
             },
             function() {
               res.send(500, 'Failed loading posts');
             });
        
        
   },
   function() {
     res.send(500, 'Failed loading posts');
   }); 
      

  
};
