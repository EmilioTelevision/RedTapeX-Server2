var _ = require('underscore');
var Post = Parse.Object.extend('Post');
var Comment = Parse.Object.extend('Comment');
var Contentarea = Parse.Object.extend('Contentarea');
var Insights = Parse.Object.extend('Insights');
var Analytics = Parse.Object.extend('Analytics');
var Orders = Parse.Object.extend('Order');



//similar
//http://developer.echonest.com/api/v4/artist/similar?api_key=7AY68WSQWHRWRJANX&id=ARSKHHY1269FB3830E
//http://developer.echonest.com/api/v4/artist/search?api_key=7AY68WSQWHRWRJANX&format=json&name=Jordan%20Brown

Parse.Cloud.job("gatherEchoNestDataSimilarArtists", function(request, status) {   
    

   var Analytics = Parse.Object.extend('Analytics');
   var Websites = Parse.Object.extend('Websites');
    
   var profileid = 'ARSKHHY1269FB3830E';
   
    var query = new Parse.Query("Websites");
    
    query.find().then(function(results) {
   
   
        var cb = _.after(results.length, function(){

                  console.log('everything is completed');
                
                  status.success("Data Recorded successfully.");

            });
   
   
   
         _.each(results, function(site) {
            
             // Start this delete immediately and add its promise to the list.
            console.log(site.get('echoNestId'));



             if (typeof site.get('echoNestId') != 'undefined')
                 {    
   
   
                Parse.Cloud.httpRequest({
                     method: "GET",
                     headers: {
                         'Content-Type': 'application/json'
                     },
                         url: "http://developer.echonest.com/api/v4/artist/similar?api_key=7AY68WSQWHRWRJANX&id="+site.get('echoNestId'),

                     success: function(httpResponse) 
                     {
                          var x = httpResponse.text;

                          console.log('Parsing Echonest JSON');

                          x = JSON.parse(x);

                          //res.send(x);
                         /* 
                         x.response.artist.familiarity
                         x.response.artist.discovery
                         x.response.artist.hotttnesss
                         x.response.artist.artist_location

                         x.response.artist.familiarity_rank
                         x.response.artist.discovery_rank
                         x.response.artist.hotttnesss_rank
                        */

                         stats = new Array();

                         /* Save familiarity, discovery, hotttness, and ranks of each */

                         if (x.response.artists.length > 0)
                             {
                                for (var i = 0; i < x.response.artists.length; i++) {
                                    
                                    console.log(x.response.artists[i]);
                                }
                                  
                                    analytics = new Analytics();
                                    analytics.set('network','echonest');
                                    //analytics.set('network_id',site.get('echoNestId'));
                                    analytics.set('recordDate', new Date());
                                    analytics.set('siteid', site.id);
                                    analytics.set('site', site);
                                     analytics.set('valueObj',  x.response.artists);
                                    
                                    
                                    analytics.set('metric', 'similar');
                                    stats.push(analytics);
                                    
                                    //}
                             }


                         console.log('---------------------processed data');



                                      Parse.Object.saveAll(stats, {
                                          success: function(obj) {
                                            
                                            console.log("Saved Echonest Data!!")
                                            //status.message("Saved User Data");
                                            console.log('saved');
                                            cb();
                                            // promise.resolve();
                                          },
                                            error: function(obj,error) {
                                            console.error(obj, error);
                                             //status.message("Error Saving User Data");
                                             // promise.reject(error);
                                          }
                                        });

                     }
                  });
                  
             }// user has echonestid
               
           }); //each website                  
                            
    }); // query websites
    
});





//app.get('/enest', function(req, res){

