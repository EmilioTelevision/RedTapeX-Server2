if (typeof reach == 'undefined'){var reach = {};}

reach.mention = {
    
    allData: [],
    totalMentions: 0,
    getTotals: function()
    {
        var cards = $('#stats-by-source-ctn').find('.card-row');
     
        this.totalMentions = 0;
     
        if (typeof reach.mention.allData.web != 'undefined'){ 
            
            var web = this.allData.web.length;
            $(cards[0]).find('.statistic-details-number .value').html(web);
            this.totalMentions = this.totalMentions + this.allData.web.length;
        }
        
        if (typeof reach.mention.allData.videos != 'undefined'){ 
            
            var vid = this.allData.videos.length;
            $(cards[5]).find('.statistic-details-number .value').html(vid);
            this.totalMentions = this.totalMentions + this.allData.web.length;
        
        }
        
        if (typeof reach.mention.allData.news != 'undefined'){ 
            
            var news = this.allData.news.length;
            $(cards[3]).find('.statistic-details-number .value').html(news);
            this.totalMentions = this.totalMentions + this.allData.web.length;
        
        }
        
        if (typeof reach.mention.allData.facebook != 'undefined'){ 
            
            var fb = this.allData.facebook.length;
            $(cards[1]).find('.statistic-details-number .value').html(fb);
            this.totalMentions = this.totalMentions + this.allData.web.length;
        
        }
        
        if (typeof reach.mention.allData.twitter != 'undefined'){ 
            
            var tw = this.allData.twitter.length;
            $(cards[2]).find('.statistic-details-number .value').html(tw);
            this.totalMentions = this.totalMentions + this.allData.web.length;
        
        }
        
        if (typeof reach.mention.allData.blogs != 'undefined'){ 
            
            var blog = this.allData.blogs.length;
            $(cards[5]).find('.statistic-details-number .value').html(blog);
            this.totalMentions = this.totalMentions + this.allData.web.length;
        
        }
        
        if (typeof reach.mention.allData.forums != 'undefined'){ 
            
            var form = this.allData.forums.length;
            $(cards[6]).find('.statistic-details-number .value').html(form);
            this.totalMentions = this.totalMentions + this.allData.web.length;
        
        }
        
        if (typeof reach.mention.allData.images != 'undefined'){ 
            
            var img = this.allData.images.length;
            $(cards[7]).find('.statistic-details-number .value').html(img);
            this.totalMentions = this.totalMentions + this.allData.web.length;
        
        }
        
     
        $('.total-alerts').html(reach.visuals.roundlarge(this.totalMentions));
      
      
      
      

    },
    getFavatars: function(url)
    {
      
      $('.getfavs').each(function(x,y){
      
          var url = $(this).data('url');
          var id =  $(this).data('id');
    
            var params = {
                url: url,
                api_key: '5i7mmsvje348ws0ockgkcsokg4ocgkws48so808ksowoco8kw4',
                format: 'json',
           };

           $.getJSON('//favatar.mention.net/image?callback=?', params, function(result) {
              
              try{
               $('#'+id).attr('src', 'data:image/png;base64,'+result.body.data);
              }catch(e)
              {
                  
              }
           
           });
           
      });

        
    },
    getOthers: function()
    {
      
        $.post('//redtapedesign.com/reach/dashboard/lib/getmention.php?type=facebook', function(data) {
             reach.mention.allData.facebook = data.mentions;
              reach.mention.getTotals();
        }, "json");
        
        $.post('//redtapedesign.com/reach/dashboard/lib/getmention.php?type=twitter', function(data) {
             reach.mention.allData.twitter = data.mentions;
              reach.mention.getTotals();
        }, "json");
        
        $.post('//redtapedesign.com/reach/dashboard/lib/getmention.php?type=blogs', function(data) {
             reach.mention.allData.blogs = data.mentions;
              reach.mention.getTotals();
        }, "json");
        
         $.post('//redtapedesign.com/reach/dashboard/lib/getmention.php?type=forums', function(data) {
             reach.mention.allData.forums = data.mentions;
              reach.mention.getTotals();
        }, "json");
        
         $.post('//redtapedesign.com/reach/dashboard/lib/getmention.php?type=images', function(data) {
             reach.mention.allData.images = data.mentions;
              reach.mention.getTotals();
        }, "json");
        
       
    },
    getVideos: function()
    {
        
        
        //console.log('creating mention table....');
        
        
        $.post('//redtapedesign.com/reach/dashboard/lib/getmention.php?type=videos', function(data) {
          
          reach.mention.allData.videos = data.mentions;
          
          $.each(data.mentions, function(x,y){
           
           
           var phtml = '';
           
           
           
           phtml =  '<div class="media" data-url="'+y.url+'" onclick="reach.visuals.frame(\''+y.url+'\')">';
           phtml +=     '     <div class="media-body">';
           phtml +=     '<img class="media-object size34" id="'+y.id+'" src="'+y.picture_url+'" data-url="'+y.url+'" data-id="'+y.id+'">',
           phtml +=     '<abbr class="pull-right timeago" title="'+y.published_at+'">'+y.published_at+'</abbr>';
           
           phtml +=     '       <h4 class="media-heading">'+y.source_name+'</h4>';
           phtml +=     y.title;
           phtml +=     '     </div>';
           phtml +=     '   </div><hr>';
           
           $('.newsweb .panel').append(phtml);
        });
         
         reach.mention.getFavatars();
              $("abbr.timeago").timeago();
           reach.mention.getTotals();
        
         }, "json");
        
    },
    getNews: function()
    {
      
     
        
        //console.log('creating mention table....');
        
        $.post('//redtapedesign.com/reach/dashboard/lib/getmention.php?type=news', function(data) {
          
          reach.mention.allData.news = data.mentions;
          
          
          $.each(data.mentions, function(x,y){
           
        
          if (y.source_name != 'craigslist.org')
              {
           
                    var phtml = '';

                    reach.visuals.attribution_to_source(y.url);

                    phtml =  '<div class="media" data-url="'+y.url+'" onclick="reach.visuals.frame(\''+y.url+'\')">';
                    phtml +=     '     <div class="media-body">';
                    phtml +=     '<img class="media-object size34 getfavs" id="'+y.id+'" data-url="'+y.url+'" data-id="'+y.id+'">',
                    phtml +=     '<abbr class="pull-right timeago" title="'+y.published_at+'">'+y.published_at+'</abbr>';

                    phtml +=     '       <h4 class="media-heading">'+y.source_name+'</h4>';
                    phtml +=     y.title;
                    phtml +=     '     </div>';
                    phtml +=     '   </div><hr>';

                    $('.newsweb .panel').append(phtml);
              }
        });
         
         reach.mention.getFavatars();
              $("abbr.timeago").timeago();
           reach.mention.getTotals();
        
         }, "json");
         
         
         
         $.post('//redtapedesign.com/reach/dashboard/lib/getmention.php?type=blogs', function(data) {
          
          reach.mention.allData.news = data.mentions;
          
          
          $.each(data.mentions, function(x,y){
           
        
             if (y.source_name != 'craigslist.org')
              {
           
           
                    var phtml = '';

                    reach.visuals.attribution_to_source(y.url);

                    phtml =  '<div class="media" data-url="'+y.url+'" onclick="reach.visuals.frame(\''+y.url+'\')">';
                    phtml +=     '     <div class="media-body">';
                    phtml +=     '<img class="media-object size34 getfavs" id="'+y.id+'" data-url="'+y.url+'" data-id="'+y.id+'">',
                    phtml +=     '<abbr class="pull-right timeago" title="'+y.published_at+'">'+y.published_at+'</abbr>';

                    phtml +=     '       <h4 class="media-heading">'+y.source_name+'</h4>';
                    phtml +=     y.title;
                    phtml +=     '     </div>';
                    phtml +=     '   </div><hr>';

                    $('.newsweb .panel').append(phtml);
           
              }
           
        });
         
         reach.mention.getFavatars();
              $("abbr.timeago").timeago();
           reach.mention.getTotals();
        
         }, "json");
         
         
    },
    getMentions: function()
    {
        
        reach.mention.allData.web = new Object();
        /*
        
        $.post('//redtapedesign.com/reach/dashboard/lib/getmention.php?type=web', function(data) {
        
            reach.mention.allData.web = data.mentions;
            
          
          $.each(data.mentions, function(x,y){
           
           
            if (y.source_name != 'craigslist.org')
              {
           
           
                var phtml = '';

                reach.visuals.attribution_to_source(y.url);

                phtml =  '<div class="media" data-url="'+y.url+'" onclick="reach.visuals.frame(\''+y.url+'\')">';
                phtml +=     '     <div class="media-body">';
                phtml +=     '<img class="media-object size34 getfavs" id="'+y.id+'" data-url="'+y.url+'" data-id="'+y.id+'">',
                phtml +=     '<abbr class="pull-right timeago" title="'+y.published_at+'">'+y.published_at+'</abbr>';

                phtml +=     '       <h4 class="media-heading">'+y.source_name+'</h4>';
                phtml +=     y.title;
                phtml +=     '     </div>';
                phtml +=     '   </div><hr>';

                $('.newsweb .panel').append(phtml);
                
              }
                
             });

              reach.mention.getFavatars();
              $("abbr.timeago").timeago();
           reach.mention.getTotals();
        
         }, "json");
        
         */
        
    }
   
}

