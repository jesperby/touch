define(['jquery', 'module', 'chrome'], function ($, $self, Chrome) {
  'use strict';

  function init(modulepath) {
    //alert( modulepath+'/css/poi.css' );
    Chrome.loadCss([modulepath+'/css/poi.css']);
  }
  
  var router = {
    routes: {
      'poi': 'showPointTypes',
      'poi/list/:typeid': 'showPointList',
      'poi/list': 'showPointList',
      'poi/map/:typeid/:poiid': 'showPointMap',
      'poi/map/:typeid': 'showPointMap',
      'poi/map': 'showPointMap',
      'poi/info/:poiid': 'showPointInfo',
      'poi/info/directions/:poiid': 'showPointInfoDirections'
    },
    
    showPointTypes: function(){
      $.mobile.loading('show');
      require(['apps/poi/js/PoiTypesView'], function (PoiTypesView) {
        new PoiTypesView();
      });    
    },

    showPointList: function(typeid){
      $.mobile.loading('show');
      require(['apps/poi/js/PoiListView'], function (PoiListView) {
        new PoiListView({"typeid": typeid});
      });    
    },

    showPointInfo: function(poiid){
      $.mobile.loading('show');
      require(['apps/poi/js/PoiInfoView'], function (PoiInfoView) {
        new PoiInfoView({"poiid":poiid});
      });    
    },

    showPointMap: function(typeid, poiid, directions){
      $.mobile.loading('show');
      require(['apps/poi/js/PoiMapView'], function (PoiMapView) {
        new PoiMapView({"typeid":typeid, "poiid":poiid, "directions":directions});
      });    
    },

    showPointInfoDirections: function(poiid){
      $.mobile.loading('show');
      this.showPointMap(null, poiid, true);
    }
  }
  
  return { 
    router:router,
    init:init
  };
});
