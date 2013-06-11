define(['jquery', 'backbone', 'chrome', 'apps/poi/js/PoiCollection', 'text!apps/poi/templates/poi-tpl.html', 'apps/poi/js/PoiTypeCollection', 'gmaps', 'locator'], function ($, Backbone, Chrome, PoiCollection, Templates, PoiTypeCollection, GMaps, Locator) {
  'use strict';
  Templates = $('<div>').html(Templates);

  var View = Backbone.View.extend({
    collection: PoiCollection,
    typeid: null,
    poiid: null,
    directions: null,
    all: false,
    el: "body",
    initialize: function(info) {
      this.typeid = info.typeid || null;
      this.poiid = info.poiid || null;
      this.directions = info.directions || false;
      this.all = !this.typeid && !this.poiid && !this.directions;
      var that = this;

      $(this.el).undelegate('#findMe', 'click');

      $(document).on('pageshow', '#poiMap', function (event) {
        $("#mapCanvas").css({
          width: $("#poiMap").width(), 
          height: $("#poiMap").height() - $("#mapHeader").height()
        } );

        that.mapRender(that.typeid, that.poiid, that.directions, that.all);
      });
      if(!this.collection.loaded) {
        var that = this;
        this.collection.fetch().success(function(){
          that.render();
        });
      } else {
        this.render();
      }
    },

    template: _.template(Templates.find('#poiMapTemplate').html()),

    events: {
      "click #findMe": "findMeCenter"
    },

    mapRender: function(typeid, poiid, directions, all) {
      typeid = typeid || null;
      poiid = poiid || null;
      directions = directions || false; 
      var poiCollection = !typeid || all ? 
        this.collection : 
        this.collection.filterByType( typeid )
        ;
      
      var mainpoi = poiid ? poiCollection.get(poiid) : null;
      
      var useBounds = mainpoi ? false : true;

      this.mapLoad()
        .mapDrawPoints(poiCollection, typeid, all, useBounds)
        .mapCenterPoint(mainpoi)
        .mapDrawDirections(directions, mainpoi);
        
      if( !useBounds) {
        this.mapSetZoom(19);
      }
    },

    mapLoad: function() {
      GMaps.loadInto( $('#mapCanvas').get(0) );
      return this;
    },
      
    mapDrawPoints: function(poiCollection, typeid, all, useBounds) {
      if( typeid === null && !all) {
        return this;
      }
      var pois = [], image;  
      poiCollection.each(function(poi){ 
        image = poi.get("active") ? 
          PoiTypeCollection.get(poi.get('type')).get( 'mapImage' ) :
          PoiTypeCollection.get(poi.get('type')).get( 'closedMapImage' );

        pois.push( {
          name: poi.get("name"),
          link: '<a href="#poi/info/'+poi.id+'">'+poi.get('name')+'</a>',
          lat: poi.get("latitude"), 
          lng: poi.get("longitude"), 
          image: image
        });
      });
      GMaps.drawPoints( pois, useBounds );
      return this;      
    },
    
    mapSetZoom: function(level) {
      GMaps.setZoom(level);
      return this;
    },

    mapCenterPoint: function(mainpoi) {
      if( !mainpoi ) {
        return this;
      }
      GMaps.setCenter({
        lat: mainpoi.get("latitude"),
        lng: mainpoi.get("longitude"),
      });
      return this;
    },
    
    mapDrawDirections: function(directions, mainpoi) {
      if( !directions || !mainpoi) {
        return this;
      }
      Locator.location(function(from, success){
        if(success) {
          var to = {
            lat: mainpoi.get("latitude"),
            lng: mainpoi.get("longitude"),            
          };
          GMaps.drawDirections(from, to);
        }
      });
      return this;      
    },
            
    render: function() {
      var filteredPois = this.typeid === null ? 
        this.collection : 
        this.collection.filterByType( this.typeid );
      var html = this.template({pois: filteredPois.toJSON()});
      
      Chrome.showPage( Chrome.parseHTML(html) );
    },

    findMeCenter: function() {
      Locator.location(function(myPos, success){
        if(success) {
          GMaps.setCenter(myPos, true);
        }
      });

      return false;
      // Locator.location(function(from, success){
      //   if(success) {
      //     var to = {
      //       lat: mainpoi.get("latitude"),
      //       lng: mainpoi.get("longitude"),            
      //     };
      //     GMaps.drawDirections(from, to);
      //   }
      // });
    }
  });
  
  return View;
});

//
