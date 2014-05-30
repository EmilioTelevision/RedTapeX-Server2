  if (typeof reach == 'undefined'){var reach = {};}

 

//google analytics class
              reach.googleanalytics = {
                  
                  alldata: [],
                  time_series: [],        
                  adwords_impression: 0,
                  adwords_engagement: 0,
                  sitevisitors: 0,
                  cost: 0,
                  heatMapdata: [],
                  graph_google_promotions: function(data)
                  {
                    reach.visuals.loader('show');
                    
                  
                    
                      //console.log('************Promotions***********');
                    
                    this.adwords_impression = 0;
                    this.adwords_engagement = 0;
                    
                    
                    placements = data.rows; //reach.googleanalytics.alldata.stub_adgroups[0].result.rows;
                    
                      if(typeof placements[0] != 'undefined')
                          {
                    
                     phtml = '<div class="alert alert-info emphasis-0 insight-item">';
                                    phtml +='    <div class="insight-attachment-detail none">';
                                    phtml +='            <span class="label label-info"><i class="icon-white icon-ok-circle"></i> <a>Promotions:</a></span>';
                                    phtml +='            <i class="icon-twitter icon-muted"></i>';
                                    phtml += 'Top promotions <b>'+placements[0][0]+'</b>,<b> '+placements[1][0]+'</b>,<b> '+placements[2][0]+'</b>';            
                                    phtml +='    </div>';
                                    phtml +='<div class="clearfix"></div>';
                                    phtml +='</div>';
                                    
                        $('.table-key-insights').append(phtml);  
                          }
                    
                    $.each(placements, function(x,y){
                        
                        reach.googleanalytics.adwords_impression = parseInt(reach.googleanalytics.adwords_impression) + parseInt(y[1]);
                        reach.googleanalytics.adwords_engagement = parseInt(reach.googleanalytics.adwords_engagement) + parseInt(y[2]);
                        
                        
                        
                        var cost = Math.round(1.5384615 * y[3]);
                        var calc_cpc = y[2] / cost;
                        
                        
                        reach.googleanalytics.cost = parseInt(reach.googleanalytics.cost) + cost;
                        
                        
                        var n = y[0].indexOf(':::');
                        if(n != -1)
                        {
                            promo = y[0].split(':::');
                            promo = promo[0].split('T=');
                            
                            var promotion = '<i class="stats-source-icon left icon-videos"></i>'+promo[1];
                            
                        } else {
                            
                            var promotion = '<i class="stats-source-icon left icon-web"></i>'+y[0];
                        }
                        
                        
                        $('.table-paid-promotions').append('<tr><td>'+promotion+'</td><td>'+y[1]+'</td><td>'+y[2]+'</td><td>$'+cost+'</td></tr>');
                    });
                    
                        var x = $('.paid-total-impressions').data('action');
                        if(x=='0') x = 1;
                        x = parseInt(x) + reach.googleanalytics.adwords_impression;
                        $('.paid-total-impressions').html(reach.visuals.roundlarge(x));
                        $('.paid-total-impressions').data('action', x);
                        
                        var x = $('.paid-total-engagements').data('action');
                        if(x=='0') x = 1;
                        x = parseInt(x) + reach.googleanalytics.adwords_engagement;
                        $('.paid-total-engagements').html(reach.visuals.roundlarge(x));
                        $('.paid-total-engagements').data('action', x);
                       
                        reach.visuals.loader('hide');

                  },
                  graph_google_sources: function(data)
                  {
                      //console.log('************Core Reporting***********');
                      
                      reach.visuals.loader('show');
                      
                        sources = data.rows; //reach.googleanalytics.alldata.stub_sources[0].result.rows;
                        
                         phtml = '<div class="alert alert-info emphasis-0 insight-item">';
                                    phtml +='    <div class="insight-attachment-detail none">';
                                    phtml +='            <span class="label label-info"><i class="icon-white icon-ok-circle"></i> <a>Sources:</a></span>';
                                    phtml +='            <i class="icon-twitter icon-muted"></i>';
                                    phtml += 'Top sites driving traffic <b>'+sources[0][0]+'</b>,<b> '+sources[2][0]+'</b>,<b> '+sources[3][0]+'</b>';            
                                    phtml +='    </div>';
                                    phtml +='<div class="clearfix"></div>';
                                    phtml +='</div>';
                                    
                        $('.table-key-insights').append(phtml);            
                        
                        $('.table-earned-source').html('');
                        $.each(sources, function(x,y)
                        {
                            $('.table-earned-source').append('<tr data-site="web"><td>'+y[0]+'</td><td>'+y[1]+'</td></tr>');
                        
                        });
                        reach.visuals.loader('hide');
                  },
                  graph_google_totals: function(data)
                    {

                      //console.log('****************totals****************');
                      total_page_impresions = data.rows[0][0]; //reach.googleanalytics.alldata.stub_visits[0].result.rows[0][0];
                     
                      var phtml = '<tr><td><i class="stats-source-icon left icon-web"></i>';
                      phtml += '<b class="source-name">Web</b></td>'
                      phtml += '<td>TheRealJustIvy.com</td>';
                      phtml += '<td class="longtd">';
                      phtml += '<div class="statistic-bar br-2"> <span class="carret equal"></span> <div class="statistic-bar-content br-2 web" style="right: auto; width: 40%;"></div> </div>';
                      phtml += '</td>';
                      phtml += '<td data-reach="'+total_page_impresions+'">'+reach.visuals.roundlarge(total_page_impresions)+'</td>';
                      phtml += '<td><button type="button" class="btn btn-default bt-red">Boost</button></td>';
                      phtml += '</tr>';
                      $('.owned-media-pages').append(phtml);   
                      
                      reach.visuals.calibrateTables();
                      
                   reach.visuals.loader('hide');

                    },
                  graph_google_locations: function(data)
                  {
                      //console.log('************Locations***************');
                      reach.visuals.loader('show');
                      
                        locations = data.rows; //reach.googleanalytics.alldata.stub_location[0].result.rows;
                        //$('.table-key-insights').append('<tr><td><b>Your Top Locations </b>'+locations[0][2]+', '+locations[2][2]+', '+locations[3][2]+'</td></tr>');
                      
                         
                         phtml = '<div class="alert alert-info emphasis-0 insight-item">';
                                    phtml +='    <div class="insight-attachment-detail none">';
                                    phtml +='            <span class="label label-info"><i class="icon-white icon-ok-circle"></i> <a>Locations:</a></span>';
                                    phtml +='            <i class="icon-twitter icon-muted"></i>';
                                    phtml += 'Top locations driving traffic <b>'+locations[0][2]+'</b>,<b> '+locations[2][2]+'</b>,<b> '+locations[3][2]+'</b>';            
                                    phtml +='    </div>';
                                    phtml +='<div class="clearfix"></div>';
                                    phtml +='</div>';
                                    
                        $('.table-key-insights').append(phtml);    
                      
                      
                      $('.table-earned-locations').html('');
                        data = [];
                        $.each(locations, function(x,y)
                        {
                            $('.table-earned-locations').append('<tr><td>'+y[2]+'</td><td>'+y[3]+'</td></tr>');
                            obj = {lat: y[0], lng:y[1], count: y[3]};
                            data.push(obj);
                        });
                        
                        reach.googleanalytics.heatMapdata = data;
                        drawHeatMap();
                        reach.visuals.loader('hide');
                  },
                  graph_google_devices:function(data)
                  {
                      //console.log('************Devices***************');
                      reach.visuals.loader('show');

                      devices = data.rows;   
                      
                      $.each(devices, function(x,y)
                        {
                          if(typeof reach.visuals.devicePie[y[0]] != 'undefined')
                              {
                                  reach.visuals.devicePie[y[0]] = reach.visuals.devicePie[y[0]]+ y[1];  
                              } else {
                                  reach.visuals.devicePie[y[0]] = y[1];  
                              }
                        });
                        
                      reach.visuals.drawDevicePie();
                      
                      
                      reach.visuals.loader('hide');  
                    },
                 
                 graph_timeline_promotions: function(datay)
                 {
                     var data = [];
                     $.each(datay.rows, function(x,y){
                        
                        var yy = y[0].charAt(0)+y[0].charAt(1)+y[0].charAt(2)+y[0].charAt(3);
                        var mm = y[0].charAt(4)+y[0].charAt(5);
                        var dd = y[0].charAt(6)+y[0].charAt(7); 
                        //var dater = mm+'-'+dd+'-'+yy;
                        var dater = yy+'-'+mm+'-'+dd;
                        //var dater = y[0];
                        
                        var obj = {
                                day: dater,
                                value: y[1]
                            };
                            
                       if (y[1] > 0) data.push(obj);
                      });
                    
                     //console.log('>>>>>>>>>>>>>>>>>>>> Graph Timeline Promotions');
                     reach.visuals.merge_line_charts_promotions(data);
                 },
                 add_promotions_to_primary_timeline: function(datay)
                 {
                     //console.log('**********adding promotions to timeline');
                    
                     
                     var data = [];
                     $.each(datay.rows, function(x,y){
                        
                        var yy = y[0].charAt(0)+y[0].charAt(1)+y[0].charAt(2)+y[0].charAt(3);
                        var mm = y[0].charAt(4)+y[0].charAt(5);
                        var dd = y[0].charAt(6)+y[0].charAt(7); 
                        //var dater = mm+'-'+dd+'-'+yy;
                        var dater = yy+'-'+mm+'-'+dd;
                        //var dater = y[0];
                        
                        var obj = {
                                day: dater,
                                value: parseInt(y[1])
                            };
                            
                       if (y[1] > 0) data.push(obj);
                      });
                    
                     //console.log('>>>>>>>>>>>>>>>>>>>Promotions');
                     //reach.visuals.merge_line_charts(data);
                    
                     //console.log('**********copy promotion data to promotion timeline for graphing');
                     reach.googleanalytics.graph_timeline_promotions(datay);
                 },
                
                 graph_timeline_impressions: function(datay)
                  {
                     //console.log('graphing timeline');
                      reach.visuals.loader('show');
                     
                     var data = [];
                     $.each(datay.rows, function(x,y){
                        
                        var yy = y[0].charAt(0)+y[0].charAt(1)+y[0].charAt(2)+y[0].charAt(3);
                        var mm = y[0].charAt(4)+y[0].charAt(5);
                        var dd = y[0].charAt(6)+y[0].charAt(7); 
                        //var dater = mm+'-'+dd+'-'+yy;
                        var dater = yy+'-'+mm+'-'+dd;
                        //var dater = y[0];
                        
                        var obj = {
                                day: dater,
                                value: parseInt(y[1])
                            };
                            
                       if (y[1] > 0) data.push(obj);
                      });
                      
                      
                      reach.googleanalytics.time_series = data;
                      
                      
                      //console.log('>>>>>>>>>>>>>>>>>>>Google Data');
                      reach.visuals.merge_line_charts(data);
                       
                      reach.visuals.loader('hide');
                      
                      
                  },
                  getData: function()
                  {
                     reach.visuals.loader('show');
                    
                        $.ajax({
                            method: "GET",
                            url: '//redtapedesign.com/reach/dashboard/lib/google-api-php-client/examples/analytics/demo/index.php?demo=hello&type=device&sd='+reach.filter.sd+'&ed='+reach.filter.ed,
                            dataType: "json",
                            success: function(data) {
                                reach.googleanalytics.graph_google_devices(data);
                            }
                        });
                      
                      
                      $.ajax({
                            method: "GET",
                            url: '//redtapedesign.com/reach/dashboard/lib/google-api-php-client/examples/analytics/demo/index.php?demo=hello&type=sources&sd='+reach.filter.sd+'&ed='+reach.filter.ed,
                            dataType: "json",
                            success: function(data) {
                                reach.googleanalytics.graph_google_sources(data);
                            }
                        });
                      
                      
                      $.ajax({
                            method: "GET",
                            url: '//redtapedesign.com/reach/dashboard/lib/google-api-php-client/examples/analytics/demo/index.php?demo=hello&type=locations&sd='+reach.filter.sd+'&ed='+reach.filter.ed,
                            dataType: "json",
                            success: function(data) {
                                reach.googleanalytics.graph_google_locations(data);
                            }
                        });
                      
                      
                      $.ajax({
                            method: "GET",
                            url: '//redtapedesign.com/reach/dashboard/lib/google-api-php-client/examples/analytics/demo/index.php?demo=hello&type=visits&sd='+reach.filter.sd+'&ed='+reach.filter.ed,
                            dataType: "json",
                            success: function(data) {
                                reach.googleanalytics.graph_google_totals(data);
                            }
                        });
                      
                      
                       $.ajax({
                            method: "GET",
                            url: '//redtapedesign.com/reach/dashboard/lib/google-api-php-client/examples/analytics/demo/index.php?demo=hello&type=date&sd='+reach.filter.sd+'&ed='+reach.filter.ed,
                            dataType: "json",
                            success: function(data) {
                                reach.googleanalytics.graph_timeline_impressions(data);
                            }
                        });
                      
                      $.ajax({
                            method: "GET",
                            url: '//redtapedesign.com/reach/dashboard/lib/google-api-php-client/examples/analytics/demo/index.php?demo=hello&type=adwords&sd='+reach.filter.sd+'&ed='+reach.filter.ed,
                            dataType: "json",
                            success: function(data) {
                                reach.googleanalytics.graph_google_promotions(data);
                            }
                        });
                        
                        
                       $.ajax({
                            method: "GET",
                            url: '//redtapedesign.com/reach/dashboard/lib/google-api-php-client/examples/analytics/demo/index.php?demo=hello&type=adwordsTimeline&sd='+reach.filter.sd+'&ed='+reach.filter.ed,
                            dataType: "json",
                            success: function(data) {
                                reach.googleanalytics.add_promotions_to_primary_timeline(data);
                            }
                        }); 
                      
                      //this.ads();
                      //this.basic();
                     
                    /*
                    var t=setTimeout(function(){
                         reach.googleanalytics.graph_timeline_impressions();
                     },500);
                     */
                    
                     //this.sitevisitors = reach.googleanalytics.alldata.stub_visits[0].result.rows[0][0];
                   
                     //reach.googleanalytics.graph_google_sources();
                     //reach.googleanalytics.graph_google_locations();
                     //reach.googleanalytics.graph_google_promotions();
                     
                     
                    
                   /*
                    $('#primarychart').css('background', '#1f2528');
                    $('#primarychart_wrap').html('<div id="pdetails"></div><div id="primarychart"></div>');
                           
                          
                             new Morris.Line({
                                // ID of the element in which to draw the chart.
                                element: 'primarychart',
                                //#84ced1
                                // Chart data records -- each entry in this array corresponds to a point on
                                // the chart.
                                data:data,
                                // The name of the data record attribute that contains x-values.
                                xkey: 'day',
                                // A list of names of data record attributes that contain y-values.
                                ykeys: ['value'],
                                // Labels for the ykeys -- will be displayed when you hover over the
                                // chart.
                                labels: ['Value'],
                                pointFillColors: ['#e5eef5'],
                                lineColors: ['#7f888f'],
                                grid: false
                              });
                           
                              
                     $('#pdetails').prepend('<div id="rightstats"><span class="carret carret-up graph-carret"></span><h1 class="stath1overlay">1,311%</h1></div>  <h1 class="stath1overlay">JustIvy</h1><p class="statpoverlay">Last 30 Days (paid, owed and earned media)</p>');
                     reach.visuals.loader('hide');
                   */
                     
                  },
                  ads: function()
                  {
                    reach.visuals.loader('show');  
                    this.alldata.stub_adwordsAll = [{"id":"gapiRpc","result":{"kind":"analytics#gaData","id":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&metrics=ga:adClicks,ga:impressions,ga:adCost,ga:CPM,ga:CPC,ga:CTR&start-date=2013-07-24&end-date=2013-08-07&max-results=50","query":{"start-date":"2013-07-24","end-date":"2013-08-07","ids":"ga:74978815","metrics":["ga:adClicks","ga:impressions","ga:adCost","ga:CPM","ga:CPC","ga:CTR"],"start-index":1,"max-results":50},"itemsPerPage":50,"totalResults":1,"selfLink":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&metrics=ga:adClicks,ga:impressions,ga:adCost,ga:CPM,ga:CPC,ga:CTR&start-date=2013-07-24&end-date=2013-08-07&max-results=50","profileInfo":{"profileId":"74978815","accountId":"42786782","webPropertyId":"UA-42786782-1","internalWebPropertyId":"72632595","profileName":"All Web Site Data","tableId":"ga:74978815"},"containsSampledData":false,"columnHeaders":[{"name":"ga:adClicks","columnType":"METRIC","dataType":"INTEGER"},{"name":"ga:impressions","columnType":"METRIC","dataType":"INTEGER"},{"name":"ga:adCost","columnType":"METRIC","dataType":"CURRENCY"},{"name":"ga:CPM","columnType":"METRIC","dataType":"CURRENCY"},{"name":"ga:CPC","columnType":"METRIC","dataType":"CURRENCY"},{"name":"ga:CTR","columnType":"METRIC","dataType":"PERCENT"}],"totalsForAllResults":{"ga:adClicks":"20637","ga:impressions":"4799722","ga:adCost":"7728.248418","ga:CPM":"1.6101450079817126","ga:CPC":"0.37448507137665354","ga:CTR":"0.42996240198911523"},"rows":[["20637","4799722","7728.248418","1.6101450079817126","0.37448507137665354","0.42996240198911523"]]}}];
                    this.alldata.stub_adgroups = [{"id":"gapiRpc","result":{"kind":"analytics#gaData","id":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:adGroup&metrics=ga:impressions,ga:adClicks,ga:adCost,ga:CPM,ga:CPC,ga:CTR&sort=-ga:impressions&start-date=2013-07-24&end-date=2013-08-07&max-results=200","query":{"start-date":"2013-07-24","end-date":"2013-08-07","ids":"ga:74978815","dimensions":"ga:adGroup","metrics":["ga:impressions","ga:adClicks","ga:adCost","ga:CPM","ga:CPC","ga:CTR"],"sort":["-ga:impressions"],"start-index":1,"max-results":200},"itemsPerPage":200,"totalResults":14,"selfLink":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:adGroup&metrics=ga:impressions,ga:adClicks,ga:adCost,ga:CPM,ga:CPC,ga:CTR&sort=-ga:impressions&start-date=2013-07-24&end-date=2013-08-07&max-results=200","profileInfo":{"profileId":"74978815","accountId":"42786782","webPropertyId":"UA-42786782-1","internalWebPropertyId":"72632595","profileName":"All Web Site Data","tableId":"ga:74978815"},"containsSampledData":false,"columnHeaders":[{"name":"ga:adGroup","columnType":"DIMENSION","dataType":"STRING"},{"name":"ga:impressions","columnType":"METRIC","dataType":"INTEGER"},{"name":"ga:adClicks","columnType":"METRIC","dataType":"INTEGER"},{"name":"ga:adCost","columnType":"METRIC","dataType":"CURRENCY"},{"name":"ga:CPM","columnType":"METRIC","dataType":"CURRENCY"},{"name":"ga:CPC","columnType":"METRIC","dataType":"CURRENCY"},{"name":"ga:CTR","columnType":"METRIC","dataType":"PERCENT"}],"totalsForAllResults":{"ga:impressions":"4810576","ga:adClicks":"20651","ga:adCost":"7733.778418","ga:CPM":"1.6076616226414469","ga:CPC":"0.37449897912934","ga:CTR":"0.42928331243493506"},"rows":[["iOS","2464528","3351","1404.078418","0.5697149385196679","0.4190028105043271","0.13596924035758573"],["Static Ads","679374","1090","751.28","1.1058415541366022","0.6892477064220184","0.1604418184976169"],["Akon 1","521744","1404","907.96","1.7402404244227052","0.6466951566951568","0.2690974884234414"],["Akon 3","434834","985","604.42","1.3900017017988473","0.6136243654822334","0.22652322495481034"],["Akon new","229084","597","386.02","1.6850587557402525","0.6465996649916248","0.26060309755373573"],["T=Specific Targeting group (1k-6k plays a day):::S=TRUE_VIEW_IN_STREAM_ON_YOUTUBE_WATCH:::D=A:::TGS=ACTIVE","183751","10592","2584.45","14.064957469619213","0.24400018882175226","5.764322371034716"],["Akon 2","135177","330","218.38","1.6155115145327978","0.6617575757575758","0.24412437027009032"],["Remarketing Against Youtube","79734","330","269.76","3.383249303935586","0.8174545454545454","0.41387613815937996"],["Remarketing","34126","205","189.53","5.553829924397821","0.9245365853658536","0.6007149973627146"],["T=Search based targeting:::S=TRUE_VIEW_IN_SEARCH_ON_YOUTUBE_SEARCH:::D=Y:::TGS=ACTIVE","24260","435","140.18","5.778235779060181","0.3222528735632184","1.7930750206100576"],["T=Category targeted group (1k-5k views / day):::S=TRUE_VIEW_IN_STREAM_ON_YOUTUBE_WATCH:::D=A:::TGS=ACTIVE","23944","1332","277.72","11.598730370865352","0.2084984984984985","5.56298028733712"],["T=Specific Targeting group (1k-6k plays a day):::S=TRUE_VIEW_IN_DISPLAY_ON_GOOGLE_DISPLAY_NETWORK:::D=Y:::TGS=ACTIVE","10","0","0.0","0.0","0.0","0.0"],["T=Category targeted group (1k-5k views / day):::S=TRUE_VIEW_IN_DISPLAY_ON_GOOGLE_DISPLAY_NETWORK:::D=Y:::TGS=ACTIVE","6","0","0.0","0.0","0.0","0.0"],["T=Specific Targeting group (1k-6k plays a day):::S=TRUE_VIEW_IN_SEARCH_ON_YOUTUBE_SEARCH:::D=Y:::TGS=ACTIVE","4","0","0.0","0.0","0.0","0.0"]]}}];
                    this.alldata.stub_adtimeline = [{"id":"gapiRpc","result":{"kind":"analytics#gaData","id":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:date&metrics=ga:impressions&start-date=2013-08-01&end-date=2013-08-21&max-results=50","query":{"start-date":"2013-08-01","end-date":"2013-08-21","ids":"ga:74978815","dimensions":"ga:date","metrics":["ga:impressions"],"start-index":1,"max-results":50},"itemsPerPage":50,"totalResults":21,"selfLink":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:date&metrics=ga:impressions&start-date=2013-08-01&end-date=2013-08-21&max-results=50","profileInfo":{"profileId":"74978815","accountId":"42786782","webPropertyId":"UA-42786782-1","internalWebPropertyId":"72632595","profileName":"All Web Site Data","tableId":"ga:74978815"},"containsSampledData":false,"columnHeaders":[{"name":"ga:date","columnType":"DIMENSION","dataType":"STRING"},{"name":"ga:impressions","columnType":"METRIC","dataType":"INTEGER"}],"totalsForAllResults":{"ga:impressions":"6600903"},"rows":[["20130801","379394"],["20130802","319345"],["20130803","377532"],["20130804","481846"],["20130805","843854"],["20130806","1191635"],["20130807","1616491"],["20130808","449655"],["20130809","60414"],["20130810","54899"],["20130811","56517"],["20130812","65707"],["20130813","78240"],["20130814","83348"],["20130815","86592"],["20130816","82030"],["20130817","84659"],["20130818","87831"],["20130819","89023"],["20130820","88762"],["20130821","23129"]]}}];
                    reach.visuals.loader('hide');
                  },
                  basic: function()
                  {
                    reach.visuals.loader('show');  
                    this.alldata.stub_timeline = [{"id":"gapiRpc","result":{"kind":"analytics#gaData","id":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:date&metrics=ga:visits&start-date=2013-07-24&end-date=2013-08-07&max-results=50","query":{"start-date":"2013-07-24","end-date":"2013-08-07","ids":"ga:74978815","dimensions":"ga:date","metrics":["ga:visits"],"start-index":1,"max-results":50},"itemsPerPage":50,"totalResults":15,"selfLink":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:date&metrics=ga:visits&start-date=2013-07-24&end-date=2013-08-07&max-results=50","profileInfo":{"profileId":"74978815","accountId":"42786782","webPropertyId":"UA-42786782-1","internalWebPropertyId":"72632595","profileName":"All Web Site Data","tableId":"ga:74978815"},"containsSampledData":false,"columnHeaders":[{"name":"ga:date","columnType":"DIMENSION","dataType":"STRING"},{"name":"ga:visits","columnType":"METRIC","dataType":"INTEGER"}],"totalsForAllResults":{"ga:visits":"4269"},"rows":[["20130724","0"],["20130725","0"],["20130726","0"],["20130727","0"],["20130728","0"],["20130729","6"],["20130730","11"],["20130731","63"],["20130801","335"],["20130802","369"],["20130803","480"],["20130804","599"],["20130805","753"],["20130806","1155"],["20130807","498"]]}}];
                    this.alldata.stub_visits = [{"id":"gapiRpc","result":{"kind":"analytics#gaData","id":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&metrics=ga:visits&start-date=2013-07-24&end-date=2013-08-07&max-results=50","query":{"start-date":"2013-07-24","end-date":"2013-08-07","ids":"ga:74978815","metrics":["ga:visits"],"start-index":1,"max-results":50},"itemsPerPage":50,"totalResults":1,"selfLink":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&metrics=ga:visits&start-date=2013-07-24&end-date=2013-08-07&max-results=50","profileInfo":{"profileId":"74978815","accountId":"42786782","webPropertyId":"UA-42786782-1","internalWebPropertyId":"72632595","profileName":"All Web Site Data","tableId":"ga:74978815"},"containsSampledData":false,"columnHeaders":[{"name":"ga:visits","columnType":"METRIC","dataType":"INTEGER"}],"totalsForAllResults":{"ga:visits":"4234"},"rows":[["4234"]]}}];
                    this.alldata.stub_sources = [{"id":"gapiRpc","result":{"kind":"analytics#gaData","id":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:source&metrics=ga:visits&sort=-ga:visits&start-date=2013-08-01&end-date=2013-08-21&max-results=150","query":{"start-date":"2013-08-01","end-date":"2013-08-21","ids":"ga:74978815","dimensions":"ga:source","metrics":["ga:visits"],"sort":["-ga:visits"],"start-index":1,"max-results":150},"itemsPerPage":150,"totalResults":25,"selfLink":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:source&metrics=ga:visits&sort=-ga:visits&start-date=2013-08-01&end-date=2013-08-21&max-results=150","profileInfo":{"profileId":"74978815","accountId":"42786782","webPropertyId":"UA-42786782-1","internalWebPropertyId":"72632595","profileName":"All Web Site Data","tableId":"ga:74978815"},"containsSampledData":false,"columnHeaders":[{"name":"ga:source","columnType":"DIMENSION","dataType":"STRING"},{"name":"ga:visits","columnType":"METRIC","dataType":"INTEGER"}],"totalsForAllResults":{"ga:visits":"6451"},"rows":[["google","5497"],["(direct)","703"],["t.co","70"],["facebook.com","56"],["m.facebook.com","25"],["therealjustivy.com","17"],["huffingtonpost.com","15"],["m.huffpost.com","15"],["googleads.g.doubleclick.net","11"],["yahoo","8"],["instagram.com","7"],["youtube.com","7"],["statigr.am","3"],["vk.com","3"],["86dreams.com","2"],["bing","2"],["rumorfix.com","2"],["aol","1"],["justivymusic.com.php53-5.dfw1-1.websitetestlink.com","1"],["mediatakeout.com","1"],["redtapedesign.com","1"],["simplyboundless.sharedby.co","1"],["tumblr.com","1"],["tweetdark.com","1"],["us-mg0.mail.yahoo.com","1"]]}}];
                    this.alldata.stub_deviceType = [{"id":"gapiRpc","result":{"kind":"analytics#gaData","id":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:deviceCategory&metrics=ga:visits&start-date=2013-07-24&end-date=2013-08-07&max-results=50","query":{"start-date":"2013-07-24","end-date":"2013-08-07","ids":"ga:74978815","dimensions":"ga:deviceCategory","metrics":["ga:visits"],"start-index":1,"max-results":50},"itemsPerPage":50,"totalResults":3,"selfLink":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:deviceCategory&metrics=ga:visits&start-date=2013-07-24&end-date=2013-08-07&max-results=50","profileInfo":{"profileId":"74978815","accountId":"42786782","webPropertyId":"UA-42786782-1","internalWebPropertyId":"72632595","profileName":"All Web Site Data","tableId":"ga:74978815"},"containsSampledData":false,"columnHeaders":[{"name":"ga:deviceCategory","columnType":"DIMENSION","dataType":"STRING"},{"name":"ga:visits","columnType":"METRIC","dataType":"INTEGER"}],"totalsForAllResults":{"ga:visits":"4241"},"rows":[["desktop","1023"],["mobile","2901"],["tablet","317"]]}}];
                    this.alldata.stub_location = [{"id":"gapiRpc","result":{"kind":"analytics#gaData","id":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:city&metrics=ga:visits&sort=-ga:visits&filters=ga:visits%3E4&start-date=2013-07-24&end-date=2013-08-07&max-results=200","query":{"start-date":"2013-07-24","end-date":"2013-08-07","ids":"ga:74978815","dimensions":"ga:city","metrics":["ga:visits"],"sort":["-ga:visits"],"filters":"ga:visits\u003e4","start-index":1,"max-results":200},"itemsPerPage":200,"totalResults":125,"selfLink":"https//www.googleapis.com/analytics/v3/data/ga?ids=ga:74978815&dimensions=ga:city&metrics=ga:visits&sort=-ga:visits&filters=ga:visits%3E4&start-date=2013-07-24&end-date=2013-08-07&max-results=200","profileInfo":{"profileId":"74978815","accountId":"42786782","webPropertyId":"UA-42786782-1","internalWebPropertyId":"72632595","profileName":"All Web Site Data","tableId":"ga:74978815"},"containsSampledData":false,"columnHeaders":[{"name":"ga:city","columnType":"DIMENSION","dataType":"STRING"},{"name":"ga:visits","columnType":"METRIC","dataType":"INTEGER"}],"totalsForAllResults":{"ga:visits":"2805"},"rows":[["New York","559"],["(not set)","351"],["Los Angeles","135"],["Dallas","86"],["Houston","86"],["Atlanta","82"],["Chicago","73"],["Boca Raton","64"],["San Francisco","46"],["Newton","45"],["Washington","42"],["Philadelphia","41"],["Phoenix","39"],["Alexandria","35"],["San Diego","34"],["Arlington","31"],["Denver","31"],["Miami","29"],["Charlotte","28"],["San Antonio","27"],["Seattle","24"],["Detroit","21"],["Guilderland","21"],["London","21"],["Orlando","21"],["Saint Paul","21"],["Seward","20"],["Garfield","19"],["Topeka","19"],["Paulsboro","17"],["San Jose","17"],["Toronto","17"],["Meadow Vista","16"],["Portland","16"],["West Orange","15"],["Columbus","14"],["Auburn","13"],["Jackson","13"],["Nashville","13"],["Minneapolis","12"],["Baltimore","11"],["Milwaukee","11"],["Pittsburgh","11"],["Tampa","11"],["Baton Rouge","10"],["Boston","10"],["Fayetteville","10"],["Greensboro","10"],["Hattiesburg","10"],["Kiev","10"],["Monroe Township","10"],["Montreal","10"],["Raleigh","10"],["St. Louis","10"],["Worcester","10"],["Zagreb","10"],["Amiens","9"],["Austin","9"],["Columbia","9"],["Newark","9"],["Calgary","8"],["Indianapolis","8"],["Kansas City","8"],["Long Beach","8"],["Memphis","8"],["Monaco-Ville","8"],["Oceanside","8"],["Wichita","8"],["Albuquerque","7"],["Canton","7"],["Daytona Beach","7"],["Hialeah","7"],["Huntington","7"],["Istanbul","7"],["Jacksonville","7"],["Marietta","7"],["Moscow","7"],["North Miami Beach","7"],["Oklahoma City","7"],["Richmond","7"],["Birmingham","6"],["Buffalo","6"],["Gainesville","6"],["Glendale","6"],["Gwynn Oak","6"],["Las Vegas","6"],["Lithonia","6"],["Louisville","6"],["Madison","6"],["Mesa","6"],["New Orleans","6"],["Nice","6"],["Riverside","6"],["Sacramento","6"],["Salt Lake City","6"],["Tucson","6"],["Vancouver","6"],["West Jordan","6"],["Allentown","5"],["Atlantic City","5"],["Carrollton","5"],["Chesapeake","5"],["Edmonton","5"],["Erie","5"],["Florence","5"],["Frederick","5"],["Fresno","5"],["Gary","5"],["Irvine","5"],["Irving","5"],["Jersey City","5"],["Lafayette","5"],["Oakland","5"],["Omaha","5"],["Ottawa","5"],["Oujda","5"],["San Bruno","5"],["Shinjuku","5"],["Springfield","5"],["Syracuse","5"],["Velikiye Luki","5"],["Victoria","5"],["Virginia Beach","5"],["Willingboro","5"],["Wilmington","5"]]}}];
                    
                   
                   
                  },
                  peopleSearching: function()
                    {
                      //https//www.googleapis.com/analytics/v3/data/ga?ids=ga%3A74978815&dimensions=ga%3AsearchUsed&metrics=ga%3Avisits&start-date=2013-07-23&end-date=2013-08-06&max-results=50  
                    },
                  getMedium: function()
                    {
                      //https//www.googleapis.com/analytics/v3/data/ga?ids=ga%3A74978815&dimensions=ga%3Amedium&metrics=ga%3Avisits&start-date=2013-07-23&end-date=2013-08-06&max-results=50  
                    },

                  getAdTypefromAnalytics: function()
                    {
                      //https//www.googleapis.com/analytics/v3/data/ga?ids=ga%3A74978815&dimensions=ga%3AadContent&metrics=ga%3Avisits&start-date=2013-07-23&end-date=2013-08-06&max-results=50  
                    },
                          
                  getSocialDrives: function()
                  {
                    //https//www.googleapis.com/analytics/v3/data/ga?ids=ga%3A74978815&dimensions=ga%3AsocialNetwork&metrics=ga%3Avisits&start-date=2013-07-23&end-date=2013-08-06&max-results=50  
                  },
                          
                  getSources: function()
                  {

                    //https//www.googleapis.com/analytics/v3/data/ga?ids=ga%3A74978815&dimensions=ga%3Asource&metrics=ga%3Avisits&start-date=2013-07-23&end-date=2013-08-06&max-results=50

                  },
                          
                  getCity: function()
                  {
                    //https//www.googleapis.com/analytics/v3/data/ga?ids=ga%3A74978815&dimensions=ga%3Acity&metrics=ga%3Avisitors&start-date=2013-07-22&end-date=2013-08-05&max-results=50
                    //ga:city 
                    //ga:visitors
                  },
                          
                  getGeo: function()
                  {
                    //https//www.googleapis.com/analytics/v3/data/ga?ids=ga%3A74978815&dimensions=ga%3AdeviceCategory&metrics=ga%3Avisitors&start-date=2013-07-22&end-date=2013-08-05&max-results=50
                    //ga:deviceCategory 
                    //ga:visitors
                  }
              }