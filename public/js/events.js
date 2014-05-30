if (typeof reach == 'undefined'){var reach = {};}


reach.events = {
    showCal: false,
    renderCal: function()
    {
        
        if (reach.events.showCal == false)
            {
        
            setTimeout(function(){
        
        
                        $( ".blkpad" ).draggable({ 
                            grid: [ 140,0 ],
                            stop: function( e, u )
                            {
                                var diffoffset = Math.round((u.position.left-15)/100);
                                updateEvent(u, diffoffset);

                            } 
                        });



                    $("#planbox").jCarouselLite({
                        btnNext: ".default .next",
                        btnPrev: ".default .prev",
                        mouseWheel: true,
                         btnGo:
                            [".wk-1", ".wk-2",
                            ".wk-3", ".wk-4",
                            ".wk-5", ".wk-6",
                            ".wk-7", ".wk-8"]
                        });

                    reach.events.showCal = true;    
                    
               },1000);
        
            }
        
        
    }
}


