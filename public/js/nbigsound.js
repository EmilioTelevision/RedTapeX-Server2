if (typeof reach == 'undefined'){var reach = {};}


  

reach.pdata = {
  alldata: [],
  events: [],       
  getUser: function(user)
  {
      //reach.visuals.loader('show'); 
      ////redtapedesign.api3.nextbigsound.com/artists/search.json?q=mac%20miller
      var $url = '//redtapedesign.com/reach/dashboard/lib/nbigsound.php?aid='+user;
      
                $.ajax({
                    method: "GET",
                    url: $url,
                    dataType: "json",
                    jsonp : "callback",
                    success: function(data) {
                      
                      //console.log('*************Gathering Artist Insights (succcess)*************');
                     // reach.visuals.loader('hide'); 
                      
                      $.each(data, function(x,y){
                            
                            //console.log(y.Service.name);
                        
                            
                            switch(y.Service.name)
                            {
                                case 'YouTube':
                                   for(var key in  y.Metric.plays) break;
                                   $('#search #keyMetrics .youtube').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.plays[key]));
                                break;
                                
                                case 'Twitter':
                                    for(var key in  y.Metric.fans) break;
                                   $('#search #keyMetrics .twitterall').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.fans[key]));
                                   
                                   //totalMens = 0;$.each(data[0].Metric.mentions, function(x,y){totalMens= totalMens+y;});
                                   //$('#search #keyMetrics .twittermentions').find('.value').find('strong').html(reach.visuals.roundlarge(totalMens));
                                break;
                                
                                case 'Wikipedia':
                                    for(var key in  y.Metric.views) break;
                                   $('#search #keyMetrics .wikipedia').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.views[key]));
                                break;
                                
                                case 'Facebook':
                                    for(var key in  y.Metric.fans) break;
                                   $('#search #keyMetrics .facebook').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.fans[key]));
                                break;
                               
                                case 'Vevo':
                                    for(var key in  y.Metric.plays) break;
                                   $('#search #keyMetrics .vevo').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.plays[key]));
                                break;
                                
                                case 'Last.fm':
                                     for(var key in  y.Metric.plays) break;
                                   $('#search #keyMetrics .lastfm').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.plays[key]));
                                break;
                                
                                case 'Instagram':
                                     for(var key in  y.Metric.likes) break;
                                   $('#search #keyMetrics .instagram').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.likes[key]));
                                break;
                                
                                 case 'SoundCloud':
                                     for(var key in  y.Metric.plays) break;
                                   $('#search #keyMetrics .soundcloud').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.plays[key]));
                                break;
                                
                                case 'Rdio':
                                     for(var key in  y.Metric.plays) break;
                                   $('#search #keyMetrics .rdio').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.plays[key]));
                                break;
                                
                                case 'ReverbNation':
                                     for(var key in  y.Metric.plays) break;
                                   $('#search #keyMetrics .rnation').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.plays[key]));
                                break;
                                
                               
                                case 'Tumblr':
                                break;
                                
                            }
                           
                          
                        });
                    }
                });
                    
                    
  },
     
  search: function()
  {
    reach.visual.loader('show')
     $('.artistsresults .panel').html('<a onclick="reach.pdata.search();" class="btn btn-default bt-red">Look Up</a>');
     $url = '//redtapedesign.com/reach/dashboard/lib/nbigsound.php?search='+$('#search-artists').val(); 
                $.ajax({
                        method: "GET",
                        url: $url,
                        dataType: "json",
                        jsonp : "callback",
                        success: function(data) {
                            reach.visual.loader('hide');
                            
                            $('.artistsresults').popover('show');
                            
                             $('.artistsresults').find('.col-md-4').remove();
                            
                            
                            //console.log(data);
                            $.each(data, function(x,y){
                              $('.artistsresults').append('<div class="col-md-4"><h4 onclick="$(\'#nbsid\').val('+x+'); $(\'#search-artists\').val(\''+y.name+'\'); $(\'.success\').fadeIn(); $(\'.artistsresults\').html(\'\'); $(\'.artistsresults\').popover(\'hide\');">'+y.name+'</h4></div>');
                            });
                        }
                    });
  },
  
  getInsights: function()
  {
       
     //console.log('*************Gathering Artist Insights*************');
      
      
      var $url = '//redtapedesign.com/reach/dashboard/lib/nbigsound.php?aid=754265';
      
                $.ajax({
                    method: "GET",
                    url: $url,
                    dataType: "json",
                    jsonp : "callback",
                    success: function(data) {
                      
                      //console.log('*************Gathering Artist Insights (succcess)*************');
      
                      
                      $.each(data, function(x,y){
                            
                            switch(y.Service.name)
                            {
                                case 'YouTube':
                                   for(var key in  y.Metric.plays) break;
                                   $('#overview #keyMetrics .youtube').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.plays[key]));
                                break;
                                
                                case 'Twitter':
                                    for(var key in  y.Metric.fans) break;
                                   $('#overview #keyMetrics .twitterall').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.fans[key]));
                                   
                                   totalMens = 0;$.each(data[0].Metric.mentions, function(x,y){totalMens= totalMens+y;});
                                   $('#overview #keyMetrics .twittermentions').find('.value').find('strong').html(reach.visuals.roundlarge(totalMens));
                                break;
                                
                                case 'Wikipedia':
                                    for(var key in  y.Metric.views) break;
                                   $('#overview #keyMetrics .wikipedia').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.views[key]));
                                break;
                                
                                case 'Facebook':
                                    for(var key in  y.Metric.fans) break;
                                   $('#overview #keyMetrics .facebook').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.fans[key]));
                                break;
                               
                                case 'Vevo':
                                    for(var key in  y.Metric.plays) break;
                                   $('#overview #keyMetrics .vevo').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.plays[key]));
                                break;
                                
                                case 'Last.fm':
                                     for(var key in  y.Metric.plays) break;
                                   $('#overview #keyMetrics .lastfm').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.plays[key]));
                                break;
                                
                                case 'Instagram':
                                     for(var key in  y.Metric.likes) break;
                                   $('#overview #keyMetrics .instagram').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.likes[key]));
                                break;
                                
                                 case 'SoundCloud':
                                     for(var key in  y.Metric.plays) break;
                                   $('#overview #keyMetrics .soundcloud').find('.value').find('strong').html(reach.visuals.roundlarge(y.Metric.plays[key]));
                                break;
                                
                                case 'Pandora':
                                break;
                                
                               
                                case 'Tumblr':
                                break;
                                
                            }
                           
                           //console.log(y.Service.name);
                            //console.log(y.Metric);
                        });
                      
                      reach.pdata.alldata = data;
                      
                      $('#overview #keyMetrics').find('.value').find('strong').each(function(x,y)
                        {
                            if($(y).html() == '0')
                            {
                                $(y).parent().parent().parent().parent().parent().find('h3:first-child').next().prepend('<button type="button" class="btn btn-default bt-red" onclick="alert(\'See administrator to connect this account\')" style="cursor: pointer; margin-top: 18px;margin-right: 13px;">Connect Account</button>');
                                $(y).parent().parent().parent().parent().parent().find('a').fadeOut();
                            }
                        });


                        
                        
                        dataB = []; totalevents = 0;
                        $.each(data, function(x,y)
                        {

                            $.each(y.Metric, function(xx,yy){

                                $.each(yy, function(xxx, yyy)
                                {
                                 
                                totalevents = totalevents + yyy;
                                 
                                    if(typeof dataB[xx] == 'undefined')
                                                                    {

                                        dataB[xx] = 1;

                                        if (isNaN(parseInt(yyy)) == false)
                                        {                                        
                                        dataB[xx] = dataB[xx] + parseInt(yyy);
                                        }

                                     } else {


                                        if (isNaN(parseInt(yyy)) == false)
                                        {   
                                        dataB[xx] = parseInt(dataB[xx]) + parseInt(yyy);
                                        }



                                     }

                                    });
                                });

                               });
                               //console.log(dataB);
                               reach.pdata.events = dataB;
                               $('.total-social-events').html(reach.visuals.roundlarge(totalevents))

                     
                     
                      
                    }
                });
  }

};