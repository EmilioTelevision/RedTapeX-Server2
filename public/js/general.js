/*
 user = {
 facebook: '219643541517858',
 
 bsound:     '754265',
 enest:      'ARTUELK14072B73F1E',
 twitter:    'therealjustivy',
 analytics:  'ga:74978815',
 youtube:    'therealjustivy',
 klout:      'therealjustivy',
 soundcloud: 'therealjustivy',
 instagram:  '478161607',
 vevo:       'therealjustivy',
 alerts:   [
 {
 name:   'Just Ivy',
 terms:  [
 {
 term:   'justivy',
 },
 {
 term:   'therealjustivy',
 }
 ]  
 }
 ]
 }
 */


if (typeof reach == 'undefined') {
    var reach = {};
}
reach.math = {
    number_format: function(number, decimals, dec_point, thousands_sep) {
        // http://kevin.vanzonneveld.net
        // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +     bugfix by: Michael White (http://getsprink.com)
        // +     bugfix by: Benjamin Lupton
        // +     bugfix by: Allan Jensen (http://www.winternet.no)
        // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +     bugfix by: Howard Yeend
        // +    revised by: Luke Smith (http://lucassmith.name)
        // +     bugfix by: Diogo Resende
        // +     bugfix by: Rival
        // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
        // +   improved by: davook
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // +      input by: Jay Klehr
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // +      input by: Amir Habibi (http://www.residence-mixte.com/)
        // +     bugfix by: Brett Zamir (http://brett-zamir.me)
        // +   improved by: Theriault
        // *     example 1: number_format(1234.56);
        // *     returns 1: '1,235'
        // *     example 2: number_format(1234.56, 2, ',', ' ');
        // *     returns 2: '1 234,56'
        // *     example 3: number_format(1234.5678, 2, '.', '');
        // *     returns 3: '1234.57'
        // *     example 4: number_format(67, 2, ',', '.');
        // *     returns 4: '67,00'
        // *     example 5: number_format(1000);
        // *     returns 5: '1,000'
        // *     example 6: number_format(67.311, 2);
        // *     returns 6: '67.31'
        // *     example 7: number_format(1000.55, 1);
        // *     returns 7: '1,000.6'
        // *     example 8: number_format(67000, 5, ',', '.');
        // *     returns 8: '67.000,00000'
        // *     example 9: number_format(0.9, 0);
        // *     returns 9: '1'
        // *    example 10: number_format('1.20', 2);
        // *    returns 10: '1.20'
        // *    example 11: number_format('1.20', 4);
        // *    returns 11: '1.2000'
        // *    example 12: number_format('1.2000', 3);
        // *    returns 12: '1.200'
        var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }
}



reach.fancy = {
    charts: function()
    {
        $('.engagementchart').append('<img style="top: 200px; left:200px;" src="https://pbs.twimg.com/profile_images/378800000851701832/3fb0b87770e45d80d32fe1946f13e662_bigger.jpeg">');
    }
}


