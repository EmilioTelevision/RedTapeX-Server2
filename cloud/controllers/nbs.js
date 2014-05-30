var _ = require('underscore');
var Post = Parse.Object.extend('Post');
var Comment = Parse.Object.extend('Comment');
var Contentarea = Parse.Object.extend('Contentarea');
var Insights = Parse.Object.extend('Insights');
var Analytics = Parse.Object.extend('Analytics');
var Orders = Parse.Object.extend('Order');




//app.get('/gatherNBS', function(req, res){
Parse.Cloud.job("gatherNextBigSoundDataBETA", function(request, status) {
   
    var Analytics = Parse.Object.extend('Analytics');
    var Websites = Parse.Object.extend('Websites');
    var query = new Parse.Query("Websites");
    
    query.find().then(function(results) {
      // Collect one promise for each delete into an array.
      //var promises = [];
      
      
         var cb = _.after(results.length, function(){
            
              console.log('everything is completed');
              //res.send('complete');
              status.success("Data Recorded successfully.");
              
        });
          
      
      
      _.each(results, function(site) {
        // Start this delete immediately and add its promise to the list.
        console.log(site.get('nbsid'));
        
        
        
         if (typeof site.get('nbsid') != 'undefined')
                        {


                             //status.message("Getting the data");

                             //status.message(site.get('nbsid'));

                             Parse.Cloud.httpRequest({
                                  method: "GET",
                                  headers: {
                                      'Content-Type': 'application/json'
                                    },
                                  url: "http://redtapedesign.com/reach/dashboard/lib/nbigsound.php?aid="+site.get('nbsid'),
                                  success: function(httpResponse) {

                                     
                                     console.log('received data from NBS. processing....');

                                      //status.message("Processing User Data");

                                      var x = httpResponse.text;

                                      console.log('Parsing JSON');

                                      x = JSON.parse(x);

                                      console.log('JSON parsed');

                                      //console.log('---');
                                      //console.log(typeof x);
                                      //console.log('---');

                                      var stats = new Array();
                                      var networkids = new Array();
                                      var networkurls = new Array();
                                      var counter = 0;

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


                                                      if(networkurls.indexOf(yy.Profile.url) == '-1') 
                                                      {

                                                          networkurls.push(yy.Profile.url);
                                                      }


                                                          
                                                      
                                                          analytics = new Analytics();

                                                          analytics.set('network',yy.Service.name);
                                                          analytics.set('network_id',yy.Profile.id);
                                                          analytics.set('network_url',yy.Profile.url);
                                                          analytics.set('recordDate', new Date((datep*86400)*1000));
                                                          analytics.set('metric', yyy);
                                                          analytics.set('value', yy.Metric[yyy][datep]);
                                                          analytics.set('siteid', site.id);
                                                          analytics.set('site', site);
                                                          stats.push(analytics);

                                                          counter++;
                                                           //status.message("Parsing Data... " + counter);
                                                      }




                                                  }
                                              };
                                          });


                                        console.log('---------------------processed data');
                                        //console.log(stats);
                                        console.log(networkids);
                                        console.log(networkurls);
                                      
                                
                                    
                                      site.set('nbsIdArray', networkids); 
                                      site.set('networkUrls',networkurls);
                                      stats.push(site);
                               
                                        console.log('saving '+stats.length+' data points');
                                      
                                      
                                        status.message('saving '+stats.length+' data points');
                                      

                                      //cb();
                                     
                                      
                                      Parse.Object.saveAll(stats, {
                                          success: function(obj) {
                                            
                                            console.log("Saved Them!!")
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
                        }//if NBSID is set
        
      
       
      });
      // Return a new promise that is resolved when all of the deletes are finished.
     

    });
    
});






//Gather NBS details on user once a day

Parse.Cloud.job("gatherNextBigSoundData", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var counter = 0;
  var promises = [];
  
  
  //Query for all "accounts"
  var Websites = Parse.Object.extend('Websites');
  var contentQuery = new Parse.Query(Websites);
  contentQuery.find().then(function(sites) {
  
  
        var cb = _.after(sites.length, function(){
            
             return Parse.Promise.when(promises);
             
             
        });
        
        
        _.each(sites, function(site){
  
      
                    //site = sites[0];

                    if (typeof site.get('nbsid') != 'undefined')
                        {


                             status.message("Getting the data");

                             status.message(site.get('nbsid'));

                             Parse.Cloud.httpRequest({
                                  method: "GET",
                                  headers: {
                                      'Content-Type': 'application/json'
                                    },
                                  url: "http://redtapedesign.com/reach/dashboard/lib/nbigsound.php?aid="+site.get('nbsid'),
                                  success: function(httpResponse) {


                                     console.log('returned response');

                                      status.message("Processing User Data");

                                      var x = httpResponse.text;

                                      console.log(x);

                                      x = JSON.parse(x);

                                      console.log('---');
                                      console.log(typeof x);
                                      console.log('---');

                                      var stats = new Array();
                                      var networkids = new Array();
                                      var networkurls = new Array();
                                      var counter = 0;

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


                                                      if(networkurls.indexOf(yy.Profile.url) == '-1') 
                                                      {

                                                          networkurls.push(yy.Profile.url);
                                                      }

                                                          analytics = new Analytics();

                                                          analytics.set('network',yy.Service.name);
                                                          analytics.set('network_id',yy.Profile.id);
                                                          analytics.set('network_url',yy.Profile.url);
                                                          analytics.set('recordDate', new Date((datep*86400)*1000));
                                                          analytics.set('metric', yyy);
                                                          analytics.set('value', yy.Metric[yyy][datep]);

                                                          stats.push(analytics);

                                                          counter++;
                                                           status.message("Parsing Data... " + counter);
                                                      }




                                                  }
                                              };
                                          });

                              //console.log('---------------------');
                              //console.log(stats);
                             // console.log(networkids);

                                      site.set('nbsIdArray', networkids); 
                                      site.set('networkUrls',networkurls);
                                      stats.push(site);
                               //res.send('done');



                                      Parse.Object.saveAll(stats, {
                                          success: function(obj) {

                                            status.message("Saved User Data");
                                            console.log('saved');
                                             promise.resolve();
                                          },
                                            error: function(obj,error) {
                                            console.error(obj, error);
                                             status.message("Error Saving User Data");
                                              promise.reject(error);
                                          }
                                        });
                              }
                          });
                        }

                  cb();      
        });// each
    
    
   
    
  }).then(function() {
    // Set the job's success status
    status.success("Data Recorded successfully.");
  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });
});
