/**
 * CMS + Marketing Insights Platform
 *
 * @author Ryan Hickman
 */



/**
 * Load needed modules.
 */

var path = require('path');
var express = require('express');
var moment = require('moment');
var _ = require('underscore');
var md5 = require('cloud/libs/md5.js');
var xml = require('cloud/libs/xmltojs.js');
var querystring = require('querystring');
var Buffer = require('buffer').Buffer;
var Stripe = require('stripe');
var http = require('http');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');
var Mandrill = require('mandrill');

var ig = require('cloud/libs/instagram-v1-1.0.js')
var yt = require('cloud/libs/youtube-v1-1.0.js')
var sc = require('cloud/libs/soundclound-v1-1.0.js')


/**
 * Initialize key modules
 */

Stripe.initialize('sk_test_XZSuJhVGykYAmhzRiek41goQ');
Mandrill.initialize('U44Xj-B8lA55D4qHN_5tng');
ig.initialize('505f2942dfc842509c6bc5df98887604');
ig.setAccessToken('6212183.505f294.eaaca972a0df4fe0bd700ce3881af108');
yt.initialize('AIzaSyDO1dhy6HarZhMgZPbeIMB3QDJ3TFrzfEc');
sc.initialize('bce52676d0d792ac0f0fce48662a11d7');
/**
 * Initialize oAuth2
 */

    //TOKEN SETUP


        var TokenRequest = Parse.Object.extend("TokenRequest");
        var TokenStorage = Parse.Object.extend("TokenStorage");



    //YOUTUBE

        var youtube_ClientId = '742079358383-d5mf8092sm67c2oao1a3n9cn3d0k52au.apps.googleusercontent.com';
        var youtube_ClientSecret = 'ycIZrN55O_8YpcHqi5WzvcD8';
        var youtube_RedirectEndpoint = 'https://github.com/login/oauth/authorize?';
        var youtube_ValidateEndpoint = 'https://github.com/login/oauth/access_token';


    //FACEBOOK

        var facebook_ClientId = '498136990260697';
        var facebook_ClientSecret = '7de6242a9ca789152149faa1870e9fd9';
        var facebook_RedirectEndpoint = 'https://github.com/login/oauth/authorize?';
        var facebook_ValidateEndpoint = 'https://github.com/login/oauth/access_token';


    //TWITTER

        var twitter_ClientId = 'FnhYNKEtKx4kS698OBXpZw';
        var twitter_ClientSecret = 'zrr66pcwnZnoMy9YCWg81IXY7VflCBtQZyKkvP34VU';
        var twitter_RedirectEndpoint = 'https://github.com/login/oauth/authorize?';
        var twitter_ValidateEndpoint = 'https://github.com/login/oauth/access_token';


 
/**
 * Create a Parse ACL which prohibits public access.  This will be used
 *   in several places throughout the application, to explicitly protect
 *   Parse User, TokenRequest, and TokenStorage objects.
 */
var restrictedAcl = new Parse.ACL();
restrictedAcl.setPublicReadAccess(false);
restrictedAcl.setPublicWriteAccess(false);



/**
 * Configure controllers in seperate files
 */
var postsController = require('cloud/controllers/posts.js');
var commentsController = require('cloud/controllers/comments.js');
var adminController = require('cloud/controllers/admin.js');
var contentController = require('cloud/controllers/contentareas.js');
var settingsController = require('cloud/controllers/settings.js');
var statsController = require('cloud/controllers/stats.js');
var promoController = require('cloud/controllers/promo.js');
var authController = require('cloud/controllers/auth.js');
var emailController = require('cloud/controllers/email.js');

var nbsController = require('cloud/controllers/nbs.js');
var mentionController = require('cloud/controllers/mention.js');
var echoNestController = require('cloud/controllers/echonest.js');


/**
 * Configure models in seperate files
 */
var models = require('cloud/models/shop');
var insightsModel = require('cloud/models/insights');





/**
 * Create express Instance
 */
var app = express();





/**
 * Configure app 
 */

app.set('views', 'cloud/views');
app.set('view engine', 'ejs');  
app.use(express.bodyParser());
app.use(express.methodOverride());



app.use(express.cookieParser('ssystm'));

app.use(parseExpressCookieSession({
  fetchUser: true,
  cookie: {
    maxAge: 3600000
  }
}));






/**
 * Register some basic functions
 */

app.locals._ = _;
app.locals.hex_md5 = md5.hex_md5;



/**
 * Calculate percentage difference 
 */

app.locals.per_diff = function(o,n){d = n-o;a = (n+o)/2; c = 100*(d/a);return c;}



/**
 * Generate time ago
 */

app.locals.formatTime = function(time) {
  var tt = moment(time).format('YYYYMMDD');
  
  
  return moment(tt, "YYYYMMDD").fromNow();
  
};



/**
 * Generate summary snippet
 */
app.locals.snippet = function(text, length) {
  if (text.length < length) {
    return text;
  } else {
    var regEx = new RegExp("^.{" + length + "}[^ ]*");
    return regEx.exec(text)[0] + "...";
  }
};




