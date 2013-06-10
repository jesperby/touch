define(['jquery', 'backbone'], function ($, Backbone) {
  'use strict'; 
  
  var Feed = Backbone.Collection.extend({
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
    url: 'http://webapps2.malmo.se/feeds/?feed=vacancies',
    parse: function(response) {
      var articls = [];
      for(var i = 0, l = response.items.length; i<l; i++){
        articls[i] = response.items[i];
        articls[i].content = articls[i].description;
        articls[i].description = $(articls[i].description).text();
        articls[i].url = '#jobs/details/'+articls[i].id;
      }
      return articls;
    },
    sync: function(method, model, options){  
      options.timeout = 10000;  
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);  
    },
    article : function(id) {
      return this.get(id);
    }

  });


  var news = new Feed;
  news.fetch();
  
  return news;
});