reach.filter = {
    sd: null,
    ed: null,
    dsd: null,
    ded: null,
    init: function()
    {

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        //sd = (date.getMonth()+1) + '-01-' + date.getFullYear();
        //ed = (lastDay.getMonth()+1) + '-'+lastDay.getDate()+'-' + lastDay.getFullYear();

        sd = date.getFullYear() + '-' + (date.getMonth() + 1) + '-01';
        ed = lastDay.getFullYear() + '-' + (lastDay.getMonth() + 1) + '-' + lastDay.getDate();

        reach.filter.sd = sd;
        reach.filter.ed = ed;

        reach.filter.dsd = sd;
        reach.filter.ded = ed;


        reach.filter.createFilters();

        reach.visuals.clearTables();

        reach.instagram.getData();
        reach.googleanalytics.getData();
        reach.facebookInsights.getData();
        reach.twitter.getData();
        reach.soundcloud.getData();
        reach.youtube.getData();

        reach.pdata.getInsights();

        reach.mention.getMentions();
        reach.mention.getNews();
        reach.mention.getVideos();

        reach.mention.getOthers();

        reach.tu.getInsights();
        reach.klout.getScore(user.klout);
        reach.dtables.promotions();
        reach.visuals.init();


    },
    data: function(sd, ed, title)
    {

        $('.chzn-results').toggle();

        $('.ftsize').html(title);

        reach.filter.sd = sd;
        reach.filter.ed = ed;

        reach.visuals.allChartData = [];
        reach.visuals.devicePie = [];

        reach.visuals.clearTables();
        reach.googleanalytics.getData();
        reach.dtables.promotions();
        reach.visuals.init();
    },
    createFilters: function()
    {

        ytdsd = '2013-01-01';
        ytded = '2013-12-31';

        $('.chzn-results').html('');
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        $('.chzn-results').append('<li id="selTDG_chzn_o_0" class="active-result result-selected highlighted" onclick="reach.filter.data(\'' + reach.filter.dsd + '\',\'' + reach.filter.ded + '\', \'Last 30 Days\');">Last 30 Days</li>');

        for (x = 0; x < 5; x++)
        {
            var date = new Date();
            date = new Date(date.getFullYear(), date.getMonth(), 1);

            date.setMonth(date.getMonth() - x);
            var filterMonth = date.getMonth() - 1;

            //var sd = date.getMonth() + '-01-' + date.getFullYear();
            sd = date.getFullYear() + '-' + date.getMonth() + '-01';

            var ed = new Date(date.getFullYear(), date.getMonth(), 0);

            //ed = date.getMonth() + '-'+ed.getDate()+'-' + date.getFullYear();
            var ed = date.getFullYear() + '-' + date.getMonth() + '-31';//+date.getDate();

            $('.chzn-results').append('<li id="selTDG_chzn_o_0" class="active-result result-selected highlighted" onclick="reach.filter.data(\'' + sd + '\',\'' + ed + '\',\'' + monthNames[filterMonth] + '\');">' + monthNames[filterMonth] + '</li>');

        }

        $('.chzn-results').append('<li id="selTDG_chzn_o_0" class="active-result result-selected highlighted" onclick="reach.filter.data(\'' + ytdsd + '\',\'' + ytded + '\', \'All Time\');">All Time</li>');
    }
}

