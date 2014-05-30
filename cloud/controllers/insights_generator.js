var _ = require('underscore');
var Post = Parse.Object.extend('Post');
var Comment = Parse.Object.extend('Comment');
var Contentarea = Parse.Object.extend('Contentarea');
var Insights = Parse.Object.extend('Insights');
var Analytics = Parse.Object.extend('Analytics');
var Orders = Parse.Object.extend('Order');


//http://urls.api.twitter.com/1/urls/count.json?url=www.vibe.com/article/new-video-just-ivy-feat-meek-mill-and-dj-khaled-bad-girl-takeover
//{"count":6,"url":"http:\/\/www.vibe.com\/article\/new-video-just-ivy-feat-meek-mill-and-dj-khaled-bad-girl-takeover\/"}


//https://graph.facebook.com/?ids=http://www.vibe.com/article/interview-lil-boosie-pioneering-ratchet-sound-and-why-he-done-drugs
/*
 * {
   "http://www.vibe.com/article/interview-lil-boosie-pioneering-ratchet-sound-and-why-he-done-drugs": {
      "id": "http://www.vibe.com/article/interview-lil-boosie-pioneering-ratchet-sound-and-why-he-done-drugs",
      "shares": 8,
      "comments": 1
   }
}
 */


