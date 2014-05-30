var _ = require('underscore');
var Post = Parse.Object.extend('Post');
var Comment = Parse.Object.extend('Comment');
var Contentarea = Parse.Object.extend('Contentarea');
var Insights = Parse.Object.extend('Insights');
var Analytics = Parse.Object.extend('Analytics');
var Orders = Parse.Object.extend('Order');



// API endpoint for the stats
exports.apiGet = function(req, res){
 
    var siteid = req.params.sid;
    
    var query = new Parse.Query(Analytics);
    //query.equalTo("host", Parse.User.current().get('host'));
    query.equalTo("siteid", siteid);
    query.ascending('date');
    query.include('site');
    query.limit(100);
    
    query.find().then(function(data) {
    
    
      var insights = new Object();
      var timeline = new Object();
    
      var cb = _.after(data.length, function(){
            
            
           console.log('*****************CALLBACK****************'); 
           console.log(data.length);
           console.log(insights);
            
           //  var querysites = new Parse.Query(Websites);  
           var Website = Parse.Object.extend('Websites');
           var query = new Parse.Query(Website);
           query.get(siteid).then(function(site) {
           
            
                console.log('gathering insights db');
           
                var querystat = new Parse.Query(Insights);
                //querystat.containedIn("network_user_id", Parse.User.current().get('thinkUpNetworkArrayID'));
                
               // querystat.containedIn('network_user_id', site.get('thinkUpNetworkArrayID'));
                querystat.notEqualTo('filename', 'archivedposts');
                querystat.notEqualTo('filename', 'favoritedlinks');
                
                querystat.descending('createdAt');
                
                querystat.find().then(function(socialInsights) {

                    console.log('gathering orders');
                
                    var queryOrders = new Parse.Query(Orders);
                    queryOrders.equalTo('site', site);
                    queryOrders.find().then(function(orders) {

                               
                   
                                console.log('found');

                                /*
                                var da = {
                                   data: insights,
                                   timeline: timeline,
                                   stats: socialInsights,
                                   orders: orders,
                                   sites: sites,
                                   thissite: site,
                                   active: siteid
                                 }
                                */
                               
                               var da = { 
                                   data: socialInsights,
                                   site: site
                               }
                                   
                               
                               console.log(da);
                               res.send(da);  

                        
                        
                    });

                  

               });
            
            
          });  //found websites
            
            
        });
        
        
          
          
          
        
        insights = {
            pageview: 0,
            contentview: 0,
            productview: 0,
            sales: 0
        }
        
        _.each(data, function(x){
            
            
           // PREPARE GENERIC METRICS 
           
           if (x.get('metric') == 'pageview') insights[x.get('metric')] = insights[x.get('metric')] +1;
           
           if (x.get('metric') == 'contentview') insights[x.get('metric')] = insights[x.get('metric')] +1;
           
           if (x.get('metric') == 'productview') insights[x.get('metric')] = insights[x.get('metric')] +1;
           
           if (x.get('metric') == 'sales') insights[x.get('metric')] = insights[x.get('metric')] +1;
           
           
           
           
            // PREPARE ECHONEST DATA INTO OBJECT //
           
           if (x.get('network') != 'undefined' && x.get('network') == 'echonest') 
            { 
                if (typeof insights[x.get('network')] == 'undefined')
                    {
                        insights[x.get('network')] = new Object();
                    }
                
                if (typeof x.get('value') != 'undefined')
                    {
                         insights[x.get('network')][x.get('metric')] = x.get('value');
                    
                    } else if (typeof x.get('valueObj') != 'undefined') {
                        
                         insights[x.get('network')][x.get('metric')] = x.get('valueObj'); 
                    }
               
                
            } 
            
            
            // PREPARE MENTION DATA INTO OBJECT //
           if (x.get('network') != 'undefined' && x.get('network') == 'mention') 
            { 
                if (typeof insights[x.get('network')] == 'undefined')
                    {
                        insights[x.get('network')] = new Object();
                    }
                
                
                if (typeof insights[x.get('network')][x.get('mention_source_type')] == 'undefined')
                    {
                        insights[x.get('network')][x.get('mention_source_type')] = new Array();
                    }
                    
                        insights[x.get('network')][x.get('mention_source_type')].push(x.get('mention_url'));
                
             
               
                
            }   
            
           
           
           
           
           
           // PREPARE NBS DATA
           
           
           if (x.get('network') != 'undefined' && x.get('network') != 'echonest' && x.get('network') != 'mention') 
            { 
                if (typeof insights[x.get('network')] == 'undefined')
                    {
                         insights[x.get('network')] = new Object();
                    }
                     
                 
                    currentTime = new Date(x.get('recordDate')); 
                                 var month = currentTime.getMonth() + 1;                           
                                 var day = currentTime.getDate();                           
                                 var year = currentTime.getFullYear();                           
                                 var v = year + "-" + month + "-" + day; 
                
                
                    if (typeof insights[x.get('network')][x.get('metric')] == 'undefined')              
                        {
                            insights[x.get('network')][x.get('metric')] = new Object();
                        }
                
                
                    insights[x.get('network')][x.get('metric')][v] = x.get('value');
                
                
                
                
            };
            
           
          
           
           /*
           if (x.get('network') == 'Rdio') insights[x.get('network')] = insights[x.get('metric')];
           if (x.get('network') == 'Facebook') insights[x.get('network')] = insights[x.get('metric')];
           if (x.get('network') == 'Instagram') insights[x.get('network')] = insights[x.get('metric')];
           if (x.get('network') == 'Twitter') insights[x.get('network')] = insights[x.get('metric')];
           if (x.get('network') == 'Spotify') insights[x.get('network')] = insights[x.get('metric')];
           */
          
           currentTime = new Date(x.createdAt); 
			var month = currentTime.getMonth() + 1;                           
			var day = currentTime.getDate();                           
			var year = currentTime.getFullYear();                           
			var v = year + "-" + month + "-" + day; 
         
          
           if(typeof timeline[v] != 'undefined' && x.get('metric') == 'pageview')
               {
                   timeline[v] = timeline[v] + 1;
                   
               } else if (x.get('metric') == 'pageview'){
                   
                   timeline[v] = 1;
               }
           
           
            cb();
        });
    
    
                 
                 
                 
   });
    
}


