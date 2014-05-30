var _ = require('underscore');
var Post = Parse.Object.extend('Post');
var Comment = Parse.Object.extend('Comment');
var Contentarea = Parse.Object.extend('Contentarea');
var Insights = Parse.Object.extend('Insights');
var Analytics = Parse.Object.extend('Analytics');
var Orders = Parse.Object.extend('Order');



//app.get('/geninsights_mentions', function(req, res){
Parse.Cloud.job("geninsights_mentions", function(request, status) {   
   
   
   Parse.Cloud.useMasterKey();
   
   var Analytics = Parse.Object.extend('Analytics');
   var Websites = Parse.Object.extend('Websites');
   var Insights = Parse.Object.extend('Insights');
   
   var query = new Parse.Query("Analytics");
    
    
    //query.limit(3);
    query.equalTo('metric','mention');
    
   query.find().then(function(results) {
       
         var promise = new Parse.Promise();
         
       stats = new Array();
       
        var cb = _.after(results.length, function(){

                  console.log('mentions processed');

                                      Parse.Object.saveAll(stats, {
                                          success: function(obj) {
                                           
                                            //status.message("Saved User Data");
                                            promise.resolve();
                                            console.log('saved');
                                            status.success('done');
                                            // promise.resolve();
                                          },
                                            error: function(obj,error) {
                                             status.error(error);
                                             //status.message("Error Saving User Data");
                                             // promise.reject(error);
                                          }
                                        });                  
                 
                  //status.success("Data Recorded successfully.");

            });
       
       
       _.each(results, function(data) {
           
         console.log('we have data');
           
           switch(data.get('metric'))
           {
               case 'mention':
                   Parse.Cloud.httpRequest({
                     method: "GET",
                     headers: {
                         'Content-Type': 'application/json'
                     },
                         url: "http://urls.api.twitter.com/1/urls/count.json?url="+ data.get('mention_url'),

                     success: function(httpResponse) 
                     {
                          var x = httpResponse.text;
                          
                           x = JSON.parse(x);
                           
                            console.log('twitter: '+x.count);
                            
                           Parse.Cloud.httpRequest({
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                                url: "https://graph.facebook.com/?ids="+ data.get('mention_url'),

                            success: function(httpResponse) 
                            {
                                 var xx = httpResponse.text;

                                  xx = JSON.parse(xx);

                                  var totals = 0;

                                  if (typeof xx[data.get('mention_url')].shares != 'undefined') totals = totals +  xx[data.get('mention_url')].shares;
                                  if (typeof xx[data.get('mention_url')].likes != 'undefined') totals = totals +  xx[data.get('mention_url')].likes;
                                  if (typeof xx[data.get('mention_url')].comments != 'undefined') totals = totals +  xx[data.get('mention_url')].comments;  
                               
                                   console.log('facebook: '+ totals);
                                   console.log('url: '+ data.get('mention_url'));
                                   
                                 insights = new Insights();
                                 
                                
                                 insights.set('sideid', data.get('siteid'));
                                 insights.set('filename', 'pressmention');
                                 insights.set('headline', data.get('mention_title'));
                                 insights.set('title', data.get('mention_title'));
                                 insights.set('network_user_id', 1613550950);
                                 insights.set('url', data.get('mention_url'));
                                 insights.set('clicks_to_site', 0);
                                 insights.set('tweets_count', x.count);
                                 insights.set('facebooks_count', totals);
                                 
                                 insights.set('imagepreview', data.get('imagepreview'));
                                 insights.set('mention_title', data.get('mention_title'));
                                 
                                 
                                 var vhtml = '<a class="embedly-card" href="'+data.get('mention_url')+'"></a><script>(function(a){var b="embedly-platform",c="script";if(!a.getElementById(b)){var d=a.createElement(c);d.id=b;d.async=true;d.src=("https:"===document.location.protocol?"https":"http")+"://cdn.embedly.com/widgets/platform.js";var e=document.getElementsByTagName(c)[0];e.parentNode.insertBefore(d,e)}})(document);</script>';
                                          
                                 insights.set('appHeadline', 'You got a press mention on '+data.get('mention_source_name'));
                                 insights.set('markup', vhtml);
                                 
                                 stats.push(insights);
                                 cb();
                                  //x.count
                                  //data.get('mention_source')
                                  

                            }
                          });
                           
                           
                           
                          
                     }
                   });
                   
                  
                   break;
           }
           
          
           
       });
       
       
       
   });
   
    
});



Parse.Cloud.job("getPressMentions", function(request, status) {   
    

   var Analytics = Parse.Object.extend('Analytics');
   var Websites = Parse.Object.extend('Websites');
    
  
    var query = new Parse.Query("Websites");
    
    query.find().then(function(results) {
   
   
        var cb = _.after(results.length, function(){

                  console.log('everything is completed');
                 
                  status.success("Data Recorded successfully.");

            });
   
   
   
         _.each(results, function(site) {
            
             // Start this delete immediately and add its promise to the list.
            console.log(site.get('mentionId'));



             if (typeof site.get('mentionId') != 'undefined')
                 {    
   
   
                Parse.Cloud.httpRequest({
                     method: "GET",
                     headers: {
                         'Content-Type': 'application/json'
                     },
                         url: "http://redtapedesign.com/reach/dashboard/lib/getmention.php?id="+site.get('mentionId'),

                     success: function(httpResponse) 
                     {
                          var x = httpResponse.text;

                          console.log('Parsing Mention JSON');

                          x = JSON.parse(x);


                         stats = new Array();

                        for (var i = 0; i < x.mentions.length; i++) {
                            if (x.mentions[i].source_type != 'twitter')
                                {
                                    
                               
                               
                                 analytics = new Analytics();
                                 analytics.set('network','mention');
                                 analytics.set('recordDate', new Date(x.mentions[i].created_at));
                                 analytics.set('siteid', site.id);
                                 analytics.set('site', site);
                                
                                 analytics.set('metric', 'mention');
                                 
                                 analytics.set('mention_title', x.mentions[i].title);
                                 analytics.set('mention_url', x.mentions[i].url);
                                 analytics.set('mention_source', x.mentions[i].source_url);
                                 analytics.set('mention_source_type', x.mentions[i].source_type);
                                 
                                  analytics.set('mention_source_name', x.mentions[i].source_name);
                                 
                                 
                                 stats.push(analytics);
                                
                                
                                
                                }
                           }

                       
                          
                         console.log('---------------------processed data');



                                      Parse.Object.saveAll(stats, {
                                          success: function(obj) {
                                            
                                            console.log("Saved Mention Data!!")
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
