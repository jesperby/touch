define(['jquery', 'jqvalidate', 'backbone', 'chrome', 'locator', 'text!apps/report/templates/report-tpl.html', 'gmaps', 'support'], function ($, Validate, Backbone, Chrome, Locator, Templates, GMaps, Support) {
  'use strict';
  Templates = $('<div>').html(Templates);
    
  var View = Backbone.View.extend({
    el: $('body'),
    // current position of user
    position: null,
    // poi lat, lng
    poi_lat:null,
    poi_lng:null, 

    initialize: function(info) {   
      var that = this;

      // Store poi location
      this.poi_lat = info.lat || null;
      this.poi_lng = info.lng || null;

      // Store user location
      Locator.location(function(pos, success) {
        that.position = pos;
      });    
      //_.bindAll(this, 'render');
    },

    template: _.template(Templates.find('#ReportPageTemplate').html()),

    events: {
      'click #submitReport': 'handleFormSubmission',
      'click #mapPosAbort': 'mapPosAbort',
      'click #mapPosCurrent': 'mapPosCurrent',
      'click #mapPosFetch': 'mapPosFetch',
      'click #mapButtonDone': 'mapButtonDone',
      'click #mapButtonAbort': 'mapButtonAbort',
    },

    mapLoad: function() {
      GMaps.loadInto( $('#mapCanvas').get(0) );

      // If user has location disabled, set default (pildammsparken)
      var pildammsparken = {lat: 55.58979331443427, lng: 12.992362976074219};
      this.position = this.position ? this.position : pildammsparken;
      
      // Set marker on user position
      var markers = [];
      markers.push( {
          name: "Din position",
          link: '',
          lat: this.position.lat, 
          lng: this.position.lng, 
          image: "images/pin.png"
        });

      GMaps.drawPoints( markers, false );

      var that = this;
      GMaps.addEvent( "click", function (event) {
        that.position = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        var markers = [];
        markers.push( {
            name: "Din position",
            link: '',
            lat: that.position.lat, 
            lng: that.position.lng, 
            image: "images/pin.png"
          });

        GMaps.drawPoints( markers, false );        
      });
      
      return this;
    },

    mapButtonDone: function () {
      $("#formWrapper").show();
      $("#mapWrapper").hide();

      var that = this;
      Locator.location(function(pos, success) {
        that.position = pos;
      });

      // Set values of our hidden lat/lng input fields
      if( this.position != null ) {
        $("#latitude").val(this.position.lat);
        $("#longitude").val(this.position.lng);
      } else {
        $("#latitude").val("Ej angiven");
        $("#longitude").val("Ej angiven");
      }
      
      $("#errorReportForm").submit();
    },

    mapButtonAbort: function () {
      $("#formWrapper").show();
      $("#mapWrapper").hide();
    },

    mapPosFetch: function () {
      $("#formWrapper").hide();
      $("#mapWrapper").show();

      this.mapLoad();
      
      $("#mapCanvas").css({
          height: $(window).height() - $(this).find('[data-role="header"]').height()
        } );
      
      $('#whichPosition').popup("close");
      
    },

    mapPosCurrent: function () {
      // Fetch and set user current location
      var that = this;
      Locator.location(function(pos, success) {
        that.position = pos;
      })

      $('#whichPosition').popup("close");
      
      // Set values of our hidden lat/lng input fields
      if( this.position != null ) {
        $("#latitude").val(this.position.lat);
        $("#longitude").val(this.position.lng);
      } else {
        $("#latitude").val("Ej angiven");
        $("#longitude").val("Ej angiven");
      }
      
      $("#errorReportForm").submit();
    },

    mapPosAbort: function () {
      $('#whichPosition').popup("close");
    },

    handleFormSubmission: function() {
      
      // Validate form
      $("#errorReportForm").validate({
        errorLabelContainer: ".validateMessages",
        
        rules: {
          errorDescription: {
            required: true, 
          },
        },

        messages: {
          errorDescription:"Du måste beskriva felet."
        }

      });

      // Before submitting, determine user position
      var submit = false;
      if( $("#errorReportForm").valid() ) {
        if( this.poi_lat != null && this.poi_lng != null ) { // Reached report through individual poi
          // Set values of our hidden lat/lng input fields
          $("#latitude").val(this.poi_lat);
          $("#longitude").val(this.poi_lng);
          $("#errorReportForm").submit();
          submit = true;
        } else { // Reached general error reporting from start page, we need a position
          $('#whichPosition').popup("open");
          submit = false;
        }
      }
      
      return submit;
    },

    render: function() {
      var html = this.template();
      Chrome.showPage( Chrome.parseHTML(html) );

      // Hide map
      $("#mapWrapper").hide();

      // Check if browser supports file upload
      if(!Support.isFileInputSupported() ) {
        $("#reportImage").hide();
        $("#reportImageMsg").html("Din mobila enhet stödjer ej uppladdning av bild.")
      } 
    },
  });
  
  return View;
});