if (typeof reach == 'undefined'){var reach = {};}




reach.klout = {
  
  score: 0,
  week: 0,
  day: 0,
  month: 0,
 
  getSingleScore: function(user)
  {
       
     
      /*
      
      var $url = '//api.klout.com/v2/identity.json/twitter?screenName='+user+'&key=5hz6hfa3dspw5rkkk8xz8r3x';
      
       setTimeout(function(){

                $.ajax({
                    method: "GET",
                    url: $url,
                    dataType: "jsonp",
                    jsonp : "callback",
                    success: function(data) {
                      
                      //console.log('found user id');
                    
                      
                      uid = data.id;
                      
                      var $url = '//api.klout.com/v2/user.json/'+uid+'/score?key=5hz6hfa3dspw5rkkk8xz8r3x';

                      setTimeout(function(){
                      
                        $.ajax({
                            method: "GET",
                            url: $url,
                            dataType: "jsonp",
                            jsonp : "callback",
                            success: function(data) {
                              reach.klout.score = data.score;
                              reach.klout.day = data.scoreDelta.dayChange;
                              reach.klout.week = data.scoreDelta.weekChange;
                              reach.klout.month = data.scoreDelta.monthChange;
                              
                            
                              //console.log('score:'+data.score);
                              
                              $('.'+user).html(Math.round(data.score));
                              
                              //return Math.round(data.score);
                              
                              
                             
                            }
                        });
                      
                      },900);
                      
                      
                    }
                });
                
                 },900);
                
       */
      
  },
  getScore: function(user)
  {
      /*

       var $url = '//api.klout.com/v2/identity.json/twitter?screenName='+user+'&key=5hz6hfa3dspw5rkkk8xz8r3x';

                $.ajax({
                    method: "GET",
                    url: $url,
                    dataType: "jsonp",
                    jsonp : "callback",
                    success: function(data) {
                      
                      uid = data.id;
                      
                      var $url = '//api.klout.com/v2/user.json/'+uid+'/score?key=5hz6hfa3dspw5rkkk8xz8r3x';

                        $.ajax({
                            method: "GET",
                            url: $url,
                            dataType: "jsonp",
                            jsonp : "callback",
                            success: function(data) {
                              reach.klout.score = data.score;
                              reach.klout.day = data.scoreDelta.dayChange;
                              reach.klout.week = data.scoreDelta.weekChange;
                              reach.klout.month = data.scoreDelta.monthChange;
                              
                              $('.total-kscore').html(Math.round(data.score*1));
                              
                            }
                        });
                      
                      
                      
                      
                    }
                });
                
                
       
*/
       
  }
            
}
