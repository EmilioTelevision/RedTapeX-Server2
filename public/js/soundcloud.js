if (typeof reach == 'undefined'){var reach = {};}


// initialize client with app credentials
 SC.initialize({
                        client_id: 'bce52676d0d792ac0f0fce48662a11d7',
                      });

reach.soundcloud = {
  
  plays: 0,
  auth: function()
  {
    
      // initiate auth popup
        SC.connect(function() {
          SC.get('/me', function(me) { 
            alert('Hello, ' + me.username); 
          });
        });
      
  },
  
  getData: function()
                  {
                    

                      this.getTracks();
                      this.getUser();
                  },
  getTracks: function()
  {
      
      SC.get("/users/52726280/tracks", {limit: 50}, function(tracks){
       
      $.each(tracks, function(x, track){
        
          reach.soundcloud.plays = reach.soundcloud.plays + track.playback_count;
       });
       
        total_page_impresions =  reach.soundcloud.plays;
        
        $('#keyMetrics .soundcloud').find('.totalbox').html(reach.visuals.roundlarge(total_page_impresions));
      
                      var phtml = '<tr><td><i class="stats-source-icon left icon-blogs"></i>';
                      phtml += '<b class="source-name">SoundCloud</b></td>'
                      phtml += '<td>TheRealJustIvy</td>';
                      phtml += '<td class="longtd">';
                      phtml += '<div class="statistic-bar br-2"> <span class="carret equal"></span> <div class="statistic-bar-content br-2 blogs" style="right: auto; width: 40%;"></div> </div>';
                      phtml += '</td>';
                       phtml += '<td data-reach="'+total_page_impresions+'">'+reach.visuals.roundlarge(total_page_impresions)+'</td>';
                      phtml += '<td><button type="button" class="btn btn-default bt-red">Boost</button></td>';
                      phtml += '</tr>';
                      $('.owned-media-pages').append(phtml);
                      
                      reach.visuals.calibrateTables();
       
       
        });
  },
  
  getUser: function()
  {
      ///users
      /*
       * "track_count": 12,
         "playlist_count": 1,
         "followers_count": 417,
         "followings_count": 174,
         "public_favorites_count": 26
       */
  }
  
}