var _ = require('underscore');
var Post = Parse.Object.extend('Post');
var Comment = Parse.Object.extend('Comment');
var Contentarea = Parse.Object.extend('Contentarea');
var Analytics = Parse.Object.extend('Analytics');
 
 

 
// Display all posts.
exports.index = function(req, res) {
    
    
         var user = Parse.User.current();
                    var relation = user.relation("sites");
                    relation.query().find({
                            success: function(sites) {
                                res.render('admin/settings', { 
                                    user: Parse.User.current(),
                                    sites: sites,
                                    active: req.cookies.site
                                });
                            },
                            error: function(error) {
                                   res.send(error);
                            }
                    });
                   
    
                
          

  
};




exports.payment = function(req, res){
    res.render('admin/makepayment', {
        user: null,
    });
};



exports.getStarted = function(req, res){
  
        
                 res.render('admin/startup', { 
                   user: Parse.User.current()
                 });
    
};

exports.launch = function(req, res){
  
        
                 res.render('admin/launch', { 
                   user: Parse.User.current()
                 });
    
};


exports.ineed = function(req, res){
  
        
                 res.render('admin/ineed', { 
                   user: Parse.User.current()
                 });
    
};



exports.needs = function(req, res){
  
         user = Parse.User.current();
         
         user.set('analytics', true);
         user.set('web', true);
         user.set('settings', true);
         
         user.save(null, {
            success: function(gameScore) {
                res.redirect('/getstarted');
            }
         });
         
                 
    
};