app.locals.domain = function(str)
{

    var match = str.match(/(?:https?:\/\/)?(?:www\.)?(.*?)\//);
    var domain = match[match.length-1]; //gmail.com (last group of the match)

    return domain.split('.')[0];

};


app.locals.fancyurl = function(str){
   
    var k =  str.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
    
    return k;

}




/**
 * Function to collect analytics
 */

function trakr(req, res, next)
{
    
   
    
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
    
    
     
    
     req.theme = 'themes/30514redtapex';
     res.cookie('siteid', req.params.id);
    
     var Analytics = Parse.Object.extend('Analytics');
     stat = new Analytics();
    
     stat.set('host', req.host);
     stat.set('device', req.device);
     stat.set('header', ua);
     stat.set('url', req.url);
     stat.set('referer', req.headers.referer);
     stat.set('metric', 'pageview');
     stat.set('siteid', req.cookies.siteid);
     stat.save();
    
     next();
}





function checkauth(req, res, next)
{
    
     app.use(parseExpressHttpsRedirect());
    
     if (Parse.User.current()) {
         next();
     } else {
        res.redirect('/login');
     }
}


Parse.Cloud.afterSave("Order", function(request, response) {

    var norder = request.object.get('order');
    

});



app.get('/demox', function(req, res){
   
    var x2js = new xml.X2JS();

        var xml = "<root><child><textNode>First &amp; Child</textNode></child><child><textNode>Second Child</textNode></child><testAttrs attr1='attr1Value'/></root>";
       res.send(JSON.stringify(xml));
    
    
});




Parse.Cloud.define('genInsightMissingAccount', function(req, res){
    
     var Websites = Parse.Object.extend('Websites');
    var query = new Parse.Query(Websites);
    
    query.get(req.params.siteid, {
        success: function(site) {
            
            var Insights = Parse.Object.extend('Insights');
            insights = new Insights();

            insights.set('headline', "Does "+site.get('sitename')+" have a "+req.params.accountName+" account? We can't seem to find it.");
            insights.set('filename', 'discovery');   
            insights.set('site', site);
            insights.set('siteId', site.id);
            insights.set('appHeadline', "Does "+site.get('sitename')+" have a "+req.params.accountName+" account? We can't seem to find it.");
            insights.save();
            
            
        }
    });
    
   
    
});



Parse.Cloud.define('genInsightDiscoveredAccount', function(req, res){
    
    var Websites = Parse.Object.extend('Websites');
    var query = new Parse.Query(Websites);
    
    query.get(req.params.siteid, {
        success: function(site) {
            
            var Insights = Parse.Object.extend('Insights');
            insights = new Insights();

            insights.set('headline', "We found a "+req.params.accountName+" account for "+site.get('sitename')+" ! We're going to analyize it to help you discover more ways to promote it");
            insights.set('filename', 'discovery');   
            insights.set('site', site);
            insights.set('siteId', site.id);
            insights.set('appHeadline', "We found a "+req.params.accountName+" account for "+site.get('sitename')+" ! We're going to analyize it to help you discover more ways to promote it");
            insights.save();
            
            
        }
    });
    
   
    
});





Parse.Cloud.afterSave("Websites", function(req, res) {


    var networks = req.object.get('missingNetworks'); 
    _.each(networks, function(data) {
        Parse.Cloud.run("genInsightMissingAccount", { siteid: req.object.id, accountName: data });
     });


    var networks = req.object.get('foundNetworks'); 
    _.each(networks, function(data) {
        Parse.Cloud.run("genInsightDiscoveredAccount", { siteid: req.object.id, accountName: data });
     });





    if(req.object.existed() != true){
       
       
  

            console.log('...Registering Mention using Artsit Name...');


            Parse.Cloud.httpRequest({
                method: "POST",
                body:{
                    xmlData: xmlData
                },

                url: "http://redtapedesign.com/reach/dashboard/lib/createAlert.php?term="+site.get('sitename'),

                success: function(httpResponse) 
                    {

                          x = JSON.parse(httpResponse);
                          x.alert.id

                          req.object.set('mentionId', x.alert.id);


                    }
            });



            console.log('...Sending new artist account to Zoho...');

            var xmlData = '<Accounts> <row no="1"> <FL val="Account Name">'+req.object.get('sitename')+'</FL> <FL val="Website">'+req.object.id+'</FL>  <FL val="Affiliate">'+req.object.get('affiliate')+'</FL> </row> </Accounts>';

            console.log(xmlData);

            Parse.Cloud.httpRequest({
                method: "POST",
                body:{
                    xmlData: xmlData
                },

                url: "https://crm.zoho.com/crm/private/xml/Accounts/insertRecords?authtoken=c4bc58066b00c0c1f74adec91f10a206&scope=crmapi&newFormat=1&wfTrigger=true",
                success: function(httpResponse) 
                    {
                        var x = httpResponse.text;
                        x = JSON.parse(x);



                    }
            });

        }
  
  
  }
   
);






// Check if stopId is set, and enforce uniqueness based on the stopId column.

Parse.Cloud.beforeSave("Insights", function(req, res) {
 
 if (req.object.get("sent") == true) res.success();
     
    
    var Insights = Parse.Object.extend("Insights");
    var query = new Parse.Query(Insights);
    query.equalTo("appHeadline", req.object.get("appHeadline"));
    query.equalTo("siteId", req.object.get("siteId"));
    
    var day = new Date();
    day.setDate(day.getDate() - 1);    
    //query.greaterThanOrEqualTo("createdAt", day); 
    
    query.first({
      success: function(object) {
        if (object) {
          return;  
          res.error("already exists.");
        } else {
          
          //if (req.object.get('filename') == 'pressmention') res.error("temp stop on press");
          res.success();
          
          
        }
      },
      error: function(error) {
        res.error("Could not validate uniqueness for this object.");
      }
    });
 
    

   

 
});


app.get('/reviewContent/:id', function(req, res){
  
   var Website = Parse.Object.extend('Websites');
   var Analytics = Parse.Object.extend('Analytics');
   var Insights = Parse.Object.extend('Insights'); 
   
     query = new Parse.Query(Website);
            query.get(req.params.id, {
              success: function(site) {
   
   
                queryx = new Parse.Query(Analytics);
                queryx.include('site');
                queryx.equalTo('site', site);
                queryx.equalTo('network', 'soundcloud');

                queryx.find().then(function(results) {
                   
                    insights = new Insights();

                    if(results.length > 0)
                        {

                            insights.set('headline', "We found "+results.length+" songs on "+ site.get('sitename') +"'s soundcloud account? We are analyzing the latest ones to find promotion opportunities for you");
                            insights.set('filename', 'content');   
                            insights.set('site', site);
                            insights.set('siteId', site.id);
                            insights.set('appHeadline', "We found "+results.length+" songs on "+ site.get('sitename') +"'s soundcloud account? We are analyzing the latest ones to find promotion opportunities for you");
                            insights.save();
                    
                        } else {
                            
                            insights.set('headline', "We noticed that "+ site.get('sitename') +"'s soundcloud account doesn't have any music on it. What's the deal?");
                            insights.set('filename', 'content');   
                            insights.set('site', site);
                            insights.set('siteId', site.id);
                            insights.set('appHeadline',  "We noticed that "+ site.get('sitename') +"'s soundcloud account doesn't have any music on it. What's the deal?");
                            insights.save();
                            
                        }
                    
                });
                
                
              }
            });
  
});



app.get('/findNewContent/:id', function(req, res){
  
   var Website = Parse.Object.extend('Websites');
   var Analytics = Parse.Object.extend('Analytics');
   var Insights = Parse.Object.extend('Insights'); 
   
     query = new Parse.Query(Website);
            query.get(req.params.id, {
              success: function(site) {
   
   
                queryx = new Parse.Query(Analytics);
                queryx.include('site');
                queryx.equalTo('site', site);
                queryx.equalTo('network', 'soundcloud');

                var day = new Date();
                day.setDate(day.getDate() - 10);
                
                queryx.greaterThan("published_at", day);
                
                

                queryx.find().then(function(results) {
                   
                    _.each(results, function(datav) {
                   
                       
                   
                        insights = new Insights();

                        insights.set('headline', site.get('sitename') + " released " + datav.get('title') +" " + app.locals.formatTime(datav.get('published_at')) + " on soundcloud with " + datav.get('playback_count') + ' plays');
                        insights.set('filename', 'newcontent');   
                        insights.set('site', site);
                        insights.set('siteId', site.id);
                        insights.set('appHeadline', site.get('sitename') + " released " + datav.get('title') +" " + app.locals.formatTime(datav.get('published_at')) + " on soundcloud with " + datav.get('playback_count') + ' plays');
                        insights.save();
                    
                    });
                    
                    res.send('saved');
                    
                });
                
                
              }
            });
  
});








Parse.Cloud.define('getSingleUserSoundCloudContent', function(req, res){
  
    var Website = Parse.Object.extend('Websites');
    var Analytics = Parse.Object.extend('Analytics');
    
            query = new Parse.Query(Website);
            query.get(req.params.siteid, {
              success: function(site) {
  
                        sc.showTracks({
                                id: req.params.scID

                              }).then(function(httpResponse) {

                                  //console.log('raw data...'+httpResponse.data.length); 
                                  //console.log(httpResponse.data);

                                  var stats = new Array();

                                   
                                  _.each(httpResponse.data, function(data) {

                                      console.log('SC RECORD');
                                      console.log(data);

                                      analyticssc = new Analytics();

                                      analyticssc.set('metric','content');
                                      analyticssc.set('network','soundcloud');
                                      analyticssc.set('contentid',data.id.toString());
                                      analyticssc.set('title',data.title);
                                      analyticssc.set('playback_count',data.playback_count);
                                      analyticssc.set('genre',data.genre);
                                      analyticssc.set('published_at', new Date(data.created_at));
                                      analyticssc.set('download_count',data.download_count);
                                      analyticssc.set('favoritings_count',data.favoritings_count);
                                      analyticssc.set('comment_count',data.comment_count);
                                      analyticssc.set('artwork',data.artwork_url);
                                      analyticssc.set('site',site);
                                      analyticssc.set('siteid',site.id);


                                     
                                      
                                     stats.push(analyticssc);
                                      

                                  });

                                 
                                 Parse.Object.saveAll(stats, {
                                            success: function(obj) {
                                               console.log('saved');
                                                res.success(obj);
                                            },
                                            error: function(obj,error) {
                                                console.log(error);
                                                res.error();
                                            }
                                        }); 

                            
                        });
              }
              
            });
  
});






Parse.Cloud.define('getSingleUserYouTubeContent', function(req, res){
  
    var Website = Parse.Object.extend('Websites');
    var Analytics = Parse.Object.extend('Analytics');
    
            query = new Parse.Query(Website);
            query.get(req.params.siteid, {
              success: function(site) {
  
              
                         yt.showContents({
                                playlistId: req.params.ytUploadsID,
                                part: 'snippet,contentDetails,status'
                              }).then(function(httpResponse) {

                                 
                                  console.log('Data:');
                                  console.log(httpResponse.data);
                                  
                                  

                                   var statsb = new Array();

                                   

                                  _.each(httpResponse.data.items, function(data) {

                                     
                                     console.log('YT Data--');
                                      
                                      analyticsyt = new Analytics();

                                      analyticsyt.set('metric','content');
                                      analyticsyt.set('network','youtube');
                                      analyticsyt.set('contentid',data.contentDetails.videoId);
                                      analyticsyt.set('title',data.snippet.title);
                                      analyticsyt.set('view_count',data.snippet.viewCount);
                                      analyticsyt.set('playback_count',data.snippet.viewCount);
                                      
                                      analyticsyt.set('like_count',data.snippet.likeCount);
                                      analyticsyt.set('dislike_count',data.snippet.dislikeCount);
                                      //analytics.set('favoritings_count',data.statistics.favoriteCount);
                                      analyticsyt.set('published_at', new Date(data.snippet.publishedAt));
                                      
                                      //analytics.set('comment_count',data.statistics.commentCount);
                                      analyticsyt.set('artworkObject',data.snippet.thumbnails);
                                      analyticsyt.set('site',site);
                                      analyticsyt.set('siteid',site.id);



                                      statsb.push(analyticsyt);

                                      

                                     //cb();

                                  });
                                  
                                 
                                 Parse.Object.saveAll(statsb, {
                                            success: function(obj) {
                                               console.log('---------------------YTTTTTTTTT saved');
                                               res.success(obj);
                                            },
                                            error: function(obj,error) {
                                               console.log('---------------------YTTTTTTTTT error');
                                                console.log(error);
                                                res.error(error);
                                            }
                                        }); 
                                 
                                  

                            
                        }, function(e){
                            console.log('error!!!');
                        });
  
                            
              } // success on site
              
            });
  
});





Parse.Cloud.job("analyizeContentLibrary", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var counter = 0;
  var promises = [];
  
  
  //Query for all "Content"
  var Content = Parse.Object.extend('AnalyticsContent');
  var contentQuery = new Parse.Query(Content);
  contentQuery.find().then(function(contents) {
  
  
    var cb = _.after(contents.length, function(){
          return;
    });
  
    _.each(contents, function(content){

            Parse.Cloud.run("reviewContent", {
                 id: content.get('contentid'),
            }, 
                 {

                   success: function(e){
                   //res.send(e);
                   content.set('views1', e);
                   content.save();
                   cb();
                 }, 
                    error: function(e){
                   //res.send(e);
                 }
            });  
            
    });
  
  
  
  }).then(function() {
    // Set the job's success status
    status.success("Data Recorded successfully.");
  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });
});



