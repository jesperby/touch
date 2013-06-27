define(['jquery', 'backbone', 'chrome', 'apps/poi/js/PoiCollection', 'text!apps/poi/templates/poi-tpl.html', 'apps/poi/js/PoiTypeCollection', 'gmaps', 'locator'], function ($, Backbone, Chrome, PoiCollection, Templates, PoiTypeCollection, GMaps, Locator) {
  'use strict';
  Templates = $('<div>').html(Templates);

  var View = Backbone.View.extend({
    collection: PoiCollection,
    typeid: null,
    poiid: null,
    directions: null,
    directionsType: null,
    all: false,
    el: "body",
    initialize: function(info) {
      this.typeid = info.typeid || null;
      this.poiid = info.poiid || null;
      this.directions = info.directions || false;
      this.directionsType = info.directionsType || null;
      this.all = !this.typeid && !this.poiid && !this.directions;
      var that = this;

      $(this.el).undelegate('#findMe', 'click');

      // Remove all previous bound events to avoid repeated bindings
      $(document).off('pageshow.poiMap');

      $(document).on('pageshow.poiMap', '#poiMap', function (event) {
        $("#mapCanvas").css({
          width: $("#poiMap").width(), 
          height: $("#poiMap").height() - $("#mapHeader").height()
        } );

        that.mapRender(that.typeid, that.poiid, that.directions, that.directionsType, that.all);
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

    mapRender: function(typeid, poiid, directions, directionsType, all) {
      typeid = typeid || null;
      poiid = poiid || null;
      directions = directions || false; 
      directionsType = directionsType || null; 
      var poiCollection = !typeid || all ? 
        this.collection : 
        this.collection.filterByType( typeid )
        ;
      
      var mainpoi = poiid ? poiCollection.get(poiid) : null;
      
      var useBounds = mainpoi ? false : true;

      this.mapLoad()
        .mapDrawPoints(poiCollection, mainpoi, typeid, all, useBounds)
        .mapCenterPoint(mainpoi)
        .mapDrawDirections(directions, directionsType, mainpoi);
        
      if( !useBounds) {
        this.mapSetZoom(19);
      }
    },

    mapLoad: function() {
      GMaps.loadInto( $('#mapCanvas').get(0) );
      return this;
    },
      
    mapDrawPoints: function(poiCollection, mainpoi, typeid, all, useBounds) {
      if( typeid === null && !all) {
        return this;
      }
      var pois = [], image;  

      if( !mainpoi ) {
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
      } else {
        image = mainpoi.get("active") ? 
          PoiTypeCollection.get(mainpoi.get('type')).get( 'mapImage' ) :
          PoiTypeCollection.get(mainpoi.get('type')).get( 'closedMapImage' );

        pois.push( {
          name: mainpoi.get("name"),
          link: '<a href="#poi/info/'+mainpoi.id+'">'+mainpoi.get('name')+'</a>',
          lat: mainpoi.get("latitude"), 
          lng: mainpoi.get("longitude"), 
          image: image
        });
      }

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
    
    mapDrawDirections: function(directions, directionsType, mainpoi) {
      if( !directions || !mainpoi) {
        return this;
      }
      Locator.location(function(from, success){
        if(success) {
          var to = {
            lat: mainpoi.get("latitude"),
            lng: mainpoi.get("longitude"),            
          };
          GMaps.drawDirections(from, to, directionsType);
        }
      });
      return this;      
    },
            
    render: function() {
      var filteredPois = this.typeid === null ? 
        this.collection : 
        this.collection.filterByType( this.typeid );
      var html = this.template({pois: filteredPois.toJSON()});

      var parsehtml = Chrome.parseHTML(html);
      this.urlAlterHtml( parsehtml, filteredPois );
      Chrome.showPage( parsehtml );
    },

    /**
     * Function that makes addtional html alterations based on current url
     */
    urlAlterHtml: function( parsehtml, pois ) {
      // Url directions
      if( window.location.hash.substring(0, 20) == '#poi/info/directions' ) {
        
        // Add footer with various direction options
        var $footer = parsehtml.find( 'div[data-role="footer"]' );
        var directions_path = '#poi/info/directions' + '/' + this.poiid + '/';

        var driving_active = "";
        var transit_active = "";
        var bicycling_active = "";
        var walking_active = "";

        switch( this.directionsType ) {
          case "driving":
            driving_active = "ui-btn-active ui-state-persist";
            break;
          case "transit":
            transit_active = "ui-btn-active ui-state-persist";
            break;
          case "bicycling":
            bicycling_active = "ui-btn-active ui-state-persist";
            break;
          case "walking":
            walking_active = "ui-btn-active ui-state-persist";
            break;
        }

        $footer.append( $('<div data-role="controlgroup" data-type="horizontal">' +
          '<a href="' + directions_path + 'driving' + '" data-role="button" data-icon="plus" class="' + driving_active + '">Bil</a>' +
          '<a href="' + directions_path + 'transit' + '" data-role="button" data-icon="plus" class="' + transit_active + '">Transit</a>' +
          '<a href="' + directions_path + 'bicycling' + '" data-role="button" data-icon="plus" class="' + bicycling_active + '">Cykel</a>' +
          '<a href="' + directions_path + 'walking' + '" data-role="button" data-icon="plus" class="' + walking_active + '">Gång</a>' +
          '</div>') );

        // Link close button back to poi info page, instead of simple 'back'
        var $closeButton = parsehtml.find( '#closeButton' );
        $closeButton.removeAttr('data-direction');
        $closeButton.removeAttr('data-rel');
        $closeButton.prop('href', "#poi/info/" + this.poiid );
      }
    },

    findMeCenter: function() {
      Locator.location(function(myPos, success){
        if(success) {
          GMaps.setCenter(myPos, true);
        }
      });

      return false;
    }
  });
  
  return View;
});

//