exports.onboardUsr = function(req, res){
    
    var password = req.body.password;
    var email = req.body.email;
    
    var user = new Parse.User();
    
    console.log("launch endpoint....");
    
    user.set('username', email);
    user.set('email', email);
    user.set('password', password);
    
    user.set('analytics', true);
    user.set('web', false);
    user.set('settings', false);
    user.set('promo', true);
    
    user.set('affiliate', req.body.affiliate);
    
   
   
    
    user.signUp().then(function(useraccnt) {
    
       
         console.log('new account created...');
    
    
         Parse.Cloud.httpRequest({
                                method: 'POST',
                                 headers: {
                                  'Content-Type': 'application/json',
                                 },
                                 url: 'https://mandrillapp.com/api/1.0/messages/send-template.json',
                                 body:{
                                      "key": "U44Xj-B8lA55D4qHN_5tng",
                                     template_name: "new-beta-user",
                                     template_content: [
                                         
                                     ],
                                     from_email: "nicole@redtapedesign.com",
                                     from_name: "RedTapeX",
                                     track_opens: true,
                                     track_clicks: true,

                                     "message": {
                                         "to": [
                                             {
                                                 "email": useraccnt.getUsername(),
                                              }
                                               ]
                                                     }},

                                  success: function(httpResponse) {
                                        console.log(httpResponse);
                                        //res.send(user);
                                        res.redirect('/');

                                   },
                                        error: function(httpResponse) {
                                          console.error(httpResponse);
                                          res.send("Uh oh, something went wrong");
                                   }

                                 });
    
         
        
         
         user = Parse.User.current();
           
        
         res.redirect('/?thanksforsigningupbeta');
         return;
        
             console.log("http://graph.facebook.com/"+req.body.facebook);
        
            Parse.Cloud.httpRequest({
                method: "GET",
            headers: {
                'Content-Type': 'application/json'
              },
            url: "http://graph.facebook.com/"+req.body.facebook,
            success: function(httpResponse) {
                
                    console.log('facebook success');
                    console.log(httpResponse);
                
                    var fbx = httpResponse.text;
                    fbx = JSON.parse(fbx);
                
                    
                    console.log("http://redtapedesign.com/reach/dashboard/lib/nbigsound.php?aid="+req.body.nbsid);
         
         
                    Parse.Cloud.httpRequest({
                     method: "GET",
                     headers: {
                         'Content-Type': 'application/json'
                       },
                     url: "http://redtapedesign.com/reach/dashboard/lib/nbigsound.php?aid="+req.body.nbsid,
                     success: function(httpResponse) {


                         var x = httpResponse.text;

                         x = JSON.parse(x);

                         console.log('---');
                         console.log(typeof x);
                         console.log('---');

                         var stats = new Array();
                         var networkids = new Array();


                         x.forEach(function(yy,xx)
                         {

                             for (var yyy in yy.Metric)
                             {

                                 for (var yyyy in yyy)
                                 {
                                     //console.log(yyy);
                                     //console.log(yy.Metric[yyy]);

                                     for (var datep in yy.Metric[yyy])
                                     {
                                         //console.log(datep);
                                         //console.log(yy.Metric[yyy][datep]);

                                         if(networkids.indexOf(yy.Profile.id) == '-1') 
                                         {
                                             // does not exist
                                             networkids.push(yy.Profile.id);
                                         }



                                         /*
                                         analytics = new Analytics();

                                         analytics.set('network',yy.Service.name);
                                         analytics.set('network_id',yy.Profile.id);
                                         analytics.set('network_url',yy.Profile.url);
                                         analytics.set('recordDate', new Date((datep*86400)*1000));
                                         analytics.set('metric', yyy);
                                         analytics.set('value', yy.Metric[yyy][datep]);

                                         stats.push(analytics);
                                         */
                                         //record.save();

                                     }




                                 }
                             };
                         });



                        console.log('....Ready to save the site...');
                        console.log(user);
                        console.log(networkids);
                        console.log(req.body.nbsid);
                        console.log(req.body.genre);
                        console.log(req.body.affiliate); 
                        console.log(req.body.twitterhandle);  

                          var Website = Parse.Object.extend('Websites');
                          var site = new Website();

                            site.set('nbsIdArray', networkids); 


                            site.set('nbsid', req.body.nbsid);
                            site.set('genre', req.body.genre);
                            site.set('artist', req.body.artist);



                            site.set('sitename', req.body.artist);

                             //site.set('stages', req.body.stage);


                            site.set('affiliate', req.body.affiliate);
                            site.set('twitterHandle',req.body.twitterhandle );


                            site.set('fbxID', fbx.id);
                            site.set('fbCover', fbx.cover.source);
                            site.set('fbLocation', fbx.current_location);
                            site.set('fbGenre', fbx.genre);
                            site.set('facebookProPic', 'http://graph.facebook.com/'+fbx.id+'/picture?type=large')


                             site.set('owner', useraccnt);



                            site.set('analytics', true);
                            site.set('web', false);
                            site.set('settings', true);
                            site.set('promo', false);
                            site.set('fans', false);
                            site.set('email', false);



                            console.log('saving new account/site...');

                             site.save(null, {
                                 success: function(sited) {              

                                      console.log('...site is saved....');



                                      var relation = useraccnt.relation("sites");
                                         relation.add(site);

                                         var stats = new Array();

                                         res.cookie('site', site.id);
                                         stats.push(useraccnt);


                                         Parse.Object.saveAll(stats, {
                                           success: function(obj) {

                                             res.redirect('/payment');

                                           },
                                           error: function(o, e){
                                             res.send(e);
                                           }
                                         });


                                         /*
                                         var Contentarea = Parse.Object.extend('Contentarea');


                                            var cac = new Contentarea();

                                           cac.set('owner', user);
                                           cac.set('siteid', site.id);
                                           cac.set('name', 'Blog');
                                           cac.set('locked', true);
                                           cac.set('fieldPath', 'new');
                                           cac.set('isShop', false);
                                           //cac.save();


                                           var cab = new Contentarea();

                                           cab.set('owner', user);
                                           cab.set('siteid', site.id);
                                           cab.set('name', 'Page');
                                           cab.set('locked', true);
                                           cab.set('fieldPath', 'new');
                                           cab.set('isShop', false);
                                           //cab.save();



                                             var ca = new Contentarea();

                                           ca.set('owner', req.user);
                                           ca.set('siteid', site.id);
                                           ca.set('name', 'Shop');
                                           ca.set('locked', true);
                                           ca.set('fieldPath', 'newproduct');
                                           ca.set('isShop', true);
                                           //ca.save();


                                           var stats = [cac, cab, ca, user];
                                           */

                                         //stats.push(objs);
                                         //stats.push(user);
                                          //res.send('done');




                                    // Parse.Object.saveAll(stats, {
                                      //   success: function(obj) {




                                               /*

                                             Parse.Cloud.httpRequest({
                                             method: "POST",
                                             url: "https://api.parse.com/1/jobs/gatherNextBigSoundDataBETA",
                                             headers: {
                                                "X-Parse-Application-Id": "FimfCpUGwzUiO1ramughg9maLP4QhLgn2v8rvLN5", 
                                                                                     "X-Parse-Master-Key": 'qhAEuozGQ8IhcKR0nLtVWpzFQP3rACzpIgKT9hCT',
                                                                                     "Content-Type":"application/json",
                                             },
                                             body: {
                                               "u": '', 

                                             },
                                             success: function(httpResponse) {
                                               res.redirect('/stats');
                                             },
                                             error: function(error) {
                                               res.send(error);
                                             }
                                           });

                                           */



                                       //  },
                                       //    error: function(obj,error) {
                                       //    console.error(obj, error);
                                      //   }
                                      // });



                                 },

                                 error: function(user, error) {
                                     res.redirect('/');
                                     alert("Error: " + error.code + " " + error.message);
                                 }
                            });








                       }, //success on HTTP
                   });
                        
                    

       }//facebook success
});//facebook success http    
        
    
    
    
    }, function(error) {
      // Show the error message and let the user try again
       res.send(error.message);
       //res.render('signup', { flash: error.message });
    });
  
};


