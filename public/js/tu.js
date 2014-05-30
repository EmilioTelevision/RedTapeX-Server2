if (typeof reach == 'undefined'){var reach = {};}


 

reach.tu = {

  getInsights: function()
  {
       
     console.log('*************Gathering Insights*************');
      
      
      var $url = '//redtapedesign.com/reach/dashboard/lib/twitter_analytics_tu/api/v1/insight.php';
      
                $.ajax({
                    method: "POST",
                    url: $url,
                    dataType: "json",
                    jsonp : "callback",
                    success: function(data) {
                      
                       $.each(data, function(x,y){
                           
                            //console.log(y.prefix);
                            phtml = '';
                            
                            switch(y.prefix)
                            {
                                case 'Post rate:':
                                    
                                    phtml = '<div class="alert alert-info emphasis-0 insight-item">';
                                    phtml +='    <div class="insight-attachment-detail none">';
                                    phtml +='            <span class="label label-info"><i class="icon-white icon-ok-circle"></i> <a>Post rate:</a></span>';
                                    phtml +='            <i class="icon-twitter icon-muted"></i>';
                                    phtml += y.text;            
                                    phtml +='    </div>';
                                    phtml +='<div class="clearfix"></div>';
                                    phtml +='</div>';
                                    
                                    break;
                            
                               case 'Standouts:':
                                   phtml = '<div class="alert alert-info emphasis-0 insight-item">';
                                   phtml +='         <div class="insight-attachment-detail users">';
                                   phtml +=' <span class="label label-info"><i class="icon-white icon-user"></i> <a href="?u=therealJustIvy&amp;n=twitter&amp;d=2013-08-26&amp;s=least_likely_followers">Standouts:</a></span> ';
                                   phtml +=' <i class="icon-twitter icon-muted"></i>';
                                   phtml += y.text;


                                   phtml +='                 <div class="pull-right detail-btn"><button class="btn btn-info btn-mini" data-toggle="collapse" data-target="#flashback-9"><i class="icon-chevron-down icon-white"></i></button></div>';
                                   phtml +=' <table class="table table-condensed">';
                                   phtml +='     <tbody><tr>';
                                   phtml +='     <td class="avatar-data">';
                                   phtml +='                     <h3><a href="https://twitter.com/intent/user?user_id=128661813" title="DancingBrandee has 15,575 followers and 169 friends"><img src="//a0.twimg.com/profile_images/378800000205287395/05915c835141120ce1b57533e959b66f_normal.jpeg" class="avatar2" width="48" height="48"></a></h3>';
                                   phtml +='             </td>';
                                   phtml +='      <td>';
                                   phtml +='                     <h3><img src="/reach/dashboard/lib/twitter_analytics_tu/plugins/twitter/assets/img/favicon.png" class="service-icon2"> <a href="https://twitter.com/intent/user?user_id=128661813">Bran</a>     <small>15,575 followers</small></h3>';
                                   phtml +='             <p>Currently Choreographing for Ledisi ';
                                   phtml +=' Choreographer/Dancer/Actress/Fitness model';
                                   phtml +=' ✨“There is no revenge so complete as forgiveness.”✨';
                                   phtml +=' Lakers for life!<br><span>';
                                   phtml +='             <a href="//t.co/dmSnjdSPQr">//t.co/dmSnjdSPQr</a></span></p>';
                                   phtml +='             </td>';
                                    phtml +='    </tr>';
                                   phtml +=' </tbody></table>';




                                    phtml +='                <div class="collapse" id="flashback-9" style="height: 0px;">';

                                    phtml +='<table class="table table-condensed">';
                                    phtml +='    <tbody><tr>';
                                    phtml +='    <td class="avatar-data">';
                                    phtml +='                    <h3><a href="https://twitter.com/intent/user?user_id=249802311" title="TeamWeTheBest1 has 3,625 followers and 797 friends"><img src="//a0.twimg.com/profile_images/378800000232074307/50cc2e3cebaab692f895a071b1739536_normal.jpeg" class="avatar2" width="48" height="48"></a></h3>';
                                    phtml +='            </td>';

                                    phtml +='    <td>';
                                    phtml +='                    <h3><img src="/reach/dashboard/lib/twitter_analytics_tu/plugins/twitter/assets/img/favicon.png" class="service-icon2"> <a href="https://twitter.com/intent/user?user_id=249802311">WE THE BEST FOREVER</a>     <small>3,625 followers</small></h3>';
                                    phtml +='            <p>We The Best Music Group/YMCMB';
                                    phtml +='Marketing and Promotions<br><span>';
                                    phtml +='            <a href="//t.co/Vba9atLmT0">//t.co/Vba9atLmT0</a></span></p>';
                                    phtml +='            </td>';
                                    phtml +='    </tr>';
                                    phtml +='</tbody></table>';

                                    phtml +='<table class="table table-condensed">';
                                    phtml +='    <tbody><tr>';
                                    phtml +='    <td class="avatar-data">';
                                    phtml +='                    <h3><a href="https://twitter.com/intent/user?user_id=233838670" title="SoSyncere410 has 1,685 followers and 423 friends"><img src="//a0.twimg.com/profile_images/378800000363643389/653f1b63cafa1144bc14f2497a424a49_normal.jpeg" class="avatar2" width="48" height="48"></a></h3>';
                                    phtml +='            </td>';

                                    phtml +='    <td>';
                                    phtml +='                    <h3><img src="/reach/dashboard/lib/twitter_analytics_tu/plugins/twitter/assets/img/favicon.png" class="service-icon2"> <a href="https://twitter.com/intent/user?user_id=233838670">Syn</a>     <small>1,685 followers</small></h3>';
                                    phtml +='            <p><span>#MicLife For collabs contact <a href="mailto:SoSyncere410@gmail.com">SoSyncere410@gmail.com</a> #SynLuminati #ThaAssociation #Team21225 <a href="https://t.co/EhKlB9i6KN">https://t.co/EhKlB9i6KN</a></span><br><span>';
                                    phtml +='            <a href="//t.co/oZyWVcpmqD">//t.co/oZyWVcpmqD</a></span></p>';
                                    phtml +='            </td>';
                                    phtml +='    </tr>';
                                    phtml +='</tbody></table>';
                                    phtml +='                </div>';
                                    phtml +='        </div>';
                                    phtml +='    <div class="clearfix"></div>';
                                    phtml +='</div>';
                                    
                                    break;
                            
                               case 'Standout:':
                                   phtml = '<div class="alert alert-info emphasis-0 insight-item">';
                                   phtml +='         <div class="insight-attachment-detail users">';
                                   phtml +=' <span class="label label-info"><i class="icon-white icon-user"></i> <a href="?u=therealJustIvy&amp;n=twitter&amp;d=2013-08-26&amp;s=least_likely_followers">Standouts:</a></span> ';
                                   phtml +=' <i class="icon-twitter icon-muted"></i>';
                                   phtml += y.text;


                                   phtml +='                 <div class="pull-right detail-btn"><button class="btn btn-info btn-mini" data-toggle="collapse" data-target="#flashback-9"><i class="icon-chevron-down icon-white"></i></button></div>';
                                   phtml +=' <table class="table table-condensed">';
                                   phtml +='     <tbody><tr>';
                                   phtml +='     <td class="avatar-data">';
                                   phtml +='                     <h3><a href="https://twitter.com/intent/user?user_id=128661813" title="DancingBrandee has 15,575 followers and 169 friends"><img src="//a0.twimg.com/profile_images/378800000205287395/05915c835141120ce1b57533e959b66f_normal.jpeg" class="avatar2" width="48" height="48"></a></h3>';
                                   phtml +='             </td>';
                                   phtml +='      <td>';
                                   phtml +='                     <h3><img src="/reach/dashboard/lib/twitter_analytics_tu/plugins/twitter/assets/img/favicon.png" class="service-icon2"> <a href="https://twitter.com/intent/user?user_id=128661813">Bran</a>     <small>15,575 followers</small></h3>';
                                   phtml +='             <p>Currently Choreographing for Ledisi ';
                                   phtml +=' Choreographer/Dancer/Actress/Fitness model';
                                   phtml +=' ✨“There is no revenge so complete as forgiveness.”✨';
                                   phtml +=' Lakers for life!<br><span>';
                                   phtml +='             <a href="//t.co/dmSnjdSPQr">//t.co/dmSnjdSPQr</a></span></p>';
                                   phtml +='             </td>';
                                    phtml +='    </tr>';
                                   phtml +=' </tbody></table>';




                                    phtml +='                <div class="collapse" id="flashback-9" style="height: 0px;">';

                                    phtml +='<table class="table table-condensed">';
                                    phtml +='    <tbody><tr>';
                                    phtml +='    <td class="avatar-data">';
                                    phtml +='                    <h3><a href="https://twitter.com/intent/user?user_id=249802311" title="TeamWeTheBest1 has 3,625 followers and 797 friends"><img src="//a0.twimg.com/profile_images/378800000232074307/50cc2e3cebaab692f895a071b1739536_normal.jpeg" class="avatar2" width="48" height="48"></a></h3>';
                                    phtml +='            </td>';

                                    phtml +='    <td>';
                                    phtml +='                    <h3><img src="/reach/dashboard/lib/twitter_analytics_tu/plugins/twitter/assets/img/favicon.png" class="service-icon2"> <a href="https://twitter.com/intent/user?user_id=249802311">WE THE BEST FOREVER</a>     <small>3,625 followers</small></h3>';
                                    phtml +='            <p>We The Best Music Group/YMCMB';
                                    phtml +='Marketing and Promotions<br><span>';
                                    phtml +='            <a href="//t.co/Vba9atLmT0">//t.co/Vba9atLmT0</a></span></p>';
                                    phtml +='            </td>';
                                    phtml +='    </tr>';
                                    phtml +='</tbody></table>';

                                    phtml +='<table class="table table-condensed">';
                                    phtml +='    <tbody><tr>';
                                    phtml +='    <td class="avatar-data">';
                                    phtml +='                    <h3><a href="https://twitter.com/intent/user?user_id=233838670" title="SoSyncere410 has 1,685 followers and 423 friends"><img src="//a0.twimg.com/profile_images/378800000363643389/653f1b63cafa1144bc14f2497a424a49_normal.jpeg" class="avatar2" width="48" height="48"></a></h3>';
                                    phtml +='            </td>';

                                    phtml +='    <td>';
                                    phtml +='                    <h3><img src="/reach/dashboard/lib/twitter_analytics_tu/plugins/twitter/assets/img/favicon.png" class="service-icon2"> <a href="https://twitter.com/intent/user?user_id=233838670">Syn</a>     <small>1,685 followers</small></h3>';
                                    phtml +='            <p><span>#MicLife For collabs contact <a href="mailto:SoSyncere410@gmail.com">SoSyncere410@gmail.com</a> #SynLuminati #ThaAssociation #Team21225 <a href="https://t.co/EhKlB9i6KN">https://t.co/EhKlB9i6KN</a></span><br><span>';
                                    phtml +='            <a href="//t.co/oZyWVcpmqD">//t.co/oZyWVcpmqD</a></span></p>';
                                    phtml +='            </td>';
                                    phtml +='    </tr>';
                                    phtml +='</tbody></table>';
                                    phtml +='                </div>';
                                    phtml +='        </div>';
                                    phtml +='    <div class="clearfix"></div>';
                                    phtml +='</div>';
                                    
                                    break;
                                
                                
                            
                               case 'Amplifier:':
                                    phtml =' <div class="alert alert-info emphasis-0 insight-item">';
                                    phtml +=' <span class="label label-info"><i class="icon-white icon-bullhorn"></i> <a href="?u=therealJustIvy&amp;n=twitter&amp;d=2013-08-20&amp;s=amplifier_12">Amplifier:</a></span> ';

                                    phtml +=' <i class="icon-twitter icon-muted"></i>';
                                    phtml +=y.text;

                                    phtml +=' <div class="insight-attachment-detail post">';

                                    phtml +='<table class="table table-condensed lead">';
                                    phtml +='     <tbody><tr>';
                                    phtml +='     <td class="avatar-data">';
                                    phtml +='             <a href="https://twitter.com/intent/user?user_id=1613550950" title="therealJustIvy"><img src="//a0.twimg.com/profile_images/378800000172433281/7c2e3435a4c7882aa9cec0c423ee1ced_normal.png" class="" width="48" height="48"></a>';
                                    phtml +='     </td>';
                                    phtml +='     <td>';
                                    phtml +='              <div class="post">RT <a href="https://twitter.com/intent/user?screen_name=HOTFMOWERRI995">@HOTFMOWERRI995</a>: <a href="https://twitter.com/intent/user?screen_name=SolidC2002">@SolidC2002</a> is now playing PARADISE by <a href="https://twitter.com/intent/user?screen_name=therealJustIvy">@therealJustIvy</a> feat. <a href="https://twitter.com/intent/user?screen_name=Akon">@Akon</a> on <a href="https://twitter.com/intent/user?screen_name=HOTFMOWERRI995">@HOTFMOWERRI995</a>! #DriveIn';

                                    phtml +='                             <p class="twitter-bio-info">';
                                    phtml +='                 <a href="//twitter.com/1613550950/statuses/369852084159782912">12:03 PM - 20 Aug 13</a>';

                                    phtml +='                 &nbsp;&nbsp;';
                                    phtml +='                 <a href="//twitter.com/intent/tweet?in_reply_to=369852084159782912"><i class="icon icon-reply" title="reply"></i></a>';
                                    phtml +='                 <a href="//twitter.com/intent/retweet?tweet_id=369852084159782912"><i class="icon icon-retweet" title="retweet"></i></a>';
                                    phtml +='                 <a href="//twitter.com/intent/favorite?tweet_id=369852084159782912"><i class="icon icon-star-empty" title="favorite"></i></a>';
                                    phtml +='                 </p>';
                                    phtml +='                     </div> <!-- end body of post div -->';

                                    phtml +='     </td>';
                                    phtml +='     </tr>';
                                    phtml +=' </tbody></table></div>';

                                    phtml +='     <div class="clearfix"></div>';
                                    phtml +=' </div>';
                                   break;    
                       
                            }
                        
                            $('.table-key-insights').append(phtml);
                        
                       });

                    }
                });
      
  }
  
}