Parse.Cloud.job("gatherEchoNestData", function(request, status) {   
    

   var Analytics = Parse.Object.extend('Analytics');
   var Websites = Parse.Object.extend('Websites');
    
   var profileid = 'ARSKHHY1269FB3830E';
   
    var query = new Parse.Query("Websites");
    
    query.find().then(function(results) {
   
   
        var cb = _.after(results.length, function(){

                  console.log('everything is completed');
                  
                  status.success("Data Recorded successfully.");

            });
   
   
   
         _.each(results, function(site) {
            
             // Start this delete immediately and add its promise to the list.
            console.log(site.get('echoNestId'));



             if (typeof site.get('echoNestId') != 'undefined')
                 {    
   
   
                Parse.Cloud.httpRequest({
                     method: "GET",
                     headers: {
                         'Content-Type': 'application/json'
                     },
                         url: "http://developer.echonest.com/api/v4/artist/profile?api_key=7AY68WSQWHRWRJANX&id="+site.get('echoNestId')+"&format=json&bucket=biographies&bucket=blogs&bucket=familiarity&bucket=hotttnesss&bucket=images&bucket=news&bucket=reviews&bucket=terms&bucket=urls&bucket=video&bucket=id:musicbrainz&bucket=artist_location&bucket=discovery&bucket=hotttnesss_rank&bucket=discovery_rank&bucket=familiarity_rank",

                     success: function(httpResponse) 
                     {
                          var x = httpResponse.text;

                          console.log('Parsing Echonest JSON');

                          x = JSON.parse(x);

                          //res.send(x);
                         /* 
                         x.response.artist.familiarity
                         x.response.artist.discovery
                         x.response.artist.hotttnesss
                         x.response.artist.artist_location

                         x.response.artist.familiarity_rank
                         x.response.artist.discovery_rank
                         x.response.artist.hotttnesss_rank
                        */

                         stats = new Array();

                         /* Save familiarity, discovery, hotttness, and ranks of each */

                         for(var i in x.response.artist) {

                             if (typeof x.response.artist[i] == 'number'){

                                 console.log(i+' '+x.response.artist[i]);

                                 analytics = new Analytics();
                                 analytics.set('network','echonest');
                                 //analytics.set('network_id',site.get('echoNestId'));
                                 analytics.set('recordDate', new Date());
                                 analytics.set('siteid', site.id);
                                 analytics.set('site', site);
                                 analytics.set('value',  x.response.artist[i]); 
                                 analytics.set('metric', i);
                                 stats.push(analytics);
                             }

                         }


                         /* Save artist location data */
                         
                         if (typeof  x.response.artist.artist_location != 'undefined')
                             {
                                analytics = new Analytics();
                                analytics.set('network','echonest');
                                //analytics.set('network_id',site.get('echoNestId'));
                                analytics.set('recordDate', new Date());
                                analytics.set('siteid', site.id);
                                analytics.set('site', site);
                                analytics.set('valueObj',  x.response.artist.artist_location); 
                                analytics.set('metric', 'aritst_location');
                                stats.push(analytics);
                             }
                             
                             
                             
                         /* Save discvoerability terms data */

                         if (typeof  x.response.artist.artist_location != 'undefined')
                             {
                                analytics = new Analytics();
                                analytics.set('network','echonest');
                                //analytics.set('network_id',site.get('echoNestId'));
                                analytics.set('recordDate', new Date());
                                analytics.set('siteid', site.id);
                                analytics.set('site', site);
                                analytics.set('valueObj',  x.response.artist.terms); 
                                analytics.set('metric', 'terms');
                                stats.push(analytics);
                             }


                         console.log('---------------------processed data');



                                      Parse.Object.saveAll(stats, {
                                          success: function(obj) {
                                            
                                            console.log("Saved Echonest Data!!")
                                            //status.message("Saved User Data");
                                            console.log('saved');
                                            cb();
                                            // promise.resolve();
                                          },
                                            error: function(obj,error) {
                                            console.error(obj, error);
                                             //status.message("Error Saving User Data");
                                             // promise.reject(error);
                                          }
                                        });

                     }
                  });
                  
             }// user has echonestid
               
           }); //each website                  
                            
    }); // query websites
    
});
