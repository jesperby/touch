define(['jquery', 'backbone'], function ($, Backbone) {
  'use strict';

  var Feed = Backbone.Collection.extend({
    loaded: false,
    model: Backbone.Model.extend({
      defaults: {
        title: "",
        pubDate: null,
        description: null,
        content: "",
        link: null,
        enclosure: null
      }
    }),
    url: 'http://webapps2.malmo.se/feeds/?feed=komin-main',
    parse: function(response) {
      var articls = [];
      for(var i = 0, l = response.items.length; i<l; i++){
        articls[i] = response.items[i];
        articls[i].url = '#komin-news/article/'+articls[i].id;
      }
      this.loaded = true;
      return articls;
    },
    sync: function(method, model, options){  
      options.timeout = 10000;  
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);  
    },

    latest : function(limit) {
      var latest = this.filter(function(item, index) {  
        return index < limit ? true : false;  
      }); 
      return new Backbone.Collection(latest);
    },

    article : function(id) {
      return this.get(id);
    }

  });


  var news = new Feed;

  return news;
});
