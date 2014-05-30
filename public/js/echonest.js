
if (typeof reach == 'undefined'){var reach = {};}



 //facebook insights class
reach.echonest = {
    
    getData: function()
    {
        this.getArtistId('justivy');
    },
    getArtistId: function(artist)
    {
        //http://developer.echonest.com/api/v4/artist/profile?api_key=7AY68WSQWHRWRJANX&id=ARTUELK14072B73F1E&format=json&bucket=biographies&bucket=blogs&bucket=familiarity&bucket=hotttnesss&bucket=images&bucket=news&bucket=reviews&bucket=terms&bucket=urls&bucket=video&bucket=id:musicbrainz

    },
    getSimilarArtist: function()
    {
        

        //http://developer.echonest.com/api/v4/artist/similar?api_key=7AY68WSQWHRWRJANX&id=ARTUELK14072B73F1E&format=json&results=1&start=0

    }

    
}