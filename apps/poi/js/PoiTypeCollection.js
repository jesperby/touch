define(['jquery', 'backbone', 'conf'], function ($, Backbone, Conf) {
  'use strict';

  var Feed = Backbone.Collection.extend({
    loaded: false,
    model: Backbone.Model.extend({
      defaults: {
        id: null,
        name: null,
        errorReportEnabled: null,
        picturesEnabled: null,
        ratingEnabled: null,
        image: null,
        closedImage: null,
        mapImage: null,
        closedMapImage: null
      }
    }),
  
    url: Conf.poiTypeFeed,
    
    comparator: function(item) {
        return item.get('name');
    },

    parse: function(response) {
      var allModel = new this.model( {name: 'Alla', image: 'images/ikon_platser_64.png'} );
      response.unshift( allModel );
      this.loaded = true;
      return response;
    },

    sync: function(method, model, options){  
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);  
    }
    
  });
  
  

  var f = new Feed;
  f.fetch();
  
  return f;
});