//Analyize content and compare
Parse.Cloud.define('reviewContent', function(req, res){
   
   
    var Analytics = Parse.Object.extend('Analytics');
    
            //Get the most recent data on a piece of content
           
            query = new Parse.Query(Analytics);
            query.equalTo('contentid', req.params.id);
            query.descending('createdAt');
            query.first({
              success: function(content) {
                  
                  
                  
                                //Get the data from yesterday
                                  queryb = new Parse.Query(Analytics);
                                  queryb.equalTo('contentid', req.params.id);

                                  var day = new Date();
                                  day.setDate(day.getDate() - 1);   

                                  queryb.lessThan("createdAt", day); 
                                  queryb.descending('createdAt');
                                  queryb.first({

                                   success: function(contentb) {

                                      if(!contentb)
                                          {
                                              res.error('no data for yesterday on this content');
                                          } else {
                                              res.success(contentb.get('playback_count'));
                                              //res.success( content.get('playback_count') + '--' + contentb.get('playback_count') );
                                          }


                                   },
                                   error: function(c,error){

                                     res.error('no data for yesterday on this content');
                                   }
                                  });

                  
                      
               
              },
              error: function(c,error){
                
                  res.error(error);
                  
              }
              
           
               
            });
  
              
   
   
    
});




Parse.Cloud.job("gatherContentFromSoundCloud", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var counter = 0;
  var promises = [];
  
  
  //Query for all "accounts"
  var Websites = Parse.Object.extend('Websites');
  var contentQuery = new Parse.Query(Websites);
  contentQuery.find().then(function(sites) {
  
  
        var cb = _.after(sites.length, function(){
            
             //return Parse.Promise.when(promises);
             
             
        });
        
        
        _.each(sites, function(site){
  

                    if (typeof site.get('scID') != 'undefined')
                        {
                            
                             Parse.Cloud.run("getSingleUserYouTubeContent", {
                                            siteid: site.id,
                                            ytUploadsID: site.get('ytUploadsID')
                                           }, 
                                           {
                                           success: function(e){
                                            //res.send(e);
                                           }, error: function(e){
                                            //res.send(e);
                                           }
                                          }); 
                            
                   
                            
                            
                            
                        }
                  
                  if (typeof site.get('ytUploadsID') != 'undefined')
                      {
                          
                          
                                Parse.Cloud.run("getSingleUserSoundCloudContent", {
                                            siteid: site.id,
                                            scID: site.get('scID')
                                           }, 
                                           {
                                           success: function(e){
                                            //res.send(e);
                                           }, error: function(e){
                                            //res.send(e);
                                           }
                                          });   
                          
                      }
                  
        
        //cb();
        });
        
  
    }).then(function() {
    // Set the job's success status
    status.success("Data Recorded successfully.");
  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });
});





Parse.Cloud.job("notificationQueue", function(request, status) {
// Set up to modify user data
  Parse.Cloud.useMasterKey();


    //Query each site (so that only a single notification is shipped, preventing firehose
    var Websites = Parse.Object.extend('Websites');
    var Insights = Parse.Object.extend('Insights');
    
    
    
    
    var notiQuery = new Parse.Query(Insights);
    
    notiQuery.ascending('createdAt');
    notiQuery.notEqualTo('sent', true);
    notiQuery.include('site');
    
    notiQuery.find().then(function(noti) {
  
  
        var promise = new Parse.Promise();
  
        var cb = _.after(noti.length, function(){
            
             //return Parse.Promise.when(promises);
             
             
        });
        
        
        var unique = new Array();
        
        
        _.each(noti, function(notification){
            
           
            if (unique.indexOf(notification.get('siteId')) == '-1'){
               
                 
               // console.log('Sending queue for ' + notification.get('site').get('sitename'));
               
                
                unique.push(notification.get('siteId'));
                
                var promiseb = new Parse.Promise();
                
                    
                     console.log('Sending...' + notification.get('appHeadline'));
                         
                       
                                           var queryx = new Parse.Query(Parse.Installation);
                                           queryx.equalTo('deviceType', 'ios');
                                           Parse.Push.send({
                                            where: queryx, 
                                            //push_time: later,       
                                            data: {
                                               alert: notification.get('appHeadline'),
                                            }
                                                }, { success: function(e) { 

                                                   // cb();

                                                }, error: function(err) { 

                                                     console.log(err);
                                                }
                                          });
                    
                     
                    notification.set('sent', true);
                    notification.save();
           
                
            }
            
           
            
                    
                     
                  
        });
                    
         

 }).then(function() {
    // Set the job's success status
    status.success("Data Recorded successfully.");
  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });
});




Parse.Cloud.job("gatherContentFromYouTube", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var counter = 0;
  var promises = [];
  
  
  //Query for all "accounts"
  var Analytics = Parse.Object.extend('Analytics');
  var Websites = Parse.Object.extend('Websites');
  var contentQuery = new Parse.Query(Websites);
  contentQuery.find().then(function(sites) {
  
  
        var cb = _.after(sites.length, function(){
            
             return Parse.Promise.when(promises);
             
             
        });
        
        
        _.each(sites, function(site){
  
                    console.log('Looking at '+ site.get('sitename'));

                    if (typeof site.get('ytUploadsID') != 'undefined')
                        {
                            
                            
                            console.log('Found ytUploadsID... '+site.get('ytUploadsID'));
                                
                            
                            
                           yt.showContents({
                                playlistId: site.get('ytUploadsID'),
                                part: 'snippet,contentDetails,status'
                              }).then(function(httpResponse) {

                                 
                                  console.log('Data:');
                                  console.log(httpResponse.data);

                                   var stats = new Array();

                                  _.each(httpResponse.data, function(data) {

                                      console.log(data);

                                      analytics = new Analytics();

                                      analytics.set('network','youtube');
                                      analytics.set('contentid',data.id);
                                      analytics.set('title',data.snippet.title);
                                      analytics.set('view_count',data.snippet.viewCount);
                                      analytics.set('like_count',data.snippet.likeCount);
                                      analytics.set('dislike_count',data.snippet.dislikeCount);
                                      analytics.set('favoritings_count',data.statistics.favoriteCount);
                                      analytics.set('published_at',data.snippet.publishedAt);
                                      
                                      analytics.set('comment_count',data.statistics.commentCount);
                                      analytics.set('artworkObject',data.snippet.thumbnails);
                                      analytics.set('site',site);
                                      analytics.set('siteid',site.id);


                                      stats.push(analytics);



                                  });

                                  Parse.Object.saveAll(stats, {
                                      success: function(obj) {
                                          console.log('saving set 1');
                                          //promise.resolve();
                                      },
                                      error: function(obj,error) {
                                          //promise.reject(error);
                                      }
                                  });

                            
                        }, function(e){
                            console.log('error!!!');
                        });
                  }
        
        //cb();
        });
        
  
    }).then(function() {
    // Set the job's success status
    status.success("Data Recorded successfully.");
  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });
});










