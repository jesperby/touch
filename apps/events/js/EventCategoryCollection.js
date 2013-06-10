define(['jquery', 'backbone'], function ($, Backbone) {
  'use strict';

  var Feed = Backbone.Collection.extend({
    loaded: false,
    model: Backbone.Model.extend({
      defaults: {
        label: null,
        url: null
      }
    }),
    
    url: 'http://webapps2.malmo.se/evenemang/EventGuide',

    parse: function(response) {
      var $categories = $(response).children('ul').last().find('li a');
      var cats = [], categoryId, $item;
      $categories.each(function(index, item){
        $item = $(item);
        categoryId = $item.attr('data-proxy-url').split('=').pop();
        cats.push({
          'url': '#events/category/'+categoryId,
          'label': $item.text()
        });
      });
      this.loaded = true;
      return cats;
    },

    sync: function(method, model, options){  
      options.dataType = "text";
      return Backbone.sync(method, model, options);  
    }

  });


  var f = new Feed;

  return f;
});