reach.dtables = {
    promoTable: '',
    networks: function(data)
    {

        $('#table-networks').dataTable().fnClearTable();

        var totalspend = 0;
        var totalactions = 0;

        $.each(data, function(x, y) {
            totalactions = totalactions + y.actions;

        })



        $.each(data, function(x, y) {
            totalspend = totalspend + y.spend;
            thisactions = y.actions;
            $('#table-networks').dataTable().fnAddData([
                '<i class="stats-source-icon left icon-' + ((x == 'google') ? 'web' : x) + '"></i><b class="source-name">' + x + '</b>',
                reach.math.number_format(thisactions),
                '<div class="statistic-bar br-2"> <span class="carret equal"></span> <div class="statistic-bar-content br-2 ' + ((x == 'google') ? 'web' : x) + '" style="right: auto; width: ' + (100 * (thisactions / totalactions)) + '%;"></div> </div>',
                '$' + reach.math.number_format(y.spend)
            ]);
        });
        $('.totalspend').html('<sup>$</sup>' + reach.math.number_format(totalspend));
        $('.totalactioncost').html('<sup>$</sup>' + reach.math.number_format(totalactions / totalspend));
        $('.totalactions').html(reach.math.number_format(totalactions));



        reach.fancy.charts();

    },
    promotions: function()
    {
        reach.visuals.loader('show');
        $.get("https://reach.parseapp.com/data/" + reach.filter.sd + "/" + reach.filter.ed,
                function(data, textStatus, jqXHR)
                {
                    $('#table-promotions').dataTable().fnClearTable();
                    reach.visuals.loader('hide');
                    //reach.dtables.networks(data);

                    var networks = new Object();

                    $.each(data.campaigns, function(x, y) {

                        campaignActions = parseInt(y.Actions) + parseInt(((typeof y.Clicks == 'undefined') ? 0 : y.Clicks)) + parseInt(((typeof y.clicks == 'undefined') ? 0 : y.clicks));

                        console.log('y.network:'+campaignActions);

                        if (typeof networks[y.network] == 'undefined')
                        {


                            networks[y.network] = {
                                actions: parseInt(y.Actions) + parseInt(((typeof y.Clicks == 'undefined') ? 0 : y.Clicks)) + parseInt(((typeof y.clicks == 'undefined') ? 0 : y.clicks)),
                                spend: parseInt(y.Spend)
                            }
                        } else {

                            networks[y.network].actions = networks[y.network].actions + parseInt(y.Actions) + parseInt(((typeof y.Clicks == 'undefined') ? 0 : y.Clicks)) + parseInt(((typeof y.clicks == 'undefined') ? 0 : y.clicks));
                            networks[y.network].spend = networks[y.network].spend + parseInt(y.Spend);



                        }
                        
                        xdate = new Date(y.dataDate.iso);
                        nicedate = (xdate.getMonth()+1) + '-' + xdate.getDate() + '-' + xdate.getFullYear();
                        
                        if(typeof y.ad != 'undefined'){
                            
                            
                            var Data = Parse.Object.extend('dataAds');
                            var query = new Parse.Query(Data);
                            query.get(y.ad.objectId, 
                                {
                                    success: function(obj) {
                                        switch (y.network)
                                            {
                                                case 'google':
                                                    var campaignblk = y.Campaign + '<br><div class="row adblock"><div class="col-4"><img src="'+obj.get("img")+'"></div><div class="col-8 adtargeting"><strong>Potential Audience for this ad:</strong><ul>'+((typeof obj.get("targeting1") == "undefined") ? "" : "<li>"+obj.get("targeting1")+"</li>")+((typeof obj.get("targeting2") == "undefined") ? "" : "<li>"+obj.get("targeting2")+"</li>")+((typeof obj.get("targeting3") == "undefined") ? "" : "<li>"+obj.get("targeting3")+"</li>")+'</ul></div></div>';
                                                    break;
                                                
                                                case 'facebook':
                                                    var campaignblk = y.Campaign + '<br><div class="row adblock"><div class="col-4"><p class="pagename">'+obj.get("headline")+'</p><p class="promotxt">'+obj.get("body")+'</p><img src="'+obj.get("img")+'"></div><div class="col-8 adtargeting"><strong>Potential Audience for this ad:</strong><ul>'+((typeof obj.get("targeting1") == "undefined") ? "" : "<li>"+obj.get("targeting1")+"</li>")+((typeof obj.get("targeting2") == "undefined") ? "" : "<li>"+obj.get("targeting2")+"</li>")+((typeof obj.get("targeting3") == "undefined") ? "" : "<li>"+obj.get("targeting3")+"</li>")+'</ul></div></div>';
                                                    break;


                                                case 'twitter':
                                                    console.log(y);
                                                    var campaignblk = y.Campaign + '<br><div class="row adblock twadblock"><div class="col-1"><img class="twadblockimg" src="'+obj.get("img")+'"></div><div class="col-3"><p class="pagename">'+obj.get("headline")+'<span>'+obj.get("body")+'</span></p><p class="promotxt"><img src="https://ads.twitter.com/images/campaign_form/promoted_badge@2x.png?580b0d84891b81d89c3a234ff56b4efb">Promoted</p></div><div class="col-8 adtargeting"><strong>Potential Audience for this ad:</strong><ul>'+((typeof obj.get("targeting1") == "undefined") ? "" : "<li>"+obj.get("targeting1")+"</li>")+((typeof obj.get("targeting2") == "undefined") ? "" : "<li>"+obj.get("targeting2")+"</li>")+((typeof obj.get("targeting3") == "undefined") ? "" : "<li>"+obj.get("targeting3")+"</li>")+'</ul></div></div>';
                                                    break;
                                            }
                                            
                                            
                                       campaignActions = parseInt(y.Actions) + parseInt(((typeof y.Clicks == 'undefined') ? 0 : y.Clicks)) + parseInt(((typeof y.clicks == 'undefined') ? 0 : y.clicks));
     
                                            
                                       $('#table-promotions').dataTable().fnAddData([
                                            '<i class="stats-source-icon left icon-' + ((y.network == 'google') ? 'web' : y.network) + '"></i><b class="source-name">' + y.network + '</b>',
                                            campaignblk,
                                            nicedate,
                                            reach.math.number_format(campaignActions),
                                            '$' + reach.math.number_format(y.Spend)
                                        ]);
                                    }
                                              
                                });
                            
                        } else {
                            
                            //there is no ad
                            $('#table-promotions').dataTable().fnAddData([
                                            '<i class="stats-source-icon left icon-' + ((y.network == 'google') ? 'web' : y.network) + '"></i><b class="source-name">' + y.network + '</b>',
                                            y.Campaign,
                                            nicedate,
                                            reach.math.number_format(campaignActions),
                                            '$' + reach.math.number_format(y.Spend)
                                        ]);
                            
                        }
                        
                        

                        


                        


                    });
                    console.log(networks);
                    reach.dtables.networks(networks);


                    $.each(data.placements, function(x, y) {
                        $('#table-sites').dataTable().fnAddData([
                            y.Placement,
                            reach.math.number_format(y.Actions),
                            reach.math.number_format(y.Impressions)
                        ]);
                    });



                },
                'json'
                );
    }

}



