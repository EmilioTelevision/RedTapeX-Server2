  if (typeof reach == 'undefined'){var reach = {};}


function merge(obj1, obj2)
{
       drawchrt = obj2;
        $.each(obj2, function(fx, fy)
            {
                $.each(obj1, function(gx, gy)
                {
                    if(fy.day == gy.day)
                        {
                            drawchrt[gx].value = parseInt(fy.value)+parseInt(gy.value);
                        }
                });
            });
        
        //console.log('<<<<<<<');
        //console.log(drawchrt);
        
        return drawchrt;
            /*    
            for (var p in obj2) {
                                try {
                                   
                                    
                                 if (p == 'coords' || p=='raw')
                                        {
                                            if (typeof obj1[p] == 'undefined') obj1[p]="";
                                            obj1[p] += ","+obj2[p];
                                        }

                                  // Property in destination object set; update its value.
                                  else 

                                      if ( obj2[p].constructor==Object ) {

                                    obj1[p] = merge(obj1[p], obj2[p]);

                                  } else {



                                        if (typeof obj1[p] == 'undefined')obj1[p]=0;
                                            
                                      
                                      
                                        
                                        if( p == 'day')
                                            {
                                               //lets not add the dates together
                                               //console.log('date:'+ obj1[p]);
                                            } else {
                                                //console.log('val:'+obj1[p]);
                                                //console.log(typeof obj1[p]);
                                                
                
                                                 //lets add the values together
                                                 if (p == 'value'){
                                                    tmp = parseInt(obj1[p]) + parseInt(obj2[p]);
                                                    if(isNaN(tmp) == false)
                                                        {
                                                             obj1[p] = tmp;
                                                        }
                                                   
                                                 }
                                                 
                                            }
                                        





                                  }

                                } catch(e) {
                                  // Property in destination object not set; create it and set its value.
                                  obj1[p] = obj2[p];

                                }
                              }

                               //return obj1;

                      
                     
                                var flags = [], output = [], l = obj1.length, i;
                                for( i=0; i<l; i++) {
                                    if(flags[obj1[i].day]) continue;
                                    flags[obj1[i].day] = true;
                                    output.push(obj1[i]);
                                }

                              return output;
                      */       
}



$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
               
                $('#mainmenu').find('.btn-primary').addClass('btn-default');
                $('#mainmenu').find('.btn-primary').removeClass('btn-primary');
                
                $(e.target).addClass('btn-primary');
               
                reach.visuals.redrawCharts();
                //e.relatedTarget // previous tab
              })

 
  