app.get('/verifyArtist/:id', function(req, res){
    

    
                      
           var Website = Parse.Object.extend('Websites');
          
            query = new Parse.Query(Website);
            query.get(req.params.id, {
              success: function(site) {
                

                Parse.Cloud.httpRequest({
                     method: "GET",
                     headers: {
                         'Content-Type': 'application/json'
                       },
                     url: "http://redtapedesign.com/reach/dashboard/lib/nbigsound.php?aid="+site.get('nbsid'),
                     success: function(httpResponse) {


                         var x = httpResponse.text;

                         x = JSON.parse(x);

                         var stats = new Array();
                         var networkids = new Array();
                         var networkurls = new Array();

                         x.forEach(function(yy,xx)
                         {

                             for (var yyy in yy.Metric)
                             {

                                 for (var yyyy in yyy)
                                 {
                                    

                                     for (var datep in yy.Metric[yyy])
                                     {
                                         
                                         if(networkids.indexOf(yy.Profile.id) == '-1') 
                                         {
                                             // does not exist
                                             networkids.push(yy.Profile.id);
                                         }
                                         
                                         if(networkurls.indexOf(yy.Profile.url) == '-1') 
                                         {

                                            networkurls.push(yy.Profile.url);
                                         }

                                     }




                                 }
                             };
                         });



                            site.set('networkUrls', networkurls);
                            site.set('nbsIdArray', networkids); 


                            uris = networkurls;
             
                            var datax = new Array();
                            var missing = new Array();

                            _.each(uris, function(data) {
                                 datax.push(app.locals.domain(data));
                                 
                                 if (app.locals.domain(data).indexOf('instagram') != -1) igname = data.split('http://instagram.com/');
                                 if (app.locals.domain(data).indexOf('soundcloud') != -1) scname = data.split('http://www.soundcloud.com/');
                                 if (app.locals.domain(data).indexOf('youtube') != -1) ytname = data.split('http://www.youtube.com/user/');
                                 
                                 
                            });
                            
                            
                            
                            if (datax.indexOf('spotify') == -1) missing.push('spotify');
                            if (datax.indexOf('last') == -1) missing.push('last');
                            if (datax.indexOf('pandora') == -1) missing.push('pandora');
                            if (datax.indexOf('rdio') == -1) missing.push('rdio');


                            site.set('foundNetworks', datax);
                            site.set('missingNetworks', missing); 

                            //res.send(networkurls);
                            //res.send(missing);
                            
                          

                            site.save(null, {
                                 success: function(sited) {              
                                     
                                     
                                        Parse.Cloud.run("traverseAccounts", {
                                            siteid: sited.id,
                                            igname: igname[1], 
                                            ytname: ytname[1],
                                            scname: scname[1]
                                           }, 
                                           {
                                           success: function(e){
                                            res.send(e);
                                           }, error: function(e){
                                            res.send(e);
                                           }
                                          }); 
                                       
                                    
                                     
                                     
                                    
                                 },

                                 error: function(user, error) {
                                    
                                     res.send("Error: " + error.code + " " + error.message);
                                 }
                            });
                  }//success
            });//http request



        },
        error: function(p,error){
            res.send('cant first artist account');
       }
       });            

});





Parse.Cloud.afterSave("Insights", function(req, res) {

    


    switch(req.object.get('filename'))
    {
        case 'recap':
            //var msg = JSON.stringify(req.object.get('data'));
            
            
            var vhtml = '';

            var clrs = {
                Facebook: '#3b5998',
                Wikipedia:'#898989',
                Twitter: '#2696ba',
                YouTube:'#ae2a25',
                Vevo:'#ff2600',
                Soundcloud:'#ff7700',
                Instagram:'#39688e',
                Rdio: '#008fd5',
                Lastfm: '#c3000d'
            }

            var x = req.object.get('data');

            for (var key in x) {
                   if (x.hasOwnProperty(key)) {

                       vhtml += '<tr style="color:'+clrs[key]+'"><td style="padding:5px 8px;"><img src="https://www.nextbigsound.com/images/less/icons_newsocial/largemetrics/icon_'+key.toLowerCase()+'26.png"></td><td>'+key+'</td><td>&nbsp;</td><td>'+JSON.stringify(x[key])+'</td></tr>';


                   }
               }

            var msg = '<![CDATA[<table style="80%; display:block; margin:auto;">'+vhtml+'</table>]]>';
           
            break;
            
         case 'pressmention':
             
             var vhtml = '<table><tr><td><img src="'+req.object.get('imagepreview')+'"></td><td><h2>'+req.object.get('mention_title')+'</h2><a href="'+req.object.get('url')+'">View</a></td></table>'
             var msg = '<![CDATA[<table style="80%; display:block; margin:auto;">'+vhtml+'</table>]]>';
           
            break;    
            
    }

    
    

    var xmlData = '<CustomModule1> <row no="1"> <FL val="CustomModule1 Name">'+req.object.get('headline')+'</FL>  <FL val="Message">'+msg+'</FL> <FL val="Type"><![CDATA['+req.object.get('filename')+']]></FL> </row> </CustomModule1>';

    console.log(xmlData);
    
    Parse.Cloud.httpRequest({
        method: "POST",
        body:{
            xmlData: xmlData
        },
       
        url: "https://crm.zoho.com/crm/private/xml/CustomModule1/insertRecords?authtoken=c4bc58066b00c0c1f74adec91f10a206&scope=crmapi&newFormat=1&wfTrigger=true",
        success: function(httpResponse) 
            {
                console.log(httpResponse);
            }
    });
    
                                          var later = new Date();
                                          
    
                                          if (req.object.get('filename') != 'pressmention') later.setMinutes(later.getMinutes() + (10*later.getSeconds()));

                                          /*
                
                                           var queryx = new Parse.Query(Parse.Installation);
                                           queryx.equalTo('deviceType', 'ios');
                                           Parse.Push.send({
                                            where: queryx, 
                                            //push_time: later,       
                                            data: {
                                               alert: req.object.get('appHeadline'),
                                            }
                                                }, { success: function(e) { 

                                                    console.log(e);
                                                    res.success();

                                                }, error: function(err) { 

                                                     console.log(err);
                                                }
                                          });

                                          */
    

});



Parse.Cloud.beforeSave("AnalyticsContent", function(req, res) {
  
   var Content = Parse.Object.extend('AnalyticsContent');
   var query = new Parse.Query(Content);
    
     console.log('looking at this id:'+req.object.get('contentid'));
    
     query.equalTo('contentid',req.object.get('contentid'));
    
     query.first({
          success: function(content) {
              
              console.log('------------>Analytics Content');
              
              if(!content){   
                   res.success();
              } else {
                  res.error();
              }
              
          },
          error: function(e, c){
               
               
          }
     });
  
  
});


Parse.Cloud.afterSave("Analytics", function(req, res) {
  
 
  if (req.object.get('metric') == 'similar')
  {
      
    var Websites = Parse.Object.extend('Websites');
    var query = new Parse.Query("Websites");
    
     query.get(req.object.get('siteid'), {
          success: function(site) {
              
                var Insights = Parse.Object.extend('Insights');
                var insight = new Insights();

                     var similars = new Array();

                      _.each(req.object.get('valueObj'), function(data) {
                            similars.push(data.name);
                       });

                     insight.set('headline', "Based on "+ site.get('sitename') +"'s visibility, here are similar artists: " +  similars.toString());
                     insight.set('filename', 'similar');   
                     insight.set('site', req.object.get('site'));
                     insight.set('siteId', req.object.get('siteid'));

                     insight.set('appHeadline', "Based on "+ site.get('sitename') +"'s visibility,here are similar artists: " +  similars.toString());

                insight.save();
              
          }
     });
     
  }  
    
    
  //maintain a summary class for all content to streamline analysis
  if (req.object.get('metric') == 'content')
  {
           var Content = Parse.Object.extend('AnalyticsContent');
           var content = new Content();
           
           content.set('title', req.object.get('title'));
           content.set('network', req.object.get('network'));
           content.set('site', req.object.get('site'));
           content.set('publishedAt', req.object.get('published_at'));
           content.set('contentid', req.object.get('contentid'));
           content.set('views', req.object.get('playback_count'));
           content.set('views1', null);
           content.set('views7', null);
           content.set('views30', null);
           
           content.save();
  }
  
  
  
  
  
  if (req.object.get('metric') == 'mention')
      {
          
          console.log('getting preview image');
          
          
          
          var ukey = req.object.get('mention_url'); 	
          var url = 'http://api.embed.ly/1/extract?key=c8fce371e1464bd8b1dc872ed60fe589&url='+escape(ukey)+'&maxwidth=500';

          Parse.Cloud.httpRequest({
                     method: "GET",
                     headers: {
                         'Content-Type': 'application/json'
                     },
                         url: url,

                     success: function(httpResponse) 
                     {
                          var x = httpResponse.text;
                          
                          x = JSON.parse(x);
                          
                          
                          console.log(x.images[0].url);
                          
                          req.object.set('imagepreview',  x.images[0].url);
                          req.object.save();
 
                     }
          });
      }
  
  
   
      
      
});






app.get('/login', function(req, res) {
    res.render('admin/login.ejs', {
        user: null
    });
  });

  
  app.get('/signup/:id', function(req, res) {
   
      res.render('admin/signup.ejs',{
        user: null,
        affiliate: req.params.id
    });
   
  
  });  
  

  
