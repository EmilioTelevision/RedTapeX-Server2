if (typeof reach == 'undefined'){var reach = {};}


reach.instagram = {
  
  plays: 0,
  
  getUser: function()
  {
                var $url = 'https://api.instagram.com/v1/users/478161607?access_token=6212183.1fb234f.665672e0df6b449b811bc4ecb2d06f73';

                $.ajax({
                    method: "GET",
                    url: $url,
                    dataType: "jsonp",
                    jsonp : "callback",
                    success: function(data) {
                      
                      total_page_impresions =  data.data.counts.followed_by;
                     
                      $('#keyMetrics .instagram').find('.totalbox').html(reach.visuals.roundlarge(total_page_impresions));
                     
                      var phtml = '<tr><td><i class="stats-source-icon left icon-images"></i>';
                      phtml += '<b class="source-name">Instagram</b></td>'
                      phtml += '<td>TheRealJustIvy</td>';
                      phtml += '<td class="longtd">';
                      phtml += '<div class="statistic-bar br-2"> <span class="carret equal"></span> <div class="statistic-bar-content br-2 images" style="right: auto; width: 40%;"></div> </div>';
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
                  },

}


