if (typeof reach == 'undefined'){var reach = {};}




reach.spotify = {

getUser: function()
  {
                var $url = 'http://ws.spotify.com/search/1/track.json?q=justivy';

                $.ajax({
                    method: "GET",
                    url: $url,
                    dataType: "json",
                    jsonp : "callback",
                    success: function(data) {
                      
                      //populatiry: data.tracks[0]
                      
                      total_page_impresions =  data.tracks[0];
                     
                      var phtml = '<tr><td><i class="stats-source-icon left icon-videos"></i>';
                      phtml += '<b class="source-name">Youtube</b></td>'
                      phtml += '<td>TheRealJustIvy</td>';
                      phtml += '<td class="longtd">';
                      phtml += '<div class="statistic-bar br-2"> <span class="carret equal"></span> <div class="statistic-bar-content br-2 videos" style="right: auto; width: 40%;"></div> </div>';
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
                     
                    
                      this.getUser();
                  }

}