app.get('/user/audit/:id', function(req, res){
   
     
      
    var Websites = Parse.Object.extend('Websites');
    var query = new Parse.Query("Websites");
    
     query.get(req.params.id, {
          success: function(site) {
              uris = site.get('networkUrls');
             
              var datax = new Array();
              var missing = new Array();
              
              _.each(uris, function(data) {
                   datax.push(app.locals.domain(data));
              });
              
              if (datax.indexOf('spotify') == -1) missing.push('spotify');
              if (datax.indexOf('last') == -1) missing.push('last');
              if (datax.indexOf('pandora') == -1) missing.push('pandora');
              if (datax.indexOf('rdio') == -1) missing.push('rdio');
             
              
              res.send(missing);
          },
          error: function(user, error){
      
          }
     });
      
    
});
  
  
  

  

  
  
  
  
  
  
  
  
  
  
  //Change SoundClound Name into SC ID
  //http://api.soundcloud.com/resolve.json?client_id=bce52676d0d792ac0f0fce48662a11d7&url=http://soundcloud.com/therealjustivy
 app.get('/sc/:url', function(req, res){
     
        sc.resolve({
          url: 'http://soundcloud.com/'+req.params.url,
         
        }).then(function(httpResponse) {
        
           var path = httpResponse.data.location;
           res.send(path);
          
        },
        function(httpResponse) {

          var path = httpResponse.data.location;
           res.send(path);
        });
      
  });
  
  //Use SC ID to get channel contents
  app.get('/sc/channel/:id', function(req, res){
     
        sc.showContent({
          id: req.params.id,
         
        }).then(function(httpResponse) {
        
           res.send(httpResponse);
          
        },
        function(error) {

          res.send(error);
        });
      
  });
  
  
  //Use SC ID to get tracks
  app.get('/sc/tracks/:id', function(req, res){
     
        sc.showTracks({
          id: req.params.id,
         
        }).then(function(httpResponse) {
        
           res.send(httpResponse);
          
        },
        function(error) {

          res.send(error);
        });
      
  });
  
  
  
   //Change Youtube Name into Youtube Channel ID
  app.get('/yt/:name', function(req, res){
     
        yt.searchUserChannel({
          q: req.params.name,
          type: 'channel',
          part: 'snippet'
        }).then(function(httpResponse) {
          
           var id = httpResponse.data.items[0].id.channelId;
           res.send(id);
          
        },
        function(error) {
          res.send(error);
        });
      
  });
  
  
  
  //Return Channel Details from YT ID
  app.get('/yt/channel/:channelid', function(req, res){
     
        yt.showChannel({
          id: req.params.channelid,
          part: 'snippet,contentDetails,statistics,status'
        }).then(function(httpResponse) {
          
            var id = httpResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
            res.send(id);
          
        },
        function(error) {
          res.send(error);
        });
      
  });
  
  
    //Return Channel Content from YT ID
  app.get('/yt/content/:playlistid', function(req, res){
     
        yt.showContents({
          playlistId: req.params.playlistid,
          part: 'snippet,contentDetails,status'
        }).then(function(httpResponse) {
          
            res.send(httpResponse.data);
          
        },
        function(error) {
          res.send(error);
        });
      
  });
  

   



Parse.Cloud.define("traverseAccounts", function(req, res) {
  
    var Websites = Parse.Object.extend('Websites');
    var query = new Parse.Query(Websites);
    
    query.get(req.params.siteid, {
        success: function(site) {
          
           console.log('found site... checking ig user...');
          
          
            ig.searchUser({
                q: req.params.igname,
                count: '3'
              }).then(function(httpResponse) {

              

                  var id = httpResponse.data.data[0].id;
                  console.log('found ig user...'+id);
                  site.set('igID', id);
                  site.save();

              });
            
            
            
            console.log('checking sc...');
                  
                  sc.resolve({
                    url: 'http://soundcloud.com/'+req.params.scname,

                  }).then(function(httpResponse) {
        
                    var path = httpResponse.data.location;
                    res.send(path);

                 }, function(httpResponse) {

                   console.log('returned sc...');

                     var path = httpResponse.data.location;

                      var pp = path.split('users/');
                      var pp = pp[1].split('.');



                      site.set('scID', pp[0]);
                      console.log('found sc user...'+ pp[0]);
                      site.save();
                 });

                   

                 
            
            
         yt.searchUserChannel({
          q: req.params.ytname,
          type: 'channel',
          part: 'snippet'
        }).then(function(httpResponse) {
          
          
         
          
           var id = httpResponse.data.items[0].id.channelId;
           console.log('found yt user...'+id);
           site.set('ytID', id);
           site.save();
           
           
           console.log('found yt channel...');
         
         
            yt.showChannel({
             id: id ,
             part: 'snippet,contentDetails,statistics,status'
           }).then(function(httpResponse) {

              

               var id = httpResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
               site.set('ytUploadsID', id);
               console.log('found yt channel...'+id);
               site.save();

           },
           function(error) {
             res.send(error);
           }); 
            
        }); 
            
            
        }, //query success
        error: function(site) {

        }
     });
    
       
      
          
    
    
}); 







  
  

  
  //Change Instagram Name into Instagram ID
  app.get('/ig/:name', function(req, res){
     
        ig.searchUser({
          q: req.params.name,
          count: '3'
        }).then(function(httpResponse) {
          
            var id = httpResponse.data.data[0].id;
            res.send(id);
          
        },
        function(error) {
          res.send(error);
        });
      
  });
  
 
  //Use Instagram ID to look Instagram Content of a user  
    app.get('/ig/content/:id', function(req, res){
     
     
        ig.getRecentMediaByUser(req.params.id, {
            
        }).then(function(httpResponse) {
          
            res.send(httpResponse.data);
          
        },
        function(error) {
          res.send(error);
        });
     
        
      
  });
  

  
  

  app.post('/login', function(req, res) {
    Parse.User.logIn(req.body.username, req.body.password).then(function() {
        
        //res.send(typeof Parse.User.current().get('artist'));
        user = Parse.User.current();
     var relation = user.relation("sites");
     relation.query().find({
         
         success: function(sites){
           if(sites){
               
               
               var user = Parse.User.current();
                    var relation = user.relation("sites");
                    relation.query().find({
                            success: function(sites) {
                                
                                if (sites.length != 0) { res.cookie('site', sites[0].id); }
                                res.redirect('/stats');
                                
                            },
                            error: function(error) {
                                   res.send(error);
                            }
                    });
          

                } else {
                  res.redirect('/launch');

           }
           
          },
          error: function(sites, error){
            res.error(error);
          }
     });
     
     /*
        
      if (typeof Parse.User.current().get('artist') != 'undefined' )
      {
          
          
          
          
        
        */
        
    },
    function(error) {
      res.send(error);
    });
  });

  app.get('/logout', function(req, res) {
    Parse.User.logOut();
    res.redirect('/login');
  });




app.get('/token/:id', checkauth, function(req, res){
   
  
   
   switch(req.params.id)
   {
       
       case 'google':
            saveobj = new Array();
            var Accounts = Parse.Object.extend('Accounts');
            account = new Accounts();
            account.set('platform', 'google');
            account.set('user', Parse.User.current());
            account.set('code', req.url.split('?code=')[1]);
            account.set('property', 'ga:74978815');
            account.save();
            res.send('done');
           break;
           
   }
   
   
    
});




//http://urls.api.twitter.com/1/urls/count.json?url=www.vibe.com/article/new-video-just-ivy-feat-meek-mill-and-dj-khaled-bad-girl-takeover
//{"count":6,"url":"http:\/\/www.vibe.com\/article\/new-video-just-ivy-feat-meek-mill-and-dj-khaled-bad-girl-takeover\/"}


//https://graph.facebook.com/?ids=http://www.vibe.com/article/interview-lil-boosie-pioneering-ratchet-sound-and-why-he-done-drugs
/*
 * {
   "http://www.vibe.com/article/interview-lil-boosie-pioneering-ratchet-sound-and-why-he-done-drugs": {
      "id": "http://www.vibe.com/article/interview-lil-boosie-pioneering-ratchet-sound-and-why-he-done-drugs",
      "shares": 8,
      "comments": 1
   }
}
 */


















// Signs up a new user
/*
  app.post('/signup', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var user = new Parse.User();
    user.set('username', username);
    user.set('email', username);
    user.set('password', password);
    
    user.set('analytics', false);
    user.set('web', true);
    user.set('settings', true);
    user.set('promo', false);
    
    
   
   
    
    user.signUp().then(function(user) {
    
       
         
         
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
                                         {
                                             "name": "inviteAccount",
                                             "content": site.get('sitename')
                                         },
                                         {
                                             "name": "inviteUsername",
                                             "content": user[0].getUsername()
                                         },
                                         {
                                             "name": "invitePwd",
                                             "content": "12345"
                                         },

                                     ],
                                     from_email: "nicole@redtapedesign.com",
                                     from_name: "RedTapeX",
                                     track_opens: true,
                                     track_clicks: true,

                                     "message": {
                                         "to": [
                                             {
                                                 "email": x,
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
                        
                    

           
        
    
    
    
    }, function(error) {
      // Show the error message and let the user try again
       res.send(error.message);
       //res.render('signup', { flash: error.message });
    });
  });
*/