exports.onboard = function(req, res){
  
            
         
     
           user = Parse.User.current();
           
           
          
           
           Parse.Cloud.httpRequest({
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
              },
            url: "http://redtapedesign.com/reach/dashboard/lib/nbigsound.php?aid="+req.body.nbsid,
            success: function(httpResponse) {
                
                
                var x = httpResponse.text;
                
                x = JSON.parse(x);
                
                console.log('---');
                console.log(typeof x);
                console.log('---');
                
                var stats = new Array();
                var networkids = new Array();


                x.forEach(function(yy,xx)
                {
                    for (var yyy in yy.Metric)
                    {

                        for (var yyyy in yyy)
                        {
                            //console.log(yyy);
                            //console.log(yy.Metric[yyy]);

                            for (var datep in yy.Metric[yyy])
                            {
                                //console.log(datep);
                                //console.log(yy.Metric[yyy][datep]);

                                if(networkids.indexOf(yy.Profile.id) == '-1') 
                                {
                                    // does not exist
                                    networkids.push(yy.Profile.id);
                                }


                                
                                /*
                                analytics = new Analytics();

                                analytics.set('network',yy.Service.name);
                                analytics.set('network_id',yy.Profile.id);
                                analytics.set('network_url',yy.Profile.url);
                                analytics.set('recordDate', new Date((datep*86400)*1000));
                                analytics.set('metric', yyy);
                                analytics.set('value', yy.Metric[yyy][datep]);
                                
                                stats.push(analytics);
                                */
                                //record.save();

                            }




                        }
                    };
                });

                //console.log('---------------------');
                //console.log(stats);
               // console.log(networkids);
                 var Website = Parse.Object.extend('Websites');
                 var site = new Website();
          
                   site.set('nbsIdArray', networkids); 
                   site.set('nbsid', req.body.nbsid);
                   site.set('genre', req.body.genre);
                   site.set('artist', req.body.artist);
                   site.set('sitename', req.body.artist);
                   site.set('stage', req.body.stage);
                  
                   
                   site.set('owner', Parse.User.current());
                   
                   site.set('analytics', false);
                   site.set('web', true);
                   site.set('settings', true);
                   site.set('promo', false);
                   site.set('fans', false);
                   site.set('email', false);
                   
                   
                   
                    site.save(null, {
                        success: function(site) {              
                             
                             
                             var relation = user.relation("sites");
                                relation.add(site);

                                var stats = new Array();

                                res.cookie('site', site.id);

                                var Contentarea = Parse.Object.extend('Contentarea');


                                   var cac = new Contentarea();

                                  cac.set('owner', user);
                                  cac.set('siteid', site.id);
                                  cac.set('name', 'Blog');
                                  cac.set('locked', true);
                                  cac.set('fieldPath', 'new');
                                  cac.set('isShop', false);
                                  //cac.save();


                                  var cab = new Contentarea();

                                  cab.set('owner', user);
                                  cab.set('siteid', site.id);
                                  cab.set('name', 'Page');
                                  cab.set('locked', true);
                                  cab.set('fieldPath', 'new');
                                  cab.set('isShop', false);
                                  //cab.save();



                                    var ca = new Contentarea();

                                  ca.set('owner', req.user);
                                  ca.set('siteid', site.id);
                                  ca.set('name', 'Shop');
                                  ca.set('locked', true);
                                  ca.set('fieldPath', 'newproduct');
                                  ca.set('isShop', true);
                                  //ca.save();


                                  var stats = [cac, cab, ca, user];


                                //stats.push(objs);
                                //stats.push(user);
                                 //res.send('done');



                            Parse.Object.saveAll(stats, {
                                success: function(obj) {
                                 res.redirect('/stats');
                                },
                                  error: function(obj,error) {
                                  console.error(obj, error);
                                }
                              });

                             
                             
                        },

                        error: function(user, error) {
                            alert("Error: " + error.code + " " + error.message);
                        }
                   });
                   
                  
                 
                
                 
               
                
                
              },
          });
           
           
           
           
           
    
};