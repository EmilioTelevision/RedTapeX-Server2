if (typeof reach == 'undefined'){var reach = {};}


 

reach.twitter = {
                  
                  allData: [],
                  twitter_impressions: 0,
                  twitter_actions: 0,
                  cost: 0,
                  getActiveRTs: function()
                  {
                      var $url = '//redtapedesign.com/reach/dashboard/lib/twitter/myrts.php';

                        $.ajax({
                            method: "GET",
                            url: $url,
                            dataType: "json",
                            success: function(data) {
                                
                                var total_mentions = 0;
                                
                            $.each(data.statuses, function(x,y){    
                                //reach.visuals.attribution_to_source(y.url);
                                total_mentions++;
                                
                                phtml =  '<div class="media" data-url="'+y.url+'" onclick="reach.visuals.frame(\''+y.url+'\')">';
                                phtml +=     '     <div class="media-body">';
                                phtml +=     '<img class="media-object size34" src="'+y.user.profile_image_url+'"><div class="ksc '+y.user.screen_name+'">0</div>',
                                phtml +=     '<abbr class="pull-right timeagob" title="'+y.created_at+'">'+y.created_at+'</abbr>';

                                phtml +=     '       <h4 class="media-heading">'+y.user.name+'</h4>';
                                phtml +=     y.text;
                                phtml +=     '     </div>';
                                phtml +=     '   </div><hr>';
                                
                                
                                $('.myrts .panel').append(phtml);
                                //console.log(y.user.screen_name);
                                
                                setTimeout(function(){reach.klout.getSingleScore(y.user.screen_name);},100)
                                
                                
                             });

                              
                              $("abbr.timeago").timeago();
                              $('.total-social-alerts').html(total_mentions);
                                
                            }
                        });
              
                  },
                  getMentions: function()
                  {
              
                    var $url = '//redtapedesign.com/reach/dashboard/lib/twitter/mentions.php?q=therealjustivy';

                        $.ajax({
                            method: "GET",
                            url: $url,
                            dataType: "json",
                            success: function(data) {
                                
                                var total_mentions = 0;
                                
                            $.each(data.statuses, function(x,y){    
                                //reach.visuals.attribution_to_source(y.url);
                                total_mentions++;
                                
                                phtml =  '<div class="media" data-url="'+y.url+'" onclick="reach.visuals.frame(\''+y.url+'\')">';
                                phtml +=     '     <div class="media-body">';
                                phtml +=     '<img class="media-object size34" src="'+y.user.profile_image_url+'"><div class="ksc '+y.user.screen_name+'">0</div>',
                                phtml +=     '<abbr class="pull-right timeagob" title="'+y.created_at+'">'+y.created_at+'</abbr>';

                                phtml +=     '       <h4 class="media-heading">'+y.user.name+'</h4>';
                                phtml +=     y.text;
                                phtml +=     '     </div>';
                                phtml +=     '   </div><hr>';
                                
                                
                                $('.socialweb .panel').append(phtml);
                                //console.log(y.user.screen_name);
                                
                                setTimeout(function(){reach.klout.getSingleScore(y.user.screen_name);},100)
                                
                                
                             });

                              
                              $("abbr.timeago").timeago();
                              $('.total-social-alerts').html(total_mentions);
                                
                            }
                        });
              
                    
              
                  },
                  getUser: function()
                  {

                  
                      var $url = '//redtapedesign.com/reach/dashboard/lib/twitter/';

                        $.ajax({
                            method: "GET",
                            url: $url,
                            dataType: "json",
                            success: function(data) {

                            total_page_impresions =  data.followers_count;

                            $('#keyMetrics .twitterall').find('.totalbox').html(reach.visuals.roundlarge(total_page_impresions));

                              var phtml = '<tr><td><i class="stats-source-icon left icon-twitter"></i>';
                              phtml += '<b class="source-name">Twitter</b></td>'
                              phtml += '<td>TheRealJustIvy</td>';
                              phtml += '<td class="longtd">';
                              phtml += '<div class="statistic-bar br-2"> <span class="carret equal"></span> <div class="statistic-bar-content br-2 twitter" style="right: auto; width: 40%;"></div> </div>';
                              phtml += '</td>';
                               phtml += '<td data-reach="'+total_page_impresions+'">'+reach.visuals.roundlarge(total_page_impresions)+'</td>';
                              phtml += '<td><button type="button" class="btn btn-default bt-red">Boost</button></td>';
                              phtml += '</tr>';
                              $('.owned-media-pages').append(phtml);
                              
                              reach.visuals.calibrateTables();


                            }
                        });
                      
                  

                  },
                  getData: function()
                  {
                     
                     reach.twitter.ads();
                     reach.twitter.getUser();
                     reach.twitter.getMentions();
                     reach.twitter.getActiveRTs();
             
                  },
                  ads: function()
                  {
                    reach.visuals.loader('show');
                    reach.twitter.allData.stub_ads = [{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-01 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-02 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-03 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-04 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-05 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-06 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-07 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-08 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":27514,"total engagements":60,"retweets":"0","replies":"0","follows":60,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.00218070800319837,"product type":"Account","currency":"USD","eCPE/CPF":1.6235,"spend":97.41,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-09 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":17791,"total engagements":56,"retweets":"0","replies":"0","follows":56,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":2,"engagement/follow rate":0.0031476589286718,"product type":"Account","currency":"USD","eCPE/CPF":1.78571428571429,"spend":100.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-10 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":15378,"total engagements":67,"retweets":"0","replies":"0","follows":67,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":2,"engagement/follow rate":0.0043568734555859,"product type":"Account","currency":"USD","eCPE/CPF":1.46164179104478,"spend":97.93,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-11 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":31648,"total engagements":59,"retweets":"0","replies":"0","follows":59,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.00186425682507583,"product type":"Account","currency":"USD","eCPE/CPF":1.59101694915254,"spend":93.87,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-12 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":24344,"total engagements":53,"retweets":"0","replies":"0","follows":53,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":2,"engagement/follow rate":0.00217712783437397,"product type":"Account","currency":"USD","eCPE/CPF":1.77075471698113,"spend":93.85,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-13 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-14 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-15 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-16 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-17 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-18 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-19 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-20 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-21 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474688,"campaign":"Promoted Ivy Account","time":"2013-08-22 00:00 -0700","campaign start date":"2013-08-07 16:52 -0700","campaign end date":"2013-08-12 23:59 -0700","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Account","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":516.94,"current bid":3.00,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-01 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-02 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-03 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-04 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-05 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-06 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-07 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-08 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":18669,"total engagements":1196,"retweets":"1","replies":"0","follows":1,"clicks":1192,"favorites":2,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.0640634206438481,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0.0836120401337793,"spend":100.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-09 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":10280,"total engagements":493,"retweets":"0","replies":"0","follows":1,"clicks":491,"favorites":1,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.0479571984435798,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0.202839756592292,"spend":100.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-10 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":14530,"total engagements":638,"retweets":"0","replies":"0","follows":0,"clicks":637,"favorites":1,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.0439091534755678,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0.156739811912226,"spend":100.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-11 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":17961,"total engagements":738,"retweets":"0","replies":"0","follows":1,"clicks":735,"favorites":2,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.0410890262234842,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0.133631436314363,"spend":98.62,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-12 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":14803,"total engagements":717,"retweets":"0","replies":"1","follows":1,"clicks":713,"favorites":2,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.04843612781193,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0.139470013947001,"spend":100.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-13 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":13754,"total engagements":625,"retweets":"0","replies":"0","follows":4,"clicks":621,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.0454413261596626,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0.15968,"spend":99.8,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-14 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":16744,"total engagements":650,"retweets":"0","replies":"0","follows":1,"clicks":649,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.0388198757763975,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0.153846153846154,"spend":100.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-15 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":14434,"total engagements":495,"retweets":"0","replies":"0","follows":3,"clicks":492,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.0342940279894693,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0.202020202020202,"spend":100.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-16 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":14939,"total engagements":491,"retweets":"0","replies":"1","follows":0,"clicks":490,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.032866992435906,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0.203665987780041,"spend":100.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-17 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":16715,"total engagements":525,"retweets":"0","replies":"0","follows":0,"clicks":525,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.031408914148968,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0.182952380952381,"spend":96.05,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-18 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":3050,"total engagements":121,"retweets":"0","replies":"0","follows":0,"clicks":121,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0.039672131147541,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0.045702479338843,"spend":5.53,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-19 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-20 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-21 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0},{"id":1474696,"campaign":"New Paradise Single","time":"2013-08-22 00:00 -0700","campaign start date":"2013-08-07 16:58 -0700","campaign end date":"-","impressions":0,"total engagements":0,"retweets":"0","replies":"0","follows":0,"clicks":0,"favorites":0,"leads submitted":"0","unfollows":0,"engagement/follow rate":0,"product type":"Interests in timeline","currency":"USD","eCPE/CPF":0,"spend":0.0,"current remaining budget":0.0,"current bid":1.85,"current daily budget":100.0,"current total budget":1000.0}];
                    newads = {};
                    $.each(reach.twitter.allData.stub_ads, function(x,y)
                    {
                        
                        reach.twitter.twitter_impressions =  reach.twitter.twitter_impressions + y.impressions;
                        reach.twitter.twitter_actions =  reach.twitter.twitter_actions + y.clicks;      
                         
                       
                        var cost = Math.round(1.538 * y.spend);
                        
                        reach.twitter.cost =  reach.twitter.cost + cost;      
                        
                        
                        
                        
                       if (newads[y.campaign])
                        {
                            
                          
                          
                            newads[y.campaign].impressions = newads[y.campaign].impressions + y.impressions;
                            
                            newads[y.campaign].clicks = newads[y.campaign].clicks + y.clicks;
                           
                            newads[y.campaign].actions = newads[y.campaign].actions + y['total engagements'];
                            newads[y.campaign].cost = newads[y.campaign].cost + cost;
                        
                        } 
                            else
                        {
                            
                             var obj = {
                                impressions: y.impressions,
                                clicks: y.clicks,
                              
                                actions: y['total engagements'],
                                cost: cost
                            }
                            
                            newads[y.campaign] = obj;
    
                                
                        }

                    });
                    
                    
                     var x = $('.paid-total-impressions').data('action');
                        if(x=='0') x = 1;
                        x = parseInt(x) + reach.twitter.twitter_impressions;
                        $('.paid-total-impressions').html(reach.visuals.roundlarge(x));
                        $('.paid-total-impressions').data('action', x);
                        
                        var x = $('.paid-total-engagements').data('action');
                        if(x=='0') x = 1;
                        x = parseInt(x) +  reach.twitter.twitter_actions;
                        $('.paid-total-engagements').html(reach.visuals.roundlarge(x));
                        $('.paid-total-engagements').data('action', x);
                    
                    reach.twitter.allData.computedAds = newads;
                   
                   
                     $.each(newads, function(x,y){
                        
                        
                        var cost = Math.round(1.538 * y.cost);
                        
                        var engagements = y.clicks + y.actions;
                        
                        var promotion = '<i class="stats-source-icon left icon-twitter"></i>'+x;
                            
                        
                        $('.table-paid-promotions').append('<tr><td>'+promotion+'</td><td>'+y.impressions+'</td><td>'+engagements+'</td><td>$'+cost+'</td></tr>');
                    });
                    reach.visuals.loader('hide');
                    
                    
                    
                  }
}
                  

/*
  5DEptbx1BvcMOSVIgSSr8Q
  
  //api.twitter.com/version/users/show.format

user_id
screen_name

https://api.twitter.com/1/users/show.json?screen_name=TwitterAPI&include_entities=true

{
  "profile_sidebar_fill_color": "e0ff92",
  "name": "Twitter API",
  "profile_sidebar_border_color": "87bc44",
  "profile_background_tile": false,
  "created_at": "Wed May 23 06:01:13 +0000 2007",
  "profile_image_url": "//a3.twimg.com/profile_images/689684365/api_normal.png",
  "location": "San Francisco, CA",
  "follow_request_sent": false,
  "id_str": "6253282",
  "profile_link_color": "0000ff",
  "is_translator": false,
  "contributors_enabled": true,
  "url": "//dev.twitter.com",
  "favourites_count": 15,
  "utc_offset": -28800,
  "id": 6253282,
  "profile_use_background_image": true,
  "listed_count": 6868,
  "profile_text_color": "000000",
  "protected": false,
  "followers_count": 335343,
  "lang": "en",
  "notifications": false,
  "geo_enabled": true,
  "profile_background_color": "c1dfee",
  "verified": true,
  "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",
  "time_zone": "Pacific Time (US & Canada)",
  "profile_background_image_url": "//a3.twimg.com/profile_background_images/59931895/twitterapi-background-new.png",
  "friends_count": 20,
  "statuses_count": 2404,
  "status": {
    "coordinates": null,
    "created_at": "Wed Dec 22 20:08:02 +0000 2010",
    "favorited": false,
    "truncated": false,
    "id_str": "17672734540570624",
    "entities": {
      "urls": [
        {
          "expanded_url": "//tumblr.com/xnr140f9mi",
          "url": "//t.co/37zl2jI",
          "indices": [
            93,
            112
          ],
          "display_url": "tumblr.com/xnr140f9mi"
        }
      ],
      "hashtags": [
 
      ],
      "user_mentions": [
 
      ]
    },
    "in_reply_to_user_id_str": null,
    "contributors": null,
    "text": "Twitter downtime - Twitter is currently down. We are aware of the problem and working on it. //t.co/37zl2jI",
    "id": 17672734540570624,
    "retweet_count": 30,
    "in_reply_to_status_id_str": null,
    "geo": null,
    "retweeted": false,
    "in_reply_to_user_id": null,
    "source": "<a href=\"//www.tumblr.com/\" rel=\"nofollow\">Tumblr</a>",
    "in_reply_to_screen_name": null,
    "place": null,
    "in_reply_to_status_id": null
  },
  "following": true,
  "screen_name": "twitterapi",
  "show_all_inline_media": false
}

 */