app.post('/sendInsight', function(req, res){

    var site = req.cookies.site;
    user = Parse.User.current();
    
    console.log(site);
    console.log(user.getUsername());
    console.log(req.body.email);
    
    Mandrill.sendEmail({
                    message: {
                     html: '<html> <head> <title></title> </head> <body> '+user.getUsername() +'   shared some cool insights about   '+site+'<br> http://fuccyocms.parseapp.com/  to check it out  <br><br>'+req.body.msg+'</body> </html> ',
                     subject: user.getUsername() + "  shared some cool "+ site + ' data',
                     from_email: user.getUsername() ,
                     from_name: user.getUsername(),
                     track_opens: true,
                     track_clicks: true,
                     to: [
                       {
                         email:req.body.email
                        },

                       ],
                      },
                      async: true
                      },{
                      success: function(httpResponse) {
                           //console.log(httpResponse);
                           //res.send(user);
                           res.redirect('/stats');

                      },
                           error: function(httpResponse) {
                             console.error(httpResponse);
                             res.send("Uh oh, something went wrong");
                      }
                  });
       

});





Parse.Cloud.job("processAccountsRecap", function(request, status) {   
    
    // status.success("Data Recorded successfully.");
    
    Parse.Cloud.useMasterKey(); 
        var Websites = Parse.Object.extend('Websites');
       
         var query = new Parse.Query(Websites);

         query.each(function(site) {



                                     status.message('Processing: ' + site.get('sitename'));

                                     var Analytics = Parse.Object.extend('Analytics');
                                     var queryi = new Parse.Query(Analytics);
                                     //queryi.descending(recordDate);
                                     queryi.equalTo('site', site);
                                     queryi.limit(1000);
                                     queryi.descending('recordDate');
                                     
                                     
                                     queryi.find().then(function(rawData) {
                                         
                                            
                                            var data = new Object();
                                         
                                             _.each(rawData, function(raw){
                                                 
                                                 if (typeof raw.get('network') != 'undefined')
                                                     {
                                                         
                                                         var networkname =  raw.get('network').replace('.', '');
                                                         
                                                         
                                                          if(typeof data[networkname] == 'undefined') data[networkname] = new Object();
                                                         
                                                          if(typeof data[networkname][raw.get('metric')] == 'undefined') data[networkname][raw.get('metric')] = new Object();
                                                 
                                                           data[networkname][raw.get('metric')] = raw.get('value');
                                                          
                                                         
                                                           
                                                     
                                                     }
                                                 
                                               
                                                 
                                             });
                                         
                                           
                                         
                                           
                                           var Insight = Parse.Object.extend('Insights');
                                           var prof = new Insight();
                                           
                                           
                                           
                                           prof.set('filename', 'recap');
                                           prof.set('headline', 'The recap report for ' + site.get('sitename'));
                                           prof.set('data', data);
                                           prof.set('site', site);
                                           prof.set('siteId', site.id);
                                           
            
                                            var vhtml = '<img src="http://files.parse.com/fd1eba61-8ee1-4ca8-86c7-4d83480d2639/924619ed-989f-4730-824b-b341817c6780-photo.jpg" style="width:100%">';

                                            var clrs = {
                                                Facebook: '#3b5998',
                                                Wikipedia:'#898989',
                                                Twitter: '#2696ba',
                                                YouTube:'#ae2a25',
                                                Vevo:'#ff2600',
                                                Soundcloud:'#ff7700',
                                                Instagram:'#39688e',
                                                Rdio: '#008fd5',
                                                Lastfm: '#c3000d'
                                            }

                                            var x = data;

                                            for (var key in x) {
                                                   if (x.hasOwnProperty(key)) {

                                                       vhtml += '<tr style="color:'+clrs[key]+'"><td style="padding:5px 8px;"><img src="https://www.nextbigsound.com/images/less/icons_newsocial/largemetrics/icon_'+key.toLowerCase()+'26.png"></td><td>'+key+'</td><td>&nbsp;</td><td>'+JSON.stringify(x[key])+'</td></tr>';


                                                   }
                                               }


                                            prof.set('appHeadline', 'Your Weekly Recap');
                                            prof.set('markup', vhtml);
            
       
                                          
                                          
                                           
                                           prof.save(null, {
                                            success: function(insi) {
                                              // Execute any logic that should take place after the object is saved.
                                             
                                              status.message('New insight created with objectId: ' + insi.id);
                                            },
                                            error: function(insi, error) {
                                              // Execute any logic that should take place if the save fails.
                                              // error is a Parse.Error with an error code and description.
                                              console.log('Failed to create new object, with error code: ');
                                              console.log(error);
                                            }
                                          });
                                           
                                           
                                           //res.send(JSON.stringify(data));
                                            
                                            
                                     
                                 
                         
                   });
                       //status.success("Insights Generated successfully.");
                   
         });
    
    
    
});








app.get('/endOfWeekRecap', function(req, res){
    
   emailData = new Array(); 
    
   Parse.Cloud.useMasterKey(); 
   var Websites = Parse.Object.extend('Websites');
   var EmailQueue = Parse.Object.extend('EmailQueue');

    var query = new Parse.Query(Parse.User);

    query.each(function(user) {

        
        console.log('Looking at...'+ user.getUsername());

         var relation = user.relation("sites");
              relation.query().find({
                    success: function(sites) { 
                        
         
                         
                        
                         _.each(sites, function(site){
                             
                                
                             
                              
                                var Insights = Parse.Object.extend('Insights');
                                var queryi = new Parse.Query(Insights);
                               
                                queryi.find().then(function(artistInsights) {
                                    
                                   
                                    console.log('Getting Insights for site...'+site.get('sitename'));
                                    console.log(typeof emailData[site.get('sitename')] );
                                    
                                    if (typeof emailData[site.get('sitename')] == 'undefined') emailData[site.get('sitename')] = new Array();
                                    if (typeof emailData[site.get('sitename')]['emails'] == 'undefined') emailData[site.get('sitename')]['emails'] = new Array();
      
                                    emailData[site.get('sitename')]['emails'].push(user.getUsername());
                                    
                                    if (typeof emailData[site.get('sitename')]['data'] == 'undefined') {
                                        emailData[site.get('sitename')]['data'] = new Array();
                                          
                                        _.each(artistInsights, function(data){
                                              emailData[site.get('sitename')]['data'].push(data.get('filename')+ ' '+data.get('headline'));
                                        });
                                        
                                   
                                       
                                   
                                    }
                                   
                                   Mandrill.sendEmail({
                                                message: {
                                                 html: '<html> <head> <title></title> </head> <body> <h1>This Weeks Recap for '+ site.get('sitename') +'</h1><hr><p>'+emailData[site.get("sitename")]["data"].toString()+'</p></body> </html> ',
                                                 subject: "Weekly Recap for "+ site.get('sitename'),
                                                 from_email: "ryan@redtapedesign.com",
                                                 from_name: "X",
                                                 track_opens: true,
                                                 track_clicks: true,
                                                 to: [
                                                   {
                                                     email:user.getUsername()
                                                    },

                                                   ],
                                                  },
                                                  async: true
                                                  },{
                                                  success: function(httpResponse) {
                                                       //console.log(httpResponse);
                                                       //res.send(user);
                                                      // res.redirect('/settings');
                                                      console.log(httpResponse);
                                                  },
                                                       error: function(httpResponse) {
                                                   
                                                         console.log(httpResponse);
                                                         //res.send("Uh oh, something went wrong");
                                                  }
                                              });
                                              
                                              
                                   
                                    
                                     
                                    
                                });
                             
                            
                             
                            
                         })
                        
                    }
              });
   

           

     });
    
});


app.get('/GatherInsights', function(req, res){


    
  
   Parse.Cloud.httpRequest({
      method: "POST",  
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        'email': 'ryan@redtapedesign.com',
        'pwd': '12345'
      },
      url: 'http://redtapedesign.com/reach/dashboard/lib/insightsgenerator.php',
      success: function(data) {

        var x = JSON.parse(data.text);
        
        
        
        var saveInsights = new Array();
        var Insight = Parse.Object.extend('Insights');
       
        
         var cb = _.after(x.length, function(){
            
             console.log('saving insights...');
             console.log(saveInsights);
             console.log('-----');
             
             /*
             Parse.Object.saveAll(saveInsights, {
                success: function(obj) {
                  res.send(obj);
                },
                  error: function(error) {
                  console.error(error);
                }
              })
              */
        });
        
        
        _.each(x, function(xxx){
             
            var sstat = new Insight(); 
           
            sstat.set('instance_id',xxx.instance_id);
            sstat.set('slug', xxx.slug);
            sstat.set('headline', xxx.headline);
            sstat.set('text', xxx.text);
            sstat.set('related_data', xxx.related_data);
            sstat.set('header_image', xxx.header_image);
            sstat.set('date', new Date(xxx.date));
            sstat.set('emphasis', xxx.emphasis);
            sstat.set('filename', xxx.filename);
            sstat.set('time_generated', new Date(xxx.time_generated));
            sstat.set('time_updated', new Date(xxx.time_updated));
            sstat.set('instance', xxx.instance);
            sstat.set('network_user_id', xxx.instance.network_user_id);
            sstat.set('total_posts_by_owner', xxx.instance.total_posts_by_owner);
            sstat.set('total_posts_in_system', xxx.instance.total_posts_in_system);
            sstat.set('total_replies_in_system', xxx.instance.total_replies_in_system);
            sstat.set('total_follows_in_system', xxx.instance.total_follows_in_system);
            sstat.set('posts_per_day', xxx.instance.posts_per_day);
            sstat.set('posts_per_week', xxx.instance.posts_per_week);
            sstat.set('percentage_replies', xxx.instance.percentage_replies);
            sstat.set('percentage_links', xxx.instance.percentage_links);
       
            sstat.save();
            //saveInsights.push(sstat);
            cb();
        });
        
        
        

       
        

        

       
        
       
        

      },
      error: function(data) {
        console.error('Request failed with response code ' + httpResponse.status);
      }
    });


    
});




