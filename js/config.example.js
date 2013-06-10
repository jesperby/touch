// Google maps api key
var googleMapsApiKey = "Your_google_maps_api_key_here";

define(["async!http://maps.google.com/maps/api/js?key=" + googleMapsApiKey + "&sensor=true!callback"], function () {
  // Google analytics key
  var UAAccount = 'Your_google_analytics_key_here';

  return {
    GMaps: google.maps,
    UAAccount: UAAccount
  }
});