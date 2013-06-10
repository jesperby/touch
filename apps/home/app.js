define(['jquery', 'module', 'chrome', 'ga', 'jqm'], function ($, $self, Chrome, GA) {
  'use strict';

  var modulepath;
  
  function init(p) {
    modulepath = p;
  }
  
  var router = {
    routes: {
      '': 'startPage',
      'home': 'startPage'
    },
    
    startPage: function(aid){
      GA.pageView('');
      require(['apps/home/js/StartPageView'], function (StartPageView) {
        var home = new StartPageView;
        home.render();
      });
    }
  }
  
  return { 
    router:router,
    init:init
  };
});