app.get('/cookie', function(req, res){
 res.cookie('test', 'x');
   
  var cookies = req.cookies.site;
    var signedCookies = req.signedCookies;
   
   console.log(cookies);
   console.log(signedCookies);
   
  res.send('.');
  
});


app.post('/invite', function(req, res){
   
   Parse.Cloud.useMasterKey(); 
   
   var sitex = req.cookies.site;
   
   
    querysite = new Parse.Query("Websites");
    querysite.get(sitex, {
          success: function(site) {
   
   
                var x = req.body.emails;
                addy = x.split(',');
                _.each(addy, function(x){

                    //check if user exsits



                    var query = new Parse.Query(Parse.User);

                     query.equalTo('email', x);
                     query.find({
                       success: function(user) {
                         // results is an array of Parse.Object.

                         console.log('looked for user...');

                         if (user.length != 0) {

                             console.log('exsiting user....');

                             console.log('the conncetion link is: http://fuccyocms.parseapp.com/addsite/'+site+'/'+user[0].id);


                             Parse.Cloud.httpRequest({
                                method: 'POST',
                                 headers: {
                                  'Content-Type': 'application/json',
                                 },
                                 url: 'https://mandrillapp.com/api/1.0/messages/send-template.json',
                                 body:{
                                      "key": "U44Xj-B8lA55D4qHN_5tng",
                                     template_name: "user-invite-to-account",
                                     template_content: [
                                         {
                                             "name": "inviteAccount",
                                             "content": site.get('sitename')
                                         },
                                         {
                                             "name": "inviteUsername",
                                             "content": user[0].getUsername()
                                         },
                                         {
                                             "name": "invitePwd",
                                             "content": "12345"
                                         },

                                     ],
                                     from_email: "ryan@redtapedesign.com",
                                     from_name: "X",
                                     track_opens: true,
                                     track_clicks: true,

                                     "message": {
                                         "to": [
                                             {
                                                 "email": x,
                                              }
                                               ]
                                                     }},

                                  success: function(httpResponse) {
                                        console.log(httpResponse);
                                        //res.send(user);
                                        res.redirect('/settings');

                                   },
                                        error: function(httpResponse) {
                                          console.error(httpResponse);
                                          res.send("Uh oh, something went wrong");
                                   }

                                 });








                         } else {


                             var username = x;
                             var password = '12345';

                             var user = new Parse.User();
                             user.set('username', username);
                             user.set('email', username);
                             user.set('password', password);

                             Parse.Cloud.useMasterKey(); 

                             user.signUp().then(function(userb) {

                                      console.log('new user....');
                                      console.log('the conncetion link is: http://fuccyocms.parseapp.com/addsite/'+site+'/'+userb.id);
                                       console.log(userb);

                                       var Website = Parse.Object.extend('Websites');
                                       var sitequery = new Parse.Query(Website);
                                       sitequery.get(site).then(function(site) {


                                           var relation = userb.relation("sites");
                                                 relation.add(site)

                                                   userb.save(null, {
                                                     success: function(userc) {              


                                                        //NEW USER
                                                         Mandrill.sendEmail({
                                                             message: {
                                                              //html: '<html> <head> <title></title> </head> <body> You have been invited to '+site+'<br> http://fuccyocms.parseapp.com/addsite/'+site+'/'+user[0].id+'</body> </html> ',
                                                             subject: "You have been granted access to the "+ site.get('sitename') + " account RedTapeX",
                                                             template_name: "user-invite-to-account",
                                                             template_content: [
                                                                    {
                                                                        "name": "inviteAccount",
                                                                        "content": site.get('sitename')
                                                                    },
                                                                    {
                                                                        "name": "inviteUsername",
                                                                        "content": userb.getUsername()
                                                                    },
                                                                    {
                                                                        "name": "invitePwd",
                                                                        "content": "12345"
                                                                    },

                                                                ],
                                                              from_email: "ryan@redtapedesign.com",
                                                              from_name: "You have been given access to "+site.get('sitename'),
                                                              track_opens: true,
                                                              track_clicks: true,
                                                              to: [
                                                                {
                                                                  email:x
                                                                 },

                                                                ],
                                                               },
                                                               async: true
                                                               },{
                                                               success: function(httpResponse) {
                                                                    //console.log(httpResponse);
                                                                    //res.send(user);
                                                                    res.redirect('/login');

                                                               },
                                                                    error: function(httpResponse) {
                                                                      console.error(httpResponse);
                                                                      res.send("Uh oh, something went wrong");
                                                               }
                                                           });


                                                     },

                                                     error: function(userc, error) {
                                                         alert("Error: " + error.code + " " + error.message);
                                                     }
                                                });



                                       });




                             });



                         }

                       },

                       error: function(error) {
                         // error is an instance of Parse.Error.
                         res.send(error);
                       }
                     });



                });    
    
          } //found site
    }); //site query
    
});


app.get('/api/:id', postsController.indexApi);
app.get('/api/shop/:id/:token', postsController.shopApi);
app.get('/api/item/:id/:token', postsController.showApi);


app.get('/', trakr , postsController.index);


app.get('/faq', function(req, res){
   res.render('web/faq'); 
});

app.get('/blog', function(req, res){
   res.render('web/blog'); 
});


app.get('/changesite/:id', function(req, res){
     res.cookie('site', req.params.id);
     res.redirect('/admin');
});

app.get('/addsite/:id/:uid', function(req, res){
   
   
   /*
   //after a new user is created, issue a new password
   Parse.User.requestPasswordReset("email@example.com", {
        success: function() {
            // Password reset request was sent successfully
        },
        error: function(error) {
            // Show the error message somewhere
            alert("Error: " + error.code + " " + error.message);
        }
    });
   */
  
   Parse.Cloud.useMasterKey(); 
  
   console.log('Adding User:'+ req.params.uid);
  
   
    var query = new Parse.Query(Parse.User);
        //req.params.uid
       query.get(req.params.uid, {
          success: function(user) {
            // results is an array of Parse.Object.
            if (user) {
                
                console.log(user);
                
                 var Sites = Parse.Object.extend("Websites");
                    var querya =  new Parse.Query(Sites);
                    querya.get(req.params.id, {
                      success: function(site) {

                          var relation = user.relation("sites");
                            relation.add(site);
                            user.save(null, {
                                success: function(){
                                   res.redirect('/admin');
                                },
                                error: function(site, error){
                                     console.log(error);
                                    res.send(error);
                                }
                              });

                      }

                    });
                    
            }//if user
            
          },
          error: function(error){
      
            res.send(error);
      
          }
          
        });
          
   
   
   

   


   
   

   
    
});


/*
app.get('/',function(req, res){
  res.send('Resolved and pulling site for ... ' + JSON.stringify(req.headers.host));
});
*/

app.get('/shop', trakr, postsController.shop);





// RESTful routes for the blog post object.
//app.get('/posts', trakr, postsController.index);
app.get('/x/:id', trakr, postsController.show);
app.get('/x/:id/:url', trakr, postsController.show);


app.get('/promo', checkauth, promoController.index);
app.get('/getstarted', checkauth, settingsController.getStarted);
app.get('/launch', checkauth, settingsController.launch);
app.get('ineed', checkauth, settingsController.ineed);

app.get('/email', checkauth, emailController.index);
app.get('/fans', checkauth, emailController.fan);


app.post('/onboardUsr', settingsController.onboardUsr);
app.post('/needs', checkauth, settingsController.needs);


app.post('/order', checkauth, promoController.checkout);

app.get('/new', checkauth, postsController.new);
app.post('/posts', checkauth, postsController.create);
app.get('/posts/:id/edit', checkauth, postsController.new);
app.put('/posts/:id', checkauth, postsController.update);
app.del('/posts/:id', checkauth, postsController.delete);


app.get('/edit/:id', checkauth, postsController.editLatestPostWithCustomTemplate);
app.get('/new/:id', checkauth, postsController.newLatestPostWithCustomTemplate);
app.get('/newContent/:type/:id', checkauth, postsController.newLatestPostWithCustomTemplateFlex);


//AJAX Routes
app.get('/ajax/:id', promoController.ajaxSocial);