// Display Stats.
exports.index = function(req, res) {
    
    
    
    var query = new Parse.Query(Analytics);
    //query.equalTo("host", Parse.User.current().get('host'));
    query.equalTo("siteid", req.cookies.site);
    query.descending('createdAt');
    query.limit(1000);
    
    query.find().then(function(data) {
    
    
      var insights = new Object();
      var timeline = new Object();
    
      var cb = _.after(data.length, function(){
            
            
           //console.log('*****************CALLBACK****************'); 
           //console.log(data.length);
           //console.log(insights);
            
           //  var querysites = new Parse.Query(Websites);  
           var Website = Parse.Object.extend('Websites');
           var query = new Parse.Query(Website);
           query.get(req.cookies.site).then(function(site) {
           
         
           
                var querystat = new Parse.Query(Insights);
                //querystat.containedIn("network_user_id", Parse.User.current().get('thinkUpNetworkArrayID'));
                
                //querystat.containedIn('network_user_id', site.get('thinkUpNetworkArrayID'));
                querystat.equalTo("siteId", req.cookies.site);
                querystat.notEqualTo('filename', 'archivedposts');
                querystat.notEqualTo('filename', 'favoritedlinks');
                querystat.notEqualTo('filename', 'archivedposts');
                querystat.descending('createdAt');
                
                
                querystat.find().then(function(socialInsights) {

                
                    var queryOrders = new Parse.Query(Orders);
                    queryOrders.equalTo('site', site);
                    queryOrders.find().then(function(orders) {

                         var user = Parse.User.current();
                    var relation = user.relation("sites");
                    relation.query().find({
                            success: function(sites) {


                                res.render('admin/stats', { 
                                   user: Parse.User.current(),
                                   data: insights,
                                   timeline: timeline,
                                   stats: socialInsights,
                                   orders: orders,
                                   sites: sites,
                                   thissite: site,
                                   active: req.cookies.site
                                 });

                            },
                            error: function(error) {
                                   res.send(error);
                            }
                        });

                        
                    });

                  

               });
            
            
          });  //found websites
            
            
        });
        
        
          
          
          
        
        insights = {
            pageview: 0,
            contentview: 0,
            productview: 0,
            sales: 0
        }
        
        _.each(data, function(x){
            
            
           // PREPARE GENERIC METRICS 
           
           if (x.get('metric') == 'pageview') insights[x.get('metric')] = insights[x.get('metric')] +1;
           
           if (x.get('metric') == 'contentview') insights[x.get('metric')] = insights[x.get('metric')] +1;
           
           if (x.get('metric') == 'productview') insights[x.get('metric')] = insights[x.get('metric')] +1;
           
           if (x.get('metric') == 'sales') insights[x.get('metric')] = insights[x.get('metric')] +1;
           
           
           
           
            // PREPARE ECHONEST DATA INTO OBJECT //
           
           if (x.get('network') != 'undefined' && x.get('network') == 'echonest') 
            { 
                if (typeof insights[x.get('network')] == 'undefined')
                    {
                        insights[x.get('network')] = new Object();
                    }
                
                if (typeof x.get('value') != 'undefined')
                    {
                         insights[x.get('network')][x.get('metric')] = x.get('value');
                    
                    } else if (typeof x.get('valueObj') != 'undefined') {
                        
                         insights[x.get('network')][x.get('metric')] = x.get('valueObj'); 
                    }
               
                
            } 
            
            
            // PREPARE MENTION DATA INTO OBJECT //
           if (x.get('network') != 'undefined' && x.get('network') == 'mention') 
            { 
                if (typeof insights[x.get('network')] == 'undefined')
                    {
                        insights[x.get('network')] = new Object();
                    }
                
                
                if (typeof insights[x.get('network')][x.get('mention_source_type')] == 'undefined')
                    {
                        insights[x.get('network')][x.get('mention_source_type')] = new Array();
                    }
                    
                        insights[x.get('network')][x.get('mention_source_type')].push(x.get('mention_url'));
                
             
               
                
            }   
            
           
           
           
           
           
           // PREPARE NBS DATA
           
           
           if (x.get('network') != 'undefined' && x.get('network') != 'echonest' && x.get('network') != 'mention') 
            { 
                if (typeof insights[x.get('network')] == 'undefined')
                    {
                         insights[x.get('network')] = new Object();
                    }
                     
                 
                    currentTime = new Date(x.get('recordDate')); 
                                 var month = currentTime.getMonth() + 1;                           
                                 var day = currentTime.getDate();                           
                                 var year = currentTime.getFullYear();                           
                                 var v = year + "-" + month + "-" + day; 
                
                
                    if (typeof insights[x.get('network')][x.get('metric')] == 'undefined')              
                        {
                            insights[x.get('network')][x.get('metric')] = new Object();
                        }
                
                
                    insights[x.get('network')][x.get('metric')][v] = x.get('value');
                
                
                
                
            };
            
           
          
           
           /*
           if (x.get('network') == 'Rdio') insights[x.get('network')] = insights[x.get('metric')];
           if (x.get('network') == 'Facebook') insights[x.get('network')] = insights[x.get('metric')];
           if (x.get('network') == 'Instagram') insights[x.get('network')] = insights[x.get('metric')];
           if (x.get('network') == 'Twitter') insights[x.get('network')] = insights[x.get('metric')];
           if (x.get('network') == 'Spotify') insights[x.get('network')] = insights[x.get('metric')];
           */
          
           currentTime = new Date(x.createdAt); 
			var month = currentTime.getMonth() + 1;                           
			var day = currentTime.getDate();                           
			var year = currentTime.getFullYear();                           
			var v = year + "-" + month + "-" + day; 
         
          
           if(typeof timeline[v] != 'undefined' && x.get('metric') == 'pageview')
               {
                   timeline[v] = timeline[v] + 1;
                   
               } else if (x.get('metric') == 'pageview'){
                   
                   timeline[v] = 1;
               }
           
           
            cb();
        });
    
    
                 
                 
                 
   });
          

    
  
};


// Display Social Stats
exports.socialstats = function(req, res) {
    
      
   
    
    
   var querystat = new Parse.Query(Insights);
   querystat.containedIn("network_user_id", Parse.User.current().get('thinkUpNetworkArrayID'));
   querystat.notEqualTo('filename', 'archivedposts');
   querystat.notEqualTo('filename', 'favoritedlinks');
   
   querystat.find().then(function(socialInsights) {
   
 
                 res.render('admin/social', { 
                   user: Parse.User.current(),
                   stats: socialInsights
                 });
          
  });
  
};
