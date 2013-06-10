define([], function () {
  'use strict';
  var initiated = false,
      success = false,
      pos = {
        lat: null,
        lng: null
      };
  
  function askForLocation(cb) {
    cb = cb || function() {};
    if (window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(location) {
        pos = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        };
        success = true;
        cb(pos, success);
      });
    } else {
      cb(pos, success);
    }
    initiated = true;
  };

  return {location:askForLocation};
});