function updateuser()
{
    reach.visuals.loader('show');

    data = {};
    $('#usersettings input').each(function(x, y)
    {
        data[$(y).attr('name')] = $(y).val();
    });


    var $url = '//reach.parseapp.com/settings';

    $.ajax({
        method: "POST",
        url: $url,
        data: data,
        success: function(data) {

            reach.visuals.loader('hide');

            $.each(data, function(x, y)
            {
                $("input[name='" + x + "']").val(y);
            });

        }
    });



}


function drawHeatMap()
{

    console.log('drawing heatmap...');
    data = reach.googleanalytics.heatMapdata;

    // standard gmaps initialization
    var myLatlng = new google.maps.LatLng(38.85, -95.67);
    // define map properties
    var myOptions = {
        zoom: 4,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        scrollwheel: true,
        draggable: true,
        navigationControl: true,
        mapTypeControl: false,
        scaleControl: true,
        disableDoubleClickZoom: false
    };
    // we'll use the heatmapArea 
    var map = new google.maps.Map($("#heatmapArea")[0], myOptions);

    // let's create a heatmap-overlay
    // with heatmap config properties
    var heatmap = new HeatmapOverlay(map, {
        "radius": 20,
        "visible": true,
        "opacity": 60
    });

    // here is our dataset
    // important: a datapoint now contains lat, lng and count property!
    var testData = {
        max: 100,
        data: data //[{lat: 33.5363, lng:-117.044, count: 45},{lat: 33.5608, lng:-117.24, count: 54},{lat: 38, lng:-97, count: 34},{lat: 38.9358, lng:-77.1621, count: 43}]
    };


    var styles = [
        {
            stylers: [
                {hue: "#1f2528"},
                {saturation: -5}
            ]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {lightness: 100},
                {visibility: "simplified"}
            ]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
        }
    ];

    map.setOptions({styles: styles});


    // now we can set the data
    google.maps.event.addListenerOnce(map, "idle", function() {
        // this is important, because if you set the data set too early, the latlng/pixel projection doesn't work
        heatmap.setDataSet(testData);
        console.log('setting heatmap');
    });

}




reach.filter.init();


            