app.get('/payment', checkauth, settingsController.payment);


app.post('/processSubscription', checkauth, function(req, res){
   
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here https://manage.stripe.com/account
    //stripe.setApiKey("sk_test_XZSuJhVGykYAmhzRiek41goQ");

    // (Assuming you're using express - expressjs.com)
    // Get the credit card details submitted by the form
   

    Stripe.Customers.create({
      card: req.body.stripeToken,
      plan: "123456",
      email: Parse.User.current().getUsername(),
    }, function(err, customer) {
      console.log(err);
      console.log(customer);
      
    }).then(function(e){
        console.log(e);
        
        user = Parse.User.current();
        
        var xmlData = '<SalesOrders> <row no="1"> <FL val="Subject"><![CDATA[Monthly Subscription Plan]]></FL><FL val="ACCOUNTID">490340000004362001</FL><FL val="Account Name"><![CDATA[Artist Name]]></FL><FL val="Sub Total"><![CDATA[99]]></FL><FL val="Product Details"><product no="1"><FL val="Product Id">490340000004345035</FL><FL val="Product Name"><![CDATA[RedTape X Subscription]]></FL><FL val="Unit Price">0.0</FL><FL val="Quantity">1.0</FL><FL val="Quantity in Stock">0.0</FL><FL val="Total">99.0</FL><FL val="Discount">0.0</FL><FL val="Total After Discount">99.0</FL><FL val="List Price">99.0</FL><FL val="Net Total">99.0</FL><FL val="Tax">0.0</FL></product></FL> </row> </SalesOrders>';

            
        console.log(xmlData);

        Parse.Cloud.httpRequest({
            method: "POST",
            body:{
                xmlData: xmlData
            },

            url: "https://crm.zoho.com/crm/private/xml/SalesOrders/insertRecords?authtoken=c4bc58066b00c0c1f74adec91f10a206&scope=crmapi&newFormat=1&wfTrigger=true",
            success: function(httpResponse) 
                {
                    res.redirect('/stats');
                    //res.send(httpResponse);
                }
        });
        
        
        
    });
    
});






app.get('/site/:id', trakr, postsController.site);
app.get('/preview/:obj/:clr', trakr, postsController.sitePreview);

app.get('/build', checkauth, postsController.build);

//app.get('/setupsite/:obj/:clr', checkauth, postsController.setupSiteLayoutCms);
app.post('/setupsite', checkauth, postsController.setupSiteLayoutCmsPost);


app.get('/newsite', checkauth, postsController.newWebsite);
app.post('/createSite', checkauth, postsController.createWebsite);




// RESTful routes for the blog comment object, which belongs to a post.
app.post('/posts/:post_id/comments', commentsController.create);
app.del('/posts/:post_id/comments/:id', checkauth, commentsController.delete);

// Route for admin pages
app.get('/admin', checkauth, adminController.index);
app.get('/admin/posts', checkauth, adminController.index);
app.get('/admin/comments', checkauth, commentsController.index);


app.get('/newproduct', checkauth, postsController.newProduct);
app.get('/newak', checkauth, postsController.newAk);



app.get('/areas', checkauth, contentController.index);
app.get('/settings', checkauth, settingsController.index);
app.get('/social', checkauth, statsController.socialstats);
app.get('/stats', checkauth, statsController.index);


app.post('/api/stats/:sid', statsController.apiGet);
app.get('/api/stats/:sid', statsController.apiGet);



app.get('/newarea', checkauth, contentController.new);

app.get('/newconfig', checkauth, contentController.newConfig);
app.get('/newgallery', checkauth, contentController.newGallery);

app.post('/contentarea', checkauth, contentController.create);
app.del('/contentarea/:id', checkauth, contentController.delete);


app.get('/insights', insightsModel.generate);



app.post('/pay', function(req, res) {
  var order = new models.Order()
    , token = null;

  for (param in models.Order.schema) {
    order.set(param, req.body[param]);
  }

  // Coerce to a string out of paranoia
  Stripe.Tokens.retrieve(req.body.stripe_token + '').then(function(result) {
    token = result
    if (!token.email) {
      return Parse.Promise.error('You did not provide an email address.\n');
    }

    order.set('email', token.email);
    order.set('state', 'unpaid');
    return order.save();
  }).then(function(order) {
    return Stripe.Customers.create({
      description: order.get('name'),
      email: token.email,
      card: token.id
    })
  }).then(function(customer) {
    return Stripe.Charges.create({
      amount: order.calculateAmount(),
      description: order.get('name') +
        ' <' + order.get('email') + ' > - Shop T-Shirt Order',
      currency: 'usd',
      customer: customer.id
    });
  }).then(function(charge) {
    order.set('charge_id', charge.id);
    order.set('state', 'paid');
    return order.save();
  }).then(function(order) {
    res.send('Success!\n');
  }, function(error) {
    console.log(error);
    res.send(400, error.message + '\n');
  })
});


// Required for initializing Express app in Cloud Code.
app.listen();

















Parse.Cloud.define('getGitHubData', function(request, response) {
  if (!request.user) {
    return response.error('Must be logged in.');
  }
  var query = new Parse.Query(TokenStorage);
  query.equalTo('user', request.user);
  query.ascending('createdAt');
  Parse.Promise.as().then(function() {
    return query.first({ useMasterKey: true });
  }).then(function(tokenData) {
    if (!tokenData) {
      return Parse.Promise.error('No GitHub data found.');
    }
    return getGitHubUserDetails(tokenData.get('accessToken'));
  }).then(function(userDataResponse) {
    var userData = userDataResponse.data;
    response.success(userData);
  }, function(error) {
    response.error(error);
  });
});

/**
 * This function is called when GitHub redirects the user back after
 *   authorization.  It calls back to GitHub to validate and exchange the code
 *   for an access token.
 */
var getGitHubAccessToken = function(code) {
  var body = querystring.stringify({
    client_id: githubClientId,
    client_secret: githubClientSecret,
    code: code
  });
  return Parse.Cloud.httpRequest({
    method: 'POST',
    url: githubValidateEndpoint,
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Parse.com Cloud Code'
    },
    body: body
  });
}

/**
 * This function calls the githubUserEndpoint to get the user details for the
 * provided access token, returning the promise from the httpRequest.
 */
var getGitHubUserDetails = function(accessToken) {
  return Parse.Cloud.httpRequest({
    method: 'GET',
    url: githubUserEndpoint,
    params: { access_token: accessToken },
    headers: {
      'User-Agent': 'Parse.com Cloud Code'
    }
  });
}

/**
 * This function checks to see if this GitHub user has logged in before.
 * If the user is found, update the accessToken (if necessary) and return
 *   the users session token.  If not found, return the newGitHubUser promise.
 */
var upsertGitHubUser = function(accessToken, githubData) {
  var query = new Parse.Query(TokenStorage);
  query.equalTo('githubId', githubData.id);
  query.ascending('createdAt');
  // Check if this githubId has previously logged in, using the master key
  return query.first({ useMasterKey: true }).then(function(tokenData) {
    // If not, create a new user.
    if (!tokenData) {
      return newGitHubUser(accessToken, githubData);
    }
    // If found, fetch the user.
    var user = tokenData.get('user');
    return user.fetch({ useMasterKey: true }).then(function(user) {
      // Update the accessToken if it is different.
      if (accessToken !== tokenData.get('accessToken')) {
        tokenData.set('accessToken', accessToken);
      }
      /**
       * This save will not use an API request if the token was not changed.
       * e.g. when a new user is created and upsert is called again.
       */
      return tokenData.save(null, { useMasterKey: true });
    }).then(function(obj) {
      // Return the user object.
      return Parse.Promise.as(user);
    });
  });
}

/**
 * This function creates a Parse User with a random login and password, and
 *   associates it with an object in the TokenStorage class.
 * Once completed, this will return upsertGitHubUser.  This is done to protect
 *   against a race condition:  In the rare event where 2 new users are created
 *   at the same time, only the first one will actually get used.
 */
var newGitHubUser = function(accessToken, githubData) {
  var user = new Parse.User();
  // Generate a random username and password.
  var username = new Buffer(24);
  var password = new Buffer(24);
  _.times(24, function(i) {
    username.set(i, _.random(0, 255));
    password.set(i, _.random(0, 255));
  });
  user.set("username", username.toString('base64'));
  user.set("password", password.toString('base64'));
  // Sign up the new User
  return user.signUp().then(function(user) {
    // create a new TokenStorage object to store the user+GitHub association.
    var ts = new TokenStorage();
    ts.set('githubId', githubData.id);
    ts.set('githubLogin', githubData.login);
    ts.set('accessToken', accessToken);
    ts.set('user', user);
    ts.setACL(restrictedAcl);
    // Use the master key because TokenStorage objects should be protected.
    return ts.save(null, { useMasterKey: true });
  }).then(function(tokenStorage) {
    return upsertGitHubUser(accessToken, githubData);
  });
}