//charting class
              reach.visuals = {
                   allChartData: [],
                   devicePie: [],
                   allChartData_promotions: [],
                   
                   loader: function(method)
                   {
                     if (method == 'show') {
                         $('.app-loader').css('display', 'block');
                     } else {
                       $('.app-loader').css('display', 'none');
                     }
                   },
                   
                   MergeRecursiveObjectsb: function(obj1, obj2) {

                           for (var p in obj2) {
                                try {

                                 if (p == 'coords' || p=='raw')
                                        {
                                            if (typeof obj1[p] == 'undefined') obj1[p]="";
                                            obj1[p] += ","+obj2[p];
                                        }

                                  // Property in destination object set; update its value.
                                  else 

                                      if ( obj2[p].constructor==Object ) {

                                    obj1[p] = reach.visuals.MergeRecursiveObjectsb(obj1[p], obj2[p]);

                                  } else {



                                        if (typeof obj1[p] == 'undefined') obj1[p]=0;
                                        obj1[p] += obj2[p];





                                  }

                                } catch(e) {
                                  // Property in destination object not set; create it and set its value.
                                  obj1[p] = obj2[p];

                                }
                              }

                              return obj1;
                          },
                   
                   
                   init: function()
                   {
                        reach.visuals.sparklines();
                        reach.visuals.inlineSparks();
                        reach.visuals.redrawCharts();
                   },
                           
                   drawMediaPie: function()
                   {
                      
                        
                        $('#mediaPie').html('<td><span class="left alert-color br-2" style="background-color: #F7464A;"></span> Owned</td>');
                        $('#mediaPie').append('<td><span class="left alert-color br-2" style="background-color: #949FB1"></span> Earned</td>');
                        $('#mediaPie').append('<td><span class="left alert-color br-2" style="background-color: #E2EAE9"></span> Paid</td>');
                        
                        $('#mediaPie').append('<canvas id="myMediaPie" width="300" height="300"></canvas>');
                            
                            
                         var data = [
                                    {
                                            value: 10,
                                            color:"#F7464A"
                                    },
                                    {
                                            value : 20,
                                            color : "#949FB1"
                                    },
                                    {
                                            value : 70,
                                            color : "#E2EAE9"
                                    }			
                            ];
                            
                            var options = [];
                            var ctx = document.getElementById("myMediaPie").getContext("2d");
                            new Chart(ctx).Doughnut(data,options);
                        
                   },
                           
                   drawDevicePie: function()
                   {
                      
                        //this.drawMediaPie();
                        
                        $('#devicePie').html('<td><span class="left alert-color br-2" style="background-color: #F7464A;"></span> Mobile</td>');
                        $('#devicePie').append('<td><span class="left alert-color br-2" style="background-color: #949FB1"></span> Desktop</td>');
                        $('#devicePie').append('<td><span class="left alert-color br-2" style="background-color: #E2EAE9"></span> Tablet</td>');
                        
                        $('#devicePie').append('<canvas id="myDevicePie" width="300" height="300"></canvas>');
                            
                            
                         var data = [
                                    {
                                            value: parseInt(reach.visuals.devicePie.mobile),
                                            color:"#F7464A"
                                    },
                                    {
                                            value : parseInt(reach.visuals.devicePie.desktop),
                                            color : "#949FB1"
                                    },
                                    {
                                            value : parseInt(reach.visuals.devicePie.tablet),
                                            color : "#E2EAE9"
                                    }			
                            ];
                            
                            var options = [];
                            var ctx = document.getElementById("myDevicePie").getContext("2d");
                            new Chart(ctx).Doughnut(data,options);
                        
                   },
                   MergeRecursiveObjects: function(obj1, obj2) {

                       
                       //console.log('+++++++++++++++++++++++++++++');
                       //console.log(obj1);
                       //console.log(obj2);
                       //console.log('+++++++++++++++++++++++++++++');
                       
                       return obj1;
                       
                       /*
                       for (var p in obj2) {
                                try {

                                 if (p == 'coords' || p=='raw')
                                        {
                                            if (typeof obj1[p] == 'undefined') obj1[p]="";
                                            obj1[p] += ","+obj2[p];
                                        }

                                  // Property in destination object set; update its value.
                                  else 

                                      if ( obj2[p].constructor==Object ) {

                                    //obj1[p] = MergeRecursiveObjects(obj1[p], obj2[p]);

                                  } else {



                                        if (typeof obj1[p] == 'undefined') obj1[p]=0;
                                        obj1[p] += obj2[p];





                                  }

                                } catch(e) {
                                  // Property in destination object not set; create it and set its value.
                                  obj1[p] = obj2[p];

                                }
                              }



                                var flags = [], output = [], l = obj1.length, i;
                                for( i=0; i<l; i++) {
                                    if(flags[obj1[i].day]) continue;
                                    flags[obj1[i].day] = true;
                                    output.push(obj1[i]);
                                }

                              return output;
                              */
                          },
                   redraw_promotional_charts: function()
                    {
                        
                        data = reach.visuals.allChartData_promotions;
                       
                      
                       // $('#promochart').css('background', '#1f2528');
                       //$('#primarychart_wrap_b').html('<div id="pdetails_b"></div><div id="promochart"></div>');
                        
                        $('#promochart').css('background', '#1f2528');
                        $('#primarychart_wrap_b').html('<div id="pdetailsb"></div><div id="promochart"></div>');

                            new Morris.Line({
                            // ID of the element in which to draw the chart.
                            element: 'promochart',
                            //#84ced1
                            // Chart data records -- each entry in this array corresponds to a point on
                            // the chart.
                            data: data,
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

                            var diff = reach.visuals.allChartData_promotions[reach.visuals.allChartData_promotions.length - 1].value - reach.visuals.allChartData_promotions[0].value;
                            
                            //var totalgrowth = Math.round(100*(diff / reach.visuals.allChartData_promotions[0].value));
                            var totalgrowth = Math.round((reach.visuals.allChartData_promotions[reach.visuals.allChartData_promotions.length - 1].value/reach.visuals.allChartData_promotions[0].value)*100);

                             $('#pdetailsb').prepend('<div id="rightstats"><span class="carret carret-up graph-carret"></span><h1 class="stath1overlay">'+totalgrowth+'%</h1></div>  <h1 class="stath1overlay">JustIvy</h1><p class="statpoverlay">Last 30 Days (paid, owed and earned media)</p>');
                    
                    
                  
                  
                    },
                   merge_line_charts_promotions: function(chrtdata)
                   {
                       //console.log('merging promotional charts...');
                       //console.log(chrtdata);
                       
                       if (reach.visuals.allChartData_promotions == [])
                           {
                               data = chrtdata;
                           } else {
                               data = reach.visuals.MergeRecursiveObjects(chrtdata,reach.visuals.allChartData_promotions);
                           }
                       
                       reach.visuals.allChartData_promotions = data;
                       
                        cuum = 0;
                        $.each(data, function(xb,yb)
                        {
                        //console.log('**************************');    
                        cuum = cuum +parseInt(yb.value);
                        yb.value = cuum;
                        });
                        
                        
                        //console.log(cuum);
                       
                      
                       // $('#promochart').css('background', '#1f2528');
                       //$('#primarychart_wrap_b').html('<div id="pdetails_b"></div><div id="promochart"></div>');
                        
                        $('#promochart').css('background', '#1f2528');
                        $('#primarychart_wrap_b').html('<div id="pdetailsb"></div><div id="promochart"></div>');

                            new Morris.Line({
                            // ID of the element in which to draw the chart.
                            element: 'promochart',
                            //#84ced1
                            // Chart data records -- each entry in this array corresponds to a point on
                            // the chart.
                            data: data,
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

                            var totalgrowth = Math.round((reach.visuals.allChartData_promotions[reach.visuals.allChartData_promotions.length - 1].value/reach.visuals.allChartData_promotions[0].value)*100);


                             $('#pdetailsb').prepend('<div id="rightstats"><span class="carret carret-up graph-carret"></span><h1 class="stath1overlay">'+totalgrowth+'%</h1></div>  <h1 class="stath1overlay">JustIvy</h1><p class="statpoverlay">Last 30 Days (paid, owed and earned media)</p>');
                    
                             //$('#pdetailsb').prepend('<div id="rightstats"><span class="carret carret-up graph-carret"></span><h1 class="stath1overlay">1,311%</h1></div>  <h1 class="stath1overlay">JustIvy</h1><p class="statpoverlay">Last 30 Days</p>');

                      
                        

                   },        
                   merge_line_charts: function(chrtdata)
                   {
                       //console.log('merging primary charts...');
                       ////console.log(chrtdata);
                       
                       if (reach.visuals.allChartData == [])
                           {
                                //console.log('creating new obj');
                                data = chrtdata;
                           } else {
                               //console.log('merging...');
                               
                               if (chrtdata.length < reach.visuals.allChartData.length)
                                   {
                                       data = merge(chrtdata,reach.visuals.allChartData);
                                   } else {
                                       data = merge(reach.visuals.allChartData, chrtdata);
                                   }
                               
                           }
                       
                       reach.visuals.allChartData = data;
                       
                      
                        var totalcum = 0;
                        
                        cumdata = data;
                        
                        $.each(cumdata, function(xb,yb)
                        {
                             
                            if(isNaN(totalcum) == false)
                                 {
                                    totalcum = totalcum + parseInt(yb.value); 
                                    
                                    ////console.log(data[xb]);
                                    
                                    cumdata[xb].value = totalcum;
                                    //yb.value = cuum;
                                 }
                                 
                        });
                        
                        
                        cumdata.sort(function(a,b){
                            ax = new Date(a.day);
                            bx = new Date(b.day);
                          
                            return ax<bx?-1:ax>bx?1:0;
                          });
                        
                       
                        //console.log(cumdata);
                      
                       // $('#promochart').css('background', '#1f2528');
                       //$('#primarychart_wrap_b').html('<div id="pdetails_b"></div><div id="promochart"></div>');
                        
                        $('#primarychart').css('background', '#1f2528');
                        $('#primarychart_wrap').html('<div id="pdetails"></div><div id="primarychart" style="height:222px"></div>');

                            new Morris.Line({
                            // ID of the element in which to draw the chart.
                            element: 'primarychart',
                            //#84ced1
                            // Chart data records -- each entry in this array corresponds to a point on
                            // the chart.
                            data: cumdata,
                            // The name of the data record attribute that contains x-values.
                            xkey: 'day',
                            // A list of names of data record attributes that contain y-values.
                            ykeys: ['value'],
                            // Labels for the ykeys -- will be displayed when you hover over the
                            // chart.
                            axes: false,
                            hideHover: true,
                            lineWidth: 4,
                            smooth: false,
                            pointStrokeColors: '#1f2528',
                            labels: ['Value'],
                            pointFillColors: ['#e5eef5'],
                            lineColors: ['#7f888f'],
                            grid: false
                            });

                             var totalgrowth = Math.round((reach.visuals.allChartData[reach.visuals.allChartData.length - 1].value/reach.visuals.allChartData[0].value)*100);

                             $('#pdetails').prepend('<div id="rightstats"><span class="carret carret-up graph-carret"></span><h1 class="stath1overlay">'+reach.visuals.roundlarge(totalgrowth)+'%</h1></div>  <h1 class="stath1overlay">JustIvy</h1><p class="statpoverlay">Last 30 Days</p>');
                    
                             //$('#pdetailsb').prepend('<div id="rightstats"><span class="carret carret-up graph-carret"></span><h1 class="stath1overlay">1,311%</h1></div>  <h1 class="stath1overlay">JustIvy</h1><p class="statpoverlay">Last 30 Days</p>');

                      
                        

                   },
                   attribution_to_source: function(src)
                    {
                       ////console.log('tracking....'+src); 
                       
                       $('.table-earned-source tr').each(function(x,y){
                            
                            
                            switch($(y).data('site'))
                            {
                                case 'fb':
                                    icon = '<i class="stats-source-icon left icon-facebook"></i>';
                                break;
                                    
                                case 'web':
                                     icon = '<i class="stats-source-icon left icon-web"></i>';
                                break;
                            }
                            
                            var domain = $(y).find('td:first-child').html();
                            
                            if(src.indexOf(domain) != -1)
                                {
                                    $(y).find('td:first-child').prepend('<span class="left alert-color br-2" style="background-color: rgb(26, 188, 156);"></span><i class="easeblk"></i>'+icon);
                               
                                    var d = new Date();
                                    var myid = d.getTime();
                                   
                        
                                    if($('#pressinsight').length)
                                    {
                                        
                                        $('#pressinsight').find('.insight-attachment-detail').append('<li><img class="media-object size34 getfavs" id="'+myid+'" src="" data-url="http://'+domain+'" data-id="'+myid+'"><a href="'+src+'">'+domain+'</a></li>');
                                   
                                    } else {
                                   
                                        phtml =' <div id="pressinsight" class="alert alert-info emphasis-0 insight-item">';
                                        phtml +=' <span class="label label-info"><i class="icon-white icon-bullhorn"></i> <a>Press:</a></span> ';

                                        phtml +=' <i class="icon-twitter icon-muted"></i>';
                                        phtml +='Website mentions that drive traffic';

                                        phtml +=' <div class="insight-attachment-detail post">';
                                            
                                        
                                        
                                        phtml += '<li><img class="media-object size34 getfavs" id="'+myid+'" src="" data-url="http://'+domain+'" data-id="'+myid+'"><a href="'+src+'">'+domain+'</a></li>';

                                        //phtml +='     <div class="clearfix"></div>';
                                        phtml +=' </div>';

                                        $('.table-key-insights').append(phtml);
                                    }
                        
                                 }  
                                 
                        
                        });
                        
                         reach.mention.getFavatars();

                    },
                   clearTables: function()
                   {

                        $('.table-paid-promotions').html('<tr><th style="width:360px;">Promotion</th><th>Impressions</th><th>Engagements</th><th>Cost</th></tr>');  
                    

                   },
                   calibrateTables: function()
                   {
                       
                     
                       
                       
                       var totalreach = 0;
                        var totalsites = 0;
                        $('.owned-media-pages tr').each(function(x,y){
                            
                            totalsites = totalsites+1;
                            var n = $(y).find('td:nth-child(4)');

                            ////console.log($(n).data('reach'));
                            totalreach = totalreach + parseInt($(n).data('reach'));

                        });
                        ////console.log(totalreach);
                        ////console.log(totalsites);


                        $('.owned-media-pages tr').each(function(x,y){
                            
                            totalsites = totalsites+1;

                            var n = $(y).find('td:nth-child(4)');
                            thisreach = parseInt($(n).data('reach'));



                            var n = $(y).find('td:nth-child(3)').find('.statistic-bar-content').css('width',100*(thisreach/totalreach) +'%');

                        });

                         $('.total-owned-reach').html(reach.visuals.roundlarge(totalreach));

                   },
                   roundlarge: function(x)
                   {

                    ////console.log('converting....'+x);
                    
                    switch (x.toString().length) {
                        case 4:
                          //e = (x/1000)+'k';
                          e = (Math.round( (x/1000) * 10 ) / 10)+'k';
                          break;
                        
                        case 5:
                          //e =  (x/10000)+'k';
                          e = (Math.round( (x/1000) * 10 ) / 10)+'k';
                          break;   
                       
                        case 6:
                          //e =  (x/100000)+'k';
                          e = (Math.round( (x/1000) * 10 ) / 10)+'k';
                          break;
                      
                        case 7:
                          //e =  (x/1000000)+'m';
                          e = (Math.round( (x/1000000) * 10 ) / 10)+'m';
                          break;    
                      
                       case 8:
                          //e =  (x/10000000)+'m';
                          e = (Math.round( (x/1000000) * 10 ) / 10)+'m';
                          break; 
                          
                       case 9:
                          //e =  (x/10000000)+'m';
                          e = (Math.round( (x/1000000) * 10 ) / 10)+'m';
                          
                          break; 
                          
                       default:
                           e = x;
                           break;

                      }
                   
                   ////console.log(e);
                   return e;
                  
                   
                   },
                   frame: function(url)
                   {
                      ////console.log(url);
                      $('.webviewer .browser').css('height', $('.newsweb').css('height'));
                      $('.webviewer .browser').html('Loading...');
                      $('.webviewer .browser').html('<iframe src="'+url+'" frameborder=0 width="100%" height="100%"></iframe>');
                      
                      $('html, body').animate({
                        scrollTop: 0
                     }, 'slow');
                   },
                   redrawCharts: function()
                    {
                            ////console.log('clearing old tables...');
                            //$('.table-key-insights').html('');
                            
                            ////console.log('redrawing charts...');
                            
                            drawHeatMap();
                            this.drawDevicePie();
                            
                            setTimeout(function(){reach.visuals.redraw_promotional_charts();},100)
                            
                            //$('#myfirstchart').html('');
                            $('#peoplechart').html('');
                            $('#promochart').html('');
                            $('#gender-donut').html('');
                            $('#mypie').html('');
                            $('#mypie').html('<canvas id="myChart" width="150" height="150"></canvas>');
                            
                       
                            /*
                            $('#primarychart').html('');
                            
                            
                            $('#primarychart').css('background', '#1f2528');
                           
                           
                             new Morris.Line({
                                // ID of the element in which to draw the chart.
                                element: 'primarychart',
                                //#84ced1
                                // Chart data records -- each entry in this array corresponds to a point on
                                // the chart.
                                data: [
                                  { year: '2008', value: 20 },
                                  { year: '2009', value: 10 },
                                  { year: '2010', value: 5 },
                                  { year: '2011', value: 5 },
                                  { year: '2012', value: 20 },
                                  { year: '2008', value: 20 },
                                  { year: '2009', value: 10 },
                                  { year: '2010', value: 5 },
                                  { year: '2011', value: 5 },
                                  { year: '2012', value: 20 },
                                  { year: '2008', value: 20 },
                                  { year: '2009', value: 10 },
                                  { year: '2010', value: 5 },
                                  { year: '2011', value: 5 },
                                  { year: '2012', value: 20 },
                                  { year: '2008', value: 20 },
                                  { year: '2009', value: 10 },
                                  { year: '2010', value: 5 },
                                  { year: '2011', value: 5 },
                                  { year: '2012', value: 20 }
                                ],
                                // The name of the data record attribute that contains x-values.
                                xkey: 'year',
                                // A list of names of data record attributes that contain y-values.
                                ykeys: ['value'],
                                // Labels for the ykeys -- will be displayed when you hover over the
                                // chart.
                                labels: ['Value'],
                                pointFillColors: ['#e5eef5'],
                                lineColors: ['#7f888f'],
                                grid: false
                              });
                            
                            */
                            
                            
                            var data = [
                                    {
                                            value: 30,
                                            color:"#F38630"
                                    },
                                    {
                                            value : 50,
                                            color : "#E0E4CC"
                                    },
                                    {
                                            value : 100,
                                            color : "#69D2E7"
                                    }			
                            ];
                            
                            var options = [];
                            var ctx = document.getElementById("myChart").getContext("2d");
                            new Chart(ctx).Pie(data,options);

                       /*    
                       new Morris.Bar({
                            // ID of the element in which to draw the chart.
                            element: 'myfirstchart',
                            //#84ced1
                            // Chart data records -- each entry in this array corresponds to a point on
                            // the chart.
                            data: [
                              { year: '2008', value: 20 },
                              { year: '2009', value: 10 },
                              { year: '2010', value: 5 },
                              { year: '2011', value: 5 },
                              { year: '2012', value: 20 },
                              { year: '2008', value: 20 },
                              { year: '2009', value: 10 },
                              { year: '2010', value: 5 },
                              { year: '2011', value: 5 },
                              { year: '2012', value: 20 },
                              { year: '2008', value: 20 },
                              { year: '2009', value: 10 },
                              { year: '2010', value: 5 },
                              { year: '2011', value: 5 },
                              { year: '2012', value: 20 },
                              { year: '2008', value: 20 },
                              { year: '2009', value: 10 },
                              { year: '2010', value: 5 },
                              { year: '2011', value: 5 },
                              { year: '2012', value: 20 }
                            ],
                            // The name of the data record attribute that contains x-values.
                            xkey: 'year',
                            // A list of names of data record attributes that contain y-values.
                            ykeys: ['value'],
                            // Labels for the ykeys -- will be displayed when you hover over the
                            // chart.
                            labels: ['Value'],
                            barColors: ['#84ced1']
                          });
                */
                        
                           

                    },
                   inlineSparks: function()
                   {
                       $('.inlinesparkline').each(function(x,y){
                              var colors = '#'+$(this).data('color');
                              var values = $(this).data('values').split(',');
                              var height = $(this).data('height');
                              
                              $(this).sparkline(values, {
                                type: 'line',
                                width: '100%',
                                fillColor: '#fff',
                                lineColor: colors,
                                height: ((height == 'undefined') ? 30 : height),
                                lineWidth: 2,
                                spotColor: undefined,
                                minSpotColor: undefined,
                                maxSpotColor: undefined,
                                highlightSpotColor: undefined,
                                highlightLineColor: undefined,
                                spotRadius: 0,
                                chartRangeMin: 0,
                                chartRangeMax: 0,
                                chartRangeMinX: 0,
                                chartRangeMaxX: 0,
                                normalRangeMin: 0,
                                normalRangeMax: 1,
                                normalRangeColor: '#b2b2b2',
                                drawNormalOnTop: true
                            });
                              
                        });
                       
                       
                   },
                   sparklines: function()
                    {
                        //find all sparkline classes
                       $('.juice').each(function(x,y){
                              $(this).css('width',$(this).data('width')+"%");
                        });
                    }
              }
              
            
             
              
               