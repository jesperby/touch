define(['jquery', 'backbone', 'apps/poi/js/PoiTypeCollection',], function ($, Backbone, PoiTypeCollection) {
  'use strict';

  //var typeCollection: PoiTypeCollection;

  var Feed = Backbone.Collection.extend({
    loaded: false,
    
    model: Backbone.Model.extend({
      defaults: {
        id: null,
        name: null,
        type: null,
        longitude: null,
        latitude: null,
        active: null,
        address: null,
        nrOfGrades: null,
        avgGrade: null,
        image: null,
        description: null
      },

      set: function(attributes, options) {
        // Find and set the
        var typeModel = PoiTypeCollection.get(attributes.type);
        var result = Backbone.Model.prototype.set.call(this, attributes, options);
        
        if( typeModel ) {
          result = Backbone.Model.prototype.set.call(this, {"typeName":typeModel.get("name")}, options);
        }

        return result;
      },
    }),
    
    comparator: function(item) {
        return [  item.get('active') == 'true' ? false : true,
                  item.get('name') ];
    },

    url: 'http://webapps2.malmo.se/feeds/?feed=poi-points',
    
    sync: function(method, model, options){  
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);  
    },

    filterByType: function( typeid ) {
      var pois = [];
      this.each(function(poiModel){ 
        if( poiModel.get('type') == typeid ) {
          pois.push( poiModel );
        }
      });
      return new Backbone.Collection( pois );
    }
    
  });

  var f = new Feed;

  return f;
});
