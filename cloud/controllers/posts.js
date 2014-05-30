var _ = require('underscore');
var Post = Parse.Object.extend('Post');
var Contentarea = Parse.Object.extend('Contentarea');
var Website = Parse.Object.extend('Websites');






exports.setupSiteLayoutCmsPost = function(req, res) {





  var Website = Parse.Object.extend("Websites");
  var querya =  new Parse.Query(Website);
  querya.get(req.cookies.site, {
      success: function(site) {  
          
        
          
          
          var layout = new Array();
          
           _.each(req.body.obj, function(x){
               
               
               console.log('***************************');
               console.log(x.contentareaname);
               
               
               layout.push(x.contentareaname);
           });
          
          site.set('layout', layout);
          //site.set('color', req.params.clr);
          
           site.save(null, {
                success: function(site) {              
                    
                    var queryb =  new Parse.Query(Contentarea);
                    queryb.equalTo('siteid', site.id);
                    queryb.find().then(function(exsistingAreas) {
                        
                        
                        //Add current Contentareas to an array and check to see if they all exsist or if new contentareas need created 
                        newAreas = new Array();
                        checkArea = new Array();
                        _.each(exsistingAreas, function(x){
                           checkArea.push(x.name);
                        });
                        
                       
                        
                         var cb = _.after(site.get('layout').length, function(){
                              Parse.Object.saveAll(newAreas,{
                                success: function(list) {
                                  // All the objects were saved.
                                 res.send('success');
                                },
                                error: function(error) {
                                  // An error occurred while saving one of the objects.
                                  res.error("failure on saving layout ");
                                },
                              });
                        });

                        _.each(req.body.obj, function(x){
                           
                           if (checkArea.indexOf(x.contentareaname) == -1)
                               {
                                   console.log(checkArea.indexOf(x.contentareaname));
                                   console.log('need to add '+ x.contentareaname);
                                   console.log(x);
                                   
                                   zone = new Contentarea();
                                   zone.set('name', x.contentareaname);
                                   if (x.limit != '') zone.set('limit', x.limit);
                                   zone.set('module', x.module);
                                   if (typeof x.limit != 'undefined') zone.set('inputLayout', x.template);
                                   
                                   zone.set('siteid', site.id);
                                   zone.set('isShop', false);
                                   zone.set('owner', Parse.User.current());
                                   zone.set('locked', true);
                                   
                                   newAreas.push(zone);
                                   
                               }

                           
                            cb();
                        });
                       
                  
                    });
                    
                    
                    
                    
                    
                
                },

                error: function(user, error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
           });
          
      }
      
  });

    //get site req.cookies.site
    //user 
    
    var user = Parse.User.current();
    
    
   
    
}





exports.setupSiteLayoutCms = function(req, res) {

  var Website = Parse.Object.extend("Websites");
  var querya =  new Parse.Query(Website);
  querya.get(req.cookies.site, {
      success: function(site) {  
          
          site.set('layout', req.params.obj.split(','));
          site.set('color', req.params.clr);
          site.save(null, {
                success: function(site) {              
                    
                    var queryb =  new Parse.Query(Contentarea);
                    queryb.equalTo('siteid', site.id);
                    queryb.find().then(function(exsistingAreas) {
                        
                        
                        //Add current Contentareas to an array and check to see if they all exsist or if new contentareas need created 
                        newAreas = new Array();
                        checkArea = new Array();
                        _.each(exsistingAreas, function(x){
                           checkArea.push(x.name);
                        });
                        
                       
                        
                         var cb = _.after(site.get('layout').length, function(){
                              Parse.Object.saveAll(newAreas,{
                                success: function(list) {
                                  // All the objects were saved.
                                 res.redirect('/admin');
                                },
                                error: function(error) {
                                  // An error occurred while saving one of the objects.
                                  res.error("failure on saving layout ");
                                },
                              });
                        });

                        _.each(site.get('layout'), function(x){
                           
                           if (checkArea.indexOf(x) == -1)
                               {
                                   console.log('need to add '+ x);
                                   
                                   
                                   zone = new Contentarea();
                                   zone.set('name', x);
                                   zone.set('siteid', site.id);
                                   zone.set('isShop', false);
                                   zone.set('owner', Parse.User.current());
                                   zone.set('locked', true);
                                   
                                   newAreas.push(zone);
                                   
                               }

                           
                            cb();
                        });
                       
                  
                    });
                    
                    
                    
                    
                    
                
                },

                error: function(user, error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
           });
          
      }
  });

    //get site req.cookies.site
    //user 
    
    var user = Parse.User.current();
    
    
    
    
}


exports.build = function(req, res) {
  
    var user = Parse.User.current();
    res.render('admin/build', { 
                              user: user,
                              active: req.cookies.site,
                            });

    
};



// Display all posts.
exports.site = function(req, res) {
    
  
  var Website = Parse.Object.extend("Websites");
  var querya =  new Parse.Query(Website);
  querya.get(req.params.id, {
      success: function(site) {  
    
    
                console.log('got site: '+site.get('sitename'));
    
                var query = new Parse.Query(Post);
                query.descending('createdAt');
                query.include('area');
                query.equalTo('siteid', site.id);
                query.find().then(function(results) {

                    console.log(results);

                  data = new Array();

                  data['allData'] = results; 

                  _.each(results, function(x){


                      if (typeof x.get('area').get('name') != 'undefined')
                          {

                              p = x.get('area').get('name');

                              if (typeof data[p] == 'undefined')
                                  {
                                      data[p] = new Array();

                                  } 

                                
                                       x.module = x.get('area').get('module');
                                      
                                 

                                  data[p].push(x);
                           
                             
                            
                              //console.log('saving '+x+' to '+x.get('area').get('name'));
                                    
                              
                          }


                  });

                  //console.log(typeof data);
                  //console.log(data['Shop'].toString());
                  //  res.send(data);


                            res.render('smart/index', { 
                              data: data,
                              site: site,
                              layout: site.get('layout')
                            });





                },
                function() {
                  res.send(500, 'Failed loading posts');
                });
  
  
  
  
  
      }
      
  });
  
  
};




// Display all posts.
exports.sitePreview = function(req, res) {
    
    
  
 
    
    
                var query = new Parse.Query(Post);
                query.descending('createdAt');
                query.include('area');

                query.find().then(function(results) {


                  data = new Array();

                  data['allData'] = results; 

                  _.each(results, function(x){


                      if (typeof x.get('area').get('name') != 'undefined')
                          {

                              p = x.get('area').get('name').toLowerCase();

                              if (typeof data[p] == 'undefined')
                                  {
                                      data[p] = new Array();

                                  } 

                              //console.log('saving '+x+' to '+x.get('area').get('name'));
                              data[p].push(x);      

                          }


                  });

                  //console.log(typeof data);
                  //console.log(data['Shop'].toString());


                            res.render('smart/index', { 
                              data: data,
                              layout: req.params.obj.split(','),
                              clr: req.params.clr
                            });





                },
                function() {
                  res.send(500, 'Failed loading posts');
                });
  
  
  
  
  
      
 
  
  
};




// Display all posts.
exports.index = function(req, res) {
  var query = new Parse.Query(Post);
  query.descending('createdAt');
  query.include('area');
  
  query.find().then(function(results) {
   
   
    data = new Array();
      
    data['allData'] = results; 
      
    _.each(results, function(x){
        
        
        if (typeof x.get('area').get('name') != 'undefined')
            {
                
                p = x.get('area').get('name').toLowerCase();
            
                if (typeof data[p] == 'undefined')
                    {
                        data[p] = new Array();
                        
                    } 
                
                //console.log('saving '+x+' to '+x.get('area').get('name'));
                data[p].push(x);      
                
            }
        
       
    });
    
    //console.log(typeof data);
    //console.log(data['Shop'].toString());
      
   
              res.render(req.theme+'/index', { 
                data: data
              });
        
    
    
    
    
  },
  function() {
    res.send(500, 'Failed loading posts');
  });
};


exports.indexApi = function(req, res) {
  
  var Website = Parse.Object.extend("Websites");
  var querya =  new Parse.Query(Website);
    querya.get(req.params.id, {
      success: function(site) {
        // object is an instance of Parse.Object.
        
       
        
         var query = new Parse.Query(Post);
            query.descending('createdAt');
            query.include('area');
            query.include('owner');
            query.equalTo('siteid', site.id);


            query.find().then(function(results) {


              data = new Array();

              data['allData'] = results; 

              _.each(results, function(x){


                  if (typeof x.get('area').get('name') != 'undefined')
                      {

                          p = x.get('area').get('name').toLowerCase();

                          if (typeof data[p] == 'undefined')
                              {
                                  data[p] = new Array();

                              } 

                          //console.log('saving '+x+' to '+x.get('area').get('name'));
                          data[p].push(x);      

                      }


              });
              
              
              var vdata = _.extend({}, data);
             
              
              console.log(vdata);
              
               res.send(vdata );

              //console.log(typeof data);
              //console.log(data['Shop'].toString());


            



            },
            function() {
              res.send(500, 'Failed loading posts');
            });
        
      },

      error: function(object, error) {
        // error is an instance of Parse.Error.
        res.send('error');
      }
    });
  
 
};


exports.shop = function(req, res) {
  
  
  var ua = req.headers['user-agent'],
    $ = {};

    if (/mobile/i.test(ua))
        $.Mobile = true;

    if (/like Mac OS X/.test(ua)) {
        $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
        $.iPhone = /iPhone/.test(ua);
        $.iPad = /iPad/.test(ua);
    }

    if (/Android/.test(ua))
        $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

    if (/webOS\//.test(ua))
        $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

    if (/(Intel|PPC) Mac OS X/.test(ua))
        $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

    if (/Windows NT/.test(ua))
        $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
    
    if(typeof $.Mobile != 'undefined'){ 
        req.device = 'mobile';
        next();
    } else {
        req.device = 'desktop';
    }
    
    
     var Analytics = Parse.Object.extend('Analytics');
     stat = new Analytics();
    
     stat.set('host', req.host);
     stat.set('device', req.device);
     stat.set('header', ua);
     stat.set('url', req.url);
     stat.set('metric', 'shopview');
     stat.save();
  
  
  
  
  var query = new Parse.Query(Post);
  query.equalTo('contentarea','t65rYaNjA1');
  query.descending('createdAt');
  query.find().then(function(results) {
    res.render(req.theme+'/shop', { 
      items: results
    });
  },
  function() {
    res.send(500, 'Failed loading posts');
  });
};




exports.shopApi = function(req, res) {
  
  var query = new Parse.Query(Post);
  query.equalTo('contentarea','t65rYaNjA1');
  query.descending('createdAt');
  query.find().then(function(results) {
    
      var vdata = _.extend({}, results);
      res.send(vdata );
      
  },
  function() {
    res.send(500, 'Failed loading posts');
  });
};




exports.newWebsite = function(req, res){
    var contentQuery = new Parse.Query(Contentarea);
    contentQuery.ascending('createdAt');
     contentQuery.equalTo('owner', Parse.User.current());
    contentQuery.find().then(function(areas) {

      
             res.render('admin/newWebsite', {
                 areas: areas,
                  user: Parse.User.current(),
                   post: null
             });
        
        
   },
   function() {
     res.send(500, 'Failed loading posts');
   }); 
      
};



exports.newAk = function(req, res) {
    var contentQuery = new Parse.Query(Contentarea);
    contentQuery.ascending('createdAt');
     contentQuery.equalTo('owner', Parse.User.current());
    contentQuery.find().then(function(areas) {


             var user = Parse.User.current();
                    var relation = user.relation("sites");
                    relation.query().find({
                            success: function(sites) {
                                 res.render('admin/newak', {
                                    areas: areas,
                                    user: Parse.User.current(),
                                    sites: sites,
                                    active: req.cookies.site,
                                    post: null
                                });
                            },
                            error: function(error) {
                                   res.send(error);
                            }
                    });

      
        
        
   },
   function() {
     res.send(500, 'Failed loading posts');
   }); 
      
  
};

exports.newProduct = function(req, res) {
  
  
    var contentQuery = new Parse.Query(Contentarea);
    contentQuery.ascending('createdAt');
     contentQuery.equalTo('owner', Parse.User.current());
    contentQuery.find().then(function(areas) {


             var user = Parse.User.current();
                    var relation = user.relation("sites");
                    relation.query().find({
                            success: function(sites) {
                                 res.render('admin/newproduct', {
                                    areas: areas,
                                    user: Parse.User.current(),
                                    sites: sites,
                                    active: req.cookies.site,
                                    post: null
                                });
                            },
                            error: function(error) {
                                   res.send(error);
                            }
                    });

      
        
        
   },
   function() {
     res.send(500, 'Failed loading posts');
   }); 
      
  
  
 
};



// Display a form for creating a new post.
exports.new = function(req, res) {
  
  
    var contentQuery = new Parse.Query(Contentarea);
    contentQuery.ascending('createdAt');
     contentQuery.equalTo('owner', Parse.User.current());
    contentQuery.find().then(function(areas) {

      
             var user = Parse.User.current();
                    var relation = user.relation("sites");
                    relation.query().find({
                            success: function(sites) {
                                 res.render('admin/new', {
                                    areas: areas,
                                    user: Parse.User.current(),
                                    sites: sites,
                                    active: req.cookies.site,
                                    post: null
                                });
                            },
                            error: function(error) {
                                   res.send(error);
                            }
                    });
        
        
   },
   function() {
     res.send(500, 'Failed loading posts');
   }); 
      
  
  
 
};


exports.createWebsite = function(req,res){
   
   var user = Parse.User.current();
   var website = new Website();
   
   website.set('owner', user);
       
   website.save(_.pick(req.body, 'sitename')).then(function() {
             
            var relation = user.relation("sites");
            relation.add(website);
            user.save(null, {
                success: function(user) {              
                     res.redirect('/admin');
                },

                error: function(user, error) {
                    alert("Error: " + error.code + " " + error.message);
                }
           });
       
      
       
   },
            function(e) {
              res.send(e);
            });
    
   
};






// Create a new post with specified title and body.
exports.create = function(req, res) {
  var post = new Post();

  // Explicitly specify which fields to save to prevent bad input data
  
 
 // post.set('area', req.body.contentarea);
  var areaquery = new Parse.Query(Contentarea);
  areaquery.get(req.body.area).then(function(area) {
        
         post.set('owner', Parse.User.current());
          post.set('area', area);
           post.set('siteid', req.cookies.site);
           
         if (typeof req.body.img_array != 'undefined')
             {
                 post.set('img_array',req.body.img_array.split(','));
             }
         
         
         post.save(_.pick(req.body, 'title', 'body', 'sku', 'price', 'stock', 'producttype', 'width', 'height', 'weight', 'config', 'headline','smalltitle', 'buttontxt')).then(function() {
            res.redirect('/admin');
          },
          function(e) {
            res.send(e);
          });
  });
   
 
};






// Show a given post based on specified id.
exports.showApi = function(req, res) {
  var postQuery = new Parse.Query(Post);
  postQuery.include('area');
  var foundPost;
  postQuery.get(req.params.id).then(function(post) {
    if (post) {
        
        
      foundPost = post;
      var Comment = Parse.Object.extend('Comment');
      var commentQuery = new Parse.Query(Comment);
      commentQuery.equalTo('post', post);
      commentQuery.descending('createdAt');
      return commentQuery.find();
    } else {
      return [];
    }
  }).then(function(comments) {
   
    
      var vdata = _.extend({}, foundPost);
      res.send(vdata );
   
   
  },
  function() {
    res.send(500, 'Failed finding the specified post to show');
  });
};





// Show a given post based on specified id.
exports.show = function(req, res) {
  var postQuery = new Parse.Query(Post);
  postQuery.include('area');
  var foundPost;
  postQuery.get(req.params.id).then(function(post) {
    if (post) {
        
           var ua = req.headers['user-agent'],
            $ = {};

            if (/mobile/i.test(ua))
                $.Mobile = true;

            if (/like Mac OS X/.test(ua)) {
                $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
                $.iPhone = /iPhone/.test(ua);
                $.iPad = /iPad/.test(ua);
            }

            if (/Android/.test(ua))
                $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

            if (/webOS\//.test(ua))
                $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

            if (/(Intel|PPC) Mac OS X/.test(ua))
                $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

            if (/Windows NT/.test(ua))
                $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

            if(typeof $.Mobile != 'undefined'){ 
                req.device = 'mobile';
                next();
            } else {
                req.device = 'desktop';
            }


             var Analytics = Parse.Object.extend('Analytics');
             stat = new Analytics();

             stat.set('host', req.host);
             stat.set('device', req.device);
             stat.set('header', ua);
             stat.set('url', req.url);
            
            if (post.get('area').get('name') == 'Shop')
                {
                    stat.set('product', post.id)
                    stat.set('metric', 'productview');
             
                } else {
                    
                     stat.set('content', post.id)
                     stat.set('metric', 'contentview');
                     
                }
             
            
             
            stat.save();
           
           
      
        
        
        
        
      foundPost = post;
      var Comment = Parse.Object.extend('Comment');
      var commentQuery = new Parse.Query(Comment);
      commentQuery.equalTo('post', post);
      commentQuery.descending('createdAt');
      return commentQuery.find();
    } else {
      return [];
    }
  }).then(function(comments) {
    res.render(req.theme+'/single', {
      item: foundPost,
      comments: comments
    });
  },
  function() {
    res.send(500, 'Failed finding the specified post to show');
  });
};









// Display a form for editing a specified post.
exports.newLatestPostWithCustomTemplateFlex = function(req, res) {
  
 
  
  
  var query = new Parse.Query(Contentarea);
  query.get(req.params.id).then(function(area) {

    
       
        var queryOptions = new Parse.Query(Contentarea);
        queryOptions.equalTo('siteid', req.cookies.site);
        queryOptions.exists('fieldPath');
        queryOptions.find().then(function(areas) {
     
        
        res.render('admin/new'+req.params.type, {
                                    selected: req.params.type,
                                    user: Parse.User.current(),
                                    area: area.id,
                                    areas: areas,
                                    active: req.cookies.site,
                                    post: []
                                });
       
        });
   
    
     
  
  });



}




// Display a form for editing a specified post.
exports.newLatestPostWithCustomTemplate = function(req, res) {
  
 
  
  
  var query = new Parse.Query(Contentarea);
  query.get(req.params.id).then(function(area) {

    var queryb =  new Parse.Query(Post);
    queryb.equalTo('area', area);
    
    queryb.find().then(function(post) {
     
        if (post.length >= area.get('limit')) res.send('Error: You already have the limit on '+area.get('name')+' posts');
     
       
        var queryOptions = new Parse.Query(Contentarea);
        queryOptions.equalTo('siteid', req.cookies.site);
        queryOptions.exists('fieldPath');
        queryOptions.find().then(function(areas) {
     
        
        res.render('admin/new_custom', {
                                   
                                    user: Parse.User.current(),
                                    area: area.id,
                                    areas: areas,
                                    active: req.cookies.site,
                                    layout: area.get('inputLayout'),
                                    post: []
                                });
       
        });
   
    
     });
  
  });



}



// Display a form for editing a specified post.
exports.editLatestPostWithCustomTemplate = function(req, res) {
  
 
  
  
  var query = new Parse.Query(Contentarea);
  query.get(req.params.id).then(function(area) {

    var queryb =  new Parse.Query(Post);
    queryb.equalTo('area', area);
    
    queryb.find().then(function(post) {
     
       
     
     
        res.render('admin/new_custom', {
                                   
                                    user: Parse.User.current(),
                                    area: area.id,
                                    areas: [],
                                    active: req.cookies.site,
                                    layout: area.get('inputLayout'),
                                    post: ((post.length == 0) ? post : post[0])
                                });
       
   
    
     });
  
  });
  /*
  var query = new Parse.Query(Post);
   query.include('area');
  query.get(req.params.id).then(function(post) {
    if (post) {
      
      
            var contentQuery = new Parse.Query(Contentarea);
            contentQuery.ascending('createdAt');
            // contentQuery.equalTo('owner', Parse.User.current());
            contentQuery.equalTo('siteid', req.cookies.site);
            contentQuery.find().then(function(areas) {


           
                     var user = Parse.User.current();
                    var relation = user.relation("sites");
                    relation.query().find({
                            success: function(sites) {
                                  res.render('admin/'+post.get('area').get('fieldPath'), {
                                    areas: areas,
                                    user: Parse.User.current(),
                                    sites: sites,
                                    active: req.cookies.site,
                                    post: post
                                });
                            },
                            error: function(error) {
                                   res.send(error);
                            }
                    });


                   


           },
           function() {
             res.send(500, 'Failed loading posts');
           }); 
      
      
    } else {
      res.send('specified post does not exist')
    }
  },
  function() {
    res.send(500, 'Failed finding post to edit');
  });
  */
  
};

// Update a post based on specified id, title and body.
exports.update = function(req, res) {
  var post = new Post();
  post.id = req.params.id;
  post.save(_.pick(req.body, 'title', 'body')).then(function() {
    res.redirect('/admin');
  },
  function() {
    res.send(500, 'Failed saving post');
  });
};



// Display a form for editing a specified post.
exports.edit = function(req, res) {
  var query = new Parse.Query(Post);
   query.include('area');
  query.get(req.params.id).then(function(post) {
    if (post) {
      
      
            var contentQuery = new Parse.Query(Contentarea);
            contentQuery.ascending('createdAt');
            // contentQuery.equalTo('owner', Parse.User.current());
            contentQuery.equalTo('siteid', req.cookies.site);
            contentQuery.find().then(function(areas) {


           
                     var user = Parse.User.current();
                    var relation = user.relation("sites");
                    relation.query().find({
                            success: function(sites) {
                                  res.render('admin/'+post.get('area').get('fieldPath'), {
                                    areas: areas,
                                    user: Parse.User.current(),
                                    sites: sites,
                                    active: req.cookies.site,
                                    post: post
                                });
                            },
                            error: function(error) {
                                   res.send(error);
                            }
                    });


                   


           },
           function() {
             res.send(500, 'Failed loading posts');
           }); 
      
      
    } else {
      res.send('specified post does not exist')
    }
  },
  function() {
    res.send(500, 'Failed finding post to edit');
  });
};

// Update a post based on specified id, title and body.
exports.update = function(req, res) {
  var post = new Post();
  post.id = req.params.id;
  post.save(_.pick(req.body, 'title', 'body')).then(function() {
    res.redirect('/admin');
  },
  function() {
    res.send(500, 'Failed saving post');
  });
};

// Initial call should be deleteRecursive(objects, 0, function() {...});
// Invokes callback after all items in objects are deleted.
// Only works if number of objects is small (to avoid Cloud Code timeout).
var deleteRecursive = function(objects, index, callback) {
  if (index >= objects.length) {
    callback();
  } else {
    objects[index].destroy().then(function() {
      deleteRecursive(objects, index + 1, callback);
    });
  }
}

// Delete a post corresponding to the specified id.
exports.delete = function(req, res) {
  var post = new Post();
  post.id = req.params.id;

  // Also delete post's comments by chaining destroy calls.
  // Assumption: there will be a small number of comments per post.
  var query = new Parse.Query(Parse.Object.extend('Comment'));
  query.equalTo("post", post);
  query.find().then(function(results) {
    deleteRecursive(results, 0, function() {
      // After all comments are deleted, delete the post itself.
      post.destroy().then(function() {
        res.redirect('/admin');
      },
      function() {
        res.send(500, 'Failed deleting post');
      });
    });
  },
  function() {
    res.send(500, 'Failed finding comments for post');
  });
};
