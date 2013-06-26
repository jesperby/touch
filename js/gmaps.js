define(
  [ "conf" ],
  function( Conf ) {
    var map,
        directionsDisplay,
        directionsService,
        markers = [];
      
    function loadInto(canvasElement, opt) {
      opt = $.extend({
        center: new Conf.GMaps.LatLng(55.6006, 13.0044),
        zoom: 12,
        mapTypeId: Conf.GMaps.MapTypeId.ROADMAP,
        zoomControl: false,
        panControl:false,
        mapTypeControl:false,
        streetViewControl: false
      }, (opt || {}));

      map = new Conf.GMaps.Map( canvasElement, opt );
      directionsDisplay = new Conf.GMaps.DirectionsRenderer();
      directionsService = new Conf.GMaps.DirectionsService();
    }

    function resetMap(cb) {
      if(markers.length == 0) {
        directionsDisplay.setMap(null);
        cb();
        return;
      }
      var marker = markers.pop();
      marker.setMap(null);
      resetMap(cb);
    }

    function drawPoints( pois, useBounds ) {
      useBounds = typeof useBounds !== 'undefined' ? useBounds : true;

      resetMap(function(){
        var marker;
        var bounds = new Conf.GMaps.LatLngBounds();
        var infowindow = new Conf.GMaps.InfoWindow();
        for(var i = 0, l = pois.length; i<l; i++) {
          var marker = new Conf.GMaps.Marker({
            position: new Conf.GMaps.LatLng(pois[i].lat, pois[i].lng),
            map: map,
            icon: pois[i].image
          });
          
          makeInfoWindowEvent(map, infowindow, pois[i].link, marker);
          markers.push(marker);
          bounds.extend(marker.getPosition());
        }
        //  Fit these bounds to the map
        if( useBounds) {map.fitBounds(bounds);}
      });
    }

    function setCenter( point, markCenter ) {
      markCenter = markCenter || null;

      var center = new Conf.GMaps.LatLng(point.lat, point.lng);
      map.setCenter( center );

      if( markCenter ) {
        var marker = new google.maps.Marker({
          position: center, 
          map: map
        }); 
        
        markers.push(marker)
      }
    }
    
    function drawDirections(from, to, directionsType) {

      // google map travel mode
      var tMode = Conf.GMaps.TravelMode.BICYCLING;
      switch( directionsType ) {
        case "driving":
          tMode = Conf.GMaps.TravelMode.DRIVING;
          break;
        case "bicycling":
          tMode = Conf.GMaps.TravelMode.BICYCLING;
          break;
        case "transit":
          tMode = Conf.GMaps.TravelMode.TRANSIT;
          break;
        case "walking":
          tMode = Conf.GMaps.TravelMode.WALKING;
          break;
        default:
          tMode = Conf.GMaps.TravelMode.BICYCLING;
      }

      directionsDisplay.setMap(null);
      directionsDisplay.setMap(map);            
      var req = {
        origin:new Conf.GMaps.LatLng(from.lat, from.lng),
        destination:new Conf.GMaps.LatLng(to.lat, to.lng),
        travelMode: tMode
      };
      directionsService.route(req, function(result, status) {
        if (status == Conf.GMaps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        } 
      });
      
    }
    
    function addEvent(eventId, eventFunction ) {
      Conf.GMaps.event.addListener(map, eventId, eventFunction);
    }

    function setZoom( level ) {
      map.setZoom( level );
    }

    function addMarker( marker ) {
      //marker.setMap(map);
      /*
      var marker = new Conf.GMaps.Marker({
        position: thePosition,
        map: this.map,
        title: theTitle
      });
      */
    }
    
    function makeInfoWindowEvent(map, infowindow, contentString, marker) {
      Conf.GMaps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      });
    }

    return {
      loadInto      : loadInto,
      drawPoints    : drawPoints,
      setCenter     : setCenter,
      drawDirections: drawDirections,
      addEvent      : addEvent, 
      addMarker     : addMarker, 
      setZoom     : setZoom,
    }
